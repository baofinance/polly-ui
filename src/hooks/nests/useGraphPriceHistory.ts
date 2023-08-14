import { TimeseriesData } from '@/components/Graphs/AreaGraph/AreaGraph'
import { SupportedNest } from '@/bao/lib/types'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from '@/utils/graph'

const useGraphPriceHistory = (nest: SupportedNest) => {
	const [res, setRes] = useState<TimeseriesData[] | undefined>()

	const querySubgraph = useCallback(async () => {
		if (!(nest && nest.address)) return

		const data: any = await GraphClient.getPriceHistory(nest.address.toLowerCase())

		// Workaround while nSTABLE has no price data, remove soon
		if (!data.tokens[0].dayData[1]) {
			setRes([
				{
					date: new Date().toString(),
					close: 1,
				},
				{
					date: new Date().toString(),
					close: 1,
				},
			])
			return
		}

		const formattedData: Array<TimeseriesData> = data.tokens[0].dayData.map((dayData: any) => ({
			date: new Date(dayData.date * 1000).toISOString(),
			close: parseFloat(dayData.priceUSD),
		}))
		setRes(_.reverse(formattedData))
	}, [nest])

	useEffect(() => {
		querySubgraph()
	}, [nest])

	return res
}

export default useGraphPriceHistory
