import Config from '@/bao/lib/config'
import useBao from '@/hooks/base/useBao'
import { useBlockUpdater } from '@/hooks/base/useBlock'
import useContract from '@/hooks/base/useContract'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { Erc20__factory, LendingLogicKashi__factory, LendingLogicKLIMA__factory } from '@/typechain/factories'
import type { Experipie, LendingRegistry } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import MultiCall from '@/utils/multicall'
import { decimate, exponentiate } from '@/utils/numberFormat'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { ActiveSupportedNest } from '../../bao/lib/types'
import useLlama from './strategies/useLlamaYield'
import useGeckoPrices from './useGeckoPrices'

export type NestComponent = {
	address: string
	symbol: string
	name: string
	decimals: number
	price: BigNumber
	image: any
	balance: BigNumber
	percentage: BigNumber
	color: string
	underlying?: string
	underlyingPrice?: BigNumber
	strategy?: string
	apy?: BigNumber
}

const useComposition = (nest: ActiveSupportedNest): Array<NestComponent> => {
	const prices = useGeckoPrices()
	const bao = useBao()
	const { library, account, chainId } = useWeb3React()

	const lendingRegistry = useContract<LendingRegistry>('LendingRegistry', Config.contracts.lendingRegistry[chainId].address)
	const nestContract = useContract<Experipie>('Experipie', nest ? nest.address : null)

	const enabled = !!bao && !!lendingRegistry && !!nestContract && !!prices

	const { data: composition, refetch } = useQuery(
		['@/hooks/nests/useComposition', providerKey(library, account, chainId), { enabled, nid: nest && nest.nid }],
		async () => {
			const tokenComposition: string[] = await nestContract.getTokens()
			const tokensQuery = MultiCall.createCallContext(
				tokenComposition.map(address => ({
					contract: Erc20__factory.connect(address, library),
					ref: address,
					calls: [{ method: 'decimals' }, { method: 'symbol' }, { method: 'name' }, { method: 'balanceOf', params: [nest.address] }],
				})),
			)
			const tokenInfo = MultiCall.parseCallResults(await bao.multicall.call(tokensQuery))

			const _comp: NestComponent[] = []
			for (let i = 0; i < tokenComposition.length; i++) {
				const _c: any = {
					decimals: tokenInfo[tokenComposition[i]][0].values[0],
					symbol: tokenInfo[tokenComposition[i]][1].values[0],
					name: tokenInfo[tokenComposition[i]][2].values[0],
					balance: tokenInfo[tokenComposition[i]][3].values[0],
				}
				_c.address = tokenComposition[i]
				_c.price = prices[tokenComposition[i].toLowerCase()]

				// Check if component is lent out. If the coin gecko prices array doesn't conclude it,
				// the current component is a wrapped interest bearing token.
				if (!Object.keys(prices).includes(_c.address.toLowerCase())) {
					// Get the underlying token's address as well as the lending protocol identifer
					const lendingQuery = MultiCall.createCallContext([
						{
							contract: lendingRegistry,
							ref: 'lendingRegistry',
							calls: [
								{ method: 'wrappedToUnderlying', params: [_c.address] },
								{ method: 'wrappedToProtocol', params: [_c.address] },
							],
						},
					])
					const { lendingRegistry: lendingRes } = MultiCall.parseCallResults(await bao.multicall.call(lendingQuery))

					_c.underlying = lendingRes[0].values[0]
					_c.underlyingPrice = prices[_c.underlying.toLowerCase()]
					_c.strategy = _getStrategy(lendingRes[1].values[0])

					// Get Exchange Rate
					const logicAddress = await lendingRegistry.protocolToLogic(lendingRes[1].values[0])
					const logicContract = LendingLogicKashi__factory.connect(logicAddress, library)
					const exchangeRate = await logicContract.callStatic.exchangeRate(_c.address)
					const underlyingToken = Erc20__factory.connect(lendingRes[0].values[0], library)
					const underlyingDecimals = await underlyingToken.decimals()

					_c.price = decimate(prices[_c.underlying.toLowerCase()].mul(exchangeRate))

					// xSushi APY can't be found on-chain, check for special case
					_c.apy = await logicContract.getAPRFromUnderlying(lendingRes[0].values[0])

					// Adjust price for compound's exchange rate.
					// wrapped balance * exchange rate / 10 ** (18 - 8 + underlyingDecimals)
					// Here, the price is already decimated by 1e18, so we can subtract 8
					// from the underlying token's decimals.
					if (_c.strategy === 'Compound') _c.price = decimate(_c.price, underlyingDecimals - 8)
				}

				_comp.push({
					..._c,
					image: `/images/tokens/${_getImageURL(_c.symbol)}.png`,
					color: nest.pieColors[_c.symbol],
				})
			}

			const marketCap = _comp.reduce((prev, comp) => {
				const balance = parseFloat(formatUnits(comp.balance, comp.decimals))
				const price = parseFloat(formatUnits(comp.price))
				return prev.add(parseUnits((balance * price).toString()))
			}, BigNumber.from(0))

			// Assign allocation percentages
			for (let i = 0; i < _comp.length; i++) {
				const comp = _comp[i]
				const percentage = comp.balance.mul(comp.price).div(marketCap).mul(100)
				_comp[i].percentage = decimate(exponentiate(percentage), _comp[i].decimals)
			}

			return _comp
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

	return composition
}

// Strategies represented in the Lending Registry contract as bytes32 objects.
const _getStrategy = (symbol: string) => {
	if (symbol.endsWith('1')) {
		return 'Cream'
	} else if (symbol.endsWith('2')) {
		return 'AAVE'
	} else if (symbol.endsWith('3')) {
		return 'Kashi'
	} else if (symbol.endsWith('4')) {
		return 'sKLIMA'
	} else {
		return 'Unknown'
	}
}

// Special cases for image URLS, i.e. wrapped assets
// This sucks. Should do this more dynamically.
const _getImageURL = (symbol: string) => {
	switch (symbol.toLowerCase()) {
		case 'asusd':
			return 'SUSD'
		case 'ausdc':
			return 'USDC'
		case 'adai':
			return 'DAI'

		default:
			return undefined
	}
}

export default useComposition
