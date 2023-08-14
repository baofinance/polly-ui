import { BigNumber } from 'ethers'
import { useCallback } from 'react'
//import { parseUnits, formatUnits } from 'ethers/lib/utils'
import Config from '@/bao/lib/config'
import useBao from '@/hooks/base/useBao'
import { useBlockUpdater } from '@/hooks/base/useBlock'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { Uni_v2_lp__factory } from '@/typechain/factories'
import GraphUtil from '@/utils/graph'
import { providerKey } from '@/utils/index'
import Multicall from '@/utils/multicall'
import { decimate, exponentiate, fromDecimal } from '@/utils/numberFormat'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import useGeckoPrices from '../nests/useGeckoPrices'
import useReservesPrices from '../nests/useReservesPrices'
// import useReservesPrices from '../nests/useReservesPrices'

type TVL = {
	lpAddress: string
	lpStaked: BigNumber
	tvl: BigNumber
}

const useAllFarmTVL = () => {
	const { library, account, chainId } = useWeb3React()
	const bao = useBao()
	const geckoPrices = useGeckoPrices()

	const fetchLPInfo = useCallback(async () => {
		const results = Multicall.parseCallResults(
			await bao.multicall.call(
				Multicall.createCallContext(
					Config.farms.map(farm =>
						farm.pid === 14 || farm.pid === 23 || farm.pid === 27 || farm.pid === 28 // single asset farms (TODO: make single asset a config field)						farm.pid === 14 || farm.pid === 23
							? {
									ref: farm.lpAddresses[chainId],
									contract: Uni_v2_lp__factory.connect(farm.lpAddresses[chainId], library),
									calls: [
										{
											method: 'balanceOf',
											params: [Config.contracts.masterChef[chainId].address],
										},
										{ method: 'totalSupply' },
									],
							  }
							: {
									ref: farm.lpAddresses[chainId],
									contract: Uni_v2_lp__factory.connect(farm.lpAddresses[chainId], library),
									calls: [
										{ method: 'getReserves' },
										{ method: 'token0' },
										{ method: 'token1' },
										{
											method: 'balanceOf',
											params: [Config.contracts.masterChef[chainId].address],
										},
										{ method: 'totalSupply' },
									],
							  },
					),
				),
			),
		)

		return Object.keys(results).map((key: string) => {
			const res0 = results[key]

			if (
				key.toLowerCase() === Config.addressMap.nDEFI.toLowerCase() ||
				key.toLowerCase() === Config.addressMap.nSTBL.toLowerCase() ||
				key.toLowerCase() === Config.addressMap.nPOLY.toLowerCase() ||
				key.toLowerCase() === Config.addressMap.nINFR.toLowerCase()
			)
				return {
					singleAsset: true,
					lpAddress: key,
					lpStaked: BigNumber.from(res0[0].values[0]),
					lpSupply: BigNumber.from(res0[1].values[0]),
				}

			const r0 = res0[0].values[0]
			const r1 = res0[0].values[1]

			const token0Address = res0[1].values[0]
			const token1Address = res0[2].values[0]

			const tokens = [
				{
					address: token0Address,
					balance: decimate(r0),
				},
				{
					address: token1Address,
					balance: decimate(r1, token1Address === Config.addressMap.USDC ? 6 : 18),
					// This sucks. Should consider token decimals rather than check manually. Luckily, we're getting rid of farms soon & there's only 3 left.
				},
			]

			const lpStaked = res0[3].values[0]
			const lpSupply = res0[4].values[0]

			return {
				tokens,
				lpAddress: key,
				lpStaked,
				lpSupply,
			}
		})
	}, [library, chainId, bao])

	const enabled = !!library && !!bao

	const tokenPrices = useReservesPrices()

	const { data: tvl, refetch } = useQuery(
		['@/hooks/farms/useAllFarmTVL', providerKey(library, account, chainId), { enabled }],
		async () => {
			const lps = await fetchLPInfo()
			const wethPrice = await GraphUtil.getPrice(Config.addressMap.WETH)

			console.log('tokenPrices', tokenPrices)
			const tvls: TVL[] = []
			let _tvl = BigNumber.from(0)
			lps.forEach(lpInfo => {
				let lpStakedUSD
				if (lpInfo.singleAsset) {
					lpStakedUSD = decimate(lpInfo.lpStaked).mul(
						fromDecimal(
							Object.values(tokenPrices).find(priceInfo => priceInfo.address.toLowerCase() === lpInfo.lpAddress.toLowerCase()).price,
						),
					)
					_tvl = _tvl.add(lpStakedUSD)
				} else {
					let token, tokenPrice, specialPair
					if (
						lpInfo.tokens[0].address.toLowerCase() === Config.addressMap.POLLY.toLowerCase() &&
						lpInfo.tokens[1].address.toLowerCase() === Config.addressMap.nDEFI.toLowerCase()
					) {
						// POLLY-nDEFI pair
						token = lpInfo.tokens[1]
						specialPair = true
					} else if (
						lpInfo.tokens[0].address.toLowerCase() === Config.addressMap.WETH.toLowerCase() ||
						lpInfo.tokens[0].address.toLowerCase() === Config.addressMap.RAI.toLowerCase()
					)
						// *-wETH pair and *-RAI pair
						token = lpInfo.tokens[0]
					else token = lpInfo.tokens[1]

					if (token.address.toLowerCase() === Config.addressMap.WETH.toLowerCase())
						// *-wETH pair
						tokenPrice = fromDecimal(wethPrice)
					else if (token.address.toLowerCase() === Config.addressMap.nDEFI.toLowerCase() && specialPair)
						// POLLY-nDEFI pair
						tokenPrice = fromDecimal(
							Object.values(tokenPrices).find(priceInfo => priceInfo.address.toLowerCase() === Config.addressMap.nDEFI.toLowerCase()).price,
						)
					// *-RAI pair
					else tokenPrice = geckoPrices[Config.addressMap.RAI.toLowerCase()]

					const stakeBySupply = exponentiate(lpInfo.lpStaked).div(lpInfo.lpSupply)
					const balanceAtPrice = decimate(token.balance.mul(tokenPrice))
					lpStakedUSD = balanceAtPrice.mul(2).mul(stakeBySupply)
				}

				tvls.push({
					lpAddress: lpInfo.lpAddress,
					tvl: lpStakedUSD,
					lpStaked: lpInfo.lpStaked,
				})
				_tvl = _tvl.add(lpStakedUSD)
			})

			return {
				tvl: _tvl,
				tvls,
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

	return tvl
}

export default useAllFarmTVL
