import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { getTotalLPWethValue } from '@/bao/utils'
import useFarms from '@/hooks/farms/useFarms'
import useContract from '@/hooks/base/useContract'
import type { Masterchef, Weth } from '@/typechain/index'
import { Erc20__factory } from '@/typechain/factories'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

export interface StakedValue {
	tokenAmount: BigNumber
	wethAmount: BigNumber
	totalWethValue: BigNumber
	tokenPriceInWeth: BigNumber
	poolWeight: BigNumber
}

const useAllStakedValue = (): StakedValue[] => {
	const { library, account, chainId } = useWeb3React()
	const farms = useFarms()
	const Masterchef = useContract<Masterchef>('masterChef')
	const weth = useContract<Weth>('Weth')

	const enabled = !!library && !!farms && !!Masterchef && !!weth
	const { data: balances, refetch } = useQuery(
		['@/hooks/farms/useAllStakedValue', providerKey(library, account, chainId), { enabled }],
		async () => {
			const _balances = farms.map(({ pid, lpContract, tokenAddress, tokenDecimals }) => {
				const farmContract = Erc20__factory.connect(tokenAddress, library)
				return getTotalLPWethValue(Masterchef, weth, lpContract, farmContract, tokenDecimals, pid)
			})

			return await Promise.all(_balances)
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

	return balances
}

export default useAllStakedValue
