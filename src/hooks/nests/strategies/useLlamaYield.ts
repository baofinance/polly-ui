import { useQuery } from '@tanstack/react-query'
import { BigNumber } from 'ethers'

// INFO: add to this to support new tokens

export const useLlamaYield = (llamaPool: string) => {
	const { data: apy } = useQuery(
		['@/hooks/base/useLlamaYield', { llamaPool }],
		async () => {
			const res = await fetch(`https://yields.llama.fi/chart/${llamaPool}`)
			const data = await res.json()
			const _data = data.data
			const apy = _data[_data.length - 1].apy
			if (!apy) throw new Error(`Can't get yield for DeFi Llama Pool ${llamaPool}.`)
			return apy
		},
		{
			retry: true,
			retryDelay: 1000 * 60,
			refetchOnReconnect: true,
			refetchInterval: 1000 * 60 * 5,
			staleTime: 1000 * 60 * 5,
			cacheTime: 1000 * 60 * 10,
			keepPreviousData: true,
			placeholderData: BigNumber.from(0),
		},
	)

	return apy
}

export default useLlamaYield
