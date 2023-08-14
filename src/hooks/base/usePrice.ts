import { fromDecimal } from '@/utils/numberFormat'
import { useQuery } from '@tanstack/react-query'
import { BigNumber } from 'ethers'

// INFO: add to this to support new tokens

export const usePrice = (coingeckoId: string) => {
	const { data: price } = useQuery(
		['@/hooks/base/usePrice', { coingeckoId }],
		async () => {
			const res = await fetch(`https://bao-price-api.herokuapp.com/api/price?id=${coingeckoId}`)
			const price = await res.json()
			if (!price) throw new Error(`Can't get price for coinGeckoId='${coingeckoId}'.`)
			return fromDecimal(price.price[coingeckoId].usd)
		},
		{
			retry: true,
			retryDelay: 1000 * 60,
			staleTime: 1000 * 60 * 60,
			cacheTime: 1000 * 60 * 120,
			refetchOnReconnect: false,
			refetchInterval: 1000 * 60 * 5,
			keepPreviousData: true,
			placeholderData: BigNumber.from(0),
		},
	)

	return price
}

export default usePrice
