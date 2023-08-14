import Config from '@/bao/lib/config'
import { ActiveSupportedNest } from '@/bao/lib/types'
import { getOraclePrice } from '@/bao/utils'
import { useBlockUpdater } from '@/hooks/base/useBlock'
import useContract from '@/hooks/base/useContract'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import type { Chainoracle, Recipe } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import Multicall from '@/utils/multicall'
import { decimate } from '@/utils/numberFormat'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers'
import useBao from '../base/useBao'

export type NestRates = {
	eth: BigNumber
	usd: BigNumber
	dai: BigNumber
}

const useNestRates = (nest: ActiveSupportedNest): NestRates => {
	const bao = useBao()
	const { library, account, chainId } = useWeb3React()
	const recipe = useContract<Recipe>('Recipe', Config.contracts.recipe[chainId].address)
	const wethOracle = useContract<Chainoracle>('Chainoracle', Config.contracts.wethPrice[chainId].address)

	const enabled = !!bao && !!library && !!recipe && !!wethOracle
	const { data: rates, refetch } = useQuery(
		['@/hooks/nests/useNestRates', providerKey(library, account, chainId), { enabled, nid: nest.nid }],
		async () => {
			const wethPrice = await getOraclePrice(bao, wethOracle)
			const params = [Config.contracts.weth[chainId].address, nest.address, ethers.utils.parseEther('1')]
			const query = Multicall.createCallContext([
				{
					contract: recipe,
					ref: 'recipe',
					calls: [
						{
							method: 'getPrice',
							params,
						},
					],
				},
			])
			const { recipe: res } = Multicall.parseCallResults(await bao.multicall.call(query))
			return {
				dai: decimate(wethPrice.mul(res[0].values[0]).mul(100)),
				eth: res[0].values[0],
				usd: decimate(wethPrice.mul(res[0].values[0]).mul(100)),
			}
		},
		{
			enabled,
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return rates
}

export default useNestRates
