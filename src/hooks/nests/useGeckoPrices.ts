import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

import useNests from './useNests'

type Prices = {
	[address: string]: BigNumber
}

const useGeckoPrices = (): Prices => {
	const { library, account, chainId } = useWeb3React()
	const baskets = useNests()

	const enabled = !!library && !!baskets
	const nids = baskets.map(b => b.nid)
	const { data: prices, refetch } = useQuery(
		['@/hooks/baskets/useGeckoPrices', providerKey(library, account, chainId), { enabled, nids }],
		async () => {
			const allCgIds: any = baskets.reduce((prev, cur) => {
				const reversedCgIds = Object.keys(cur.cgIds).reduce((_prev, _cur) => ({ ..._prev, [cur.cgIds[_cur]]: _cur }), {})
				return { ...prev, ...reversedCgIds }
			}, {})

			const idsToQuery = Object.keys(allCgIds).join(',')
			const res = await (await fetch(`https://bao-price-api.herokuapp.com/api/price?id=${idsToQuery}`)).json()

			return Object.keys(res.price).reduce(
				(prev, cur) => ({
					...prev,
					[allCgIds[cur].toLowerCase()]: parseUnits(res.price[cur].usd.toString()),
				}),
				{},
			)
		},
		{
			enabled,
			staleTime: 1000 * 60 * 60,
			cacheTime: 1000 * 60 * 120,
			refetchOnReconnect: true,
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return prices
}

export default useGeckoPrices
