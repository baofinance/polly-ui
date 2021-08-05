import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { Nest } from '../contexts/Nests'
import { TimeseriesData } from '../components/Graphs/AreaGraph/AreaGraph'
import { getSubgraphPriceHistory } from '../utils/graph'

const useGraphPriceHistory = (nest: Nest) => {
  const [res, setRes] = useState<TimeseriesData[] | undefined>()

  const querySubgraph = useCallback(async () => {
    const data: any = await getSubgraphPriceHistory('WETH', 'matic');
    const formattedData: Array<TimeseriesData> = []

    _.each(data.tokens[0].dayData, dayData => {
      formattedData.push({
        date: new Date(dayData.date * 1000).toISOString(),
        close: parseFloat(dayData.priceUSD)
      })
    })

    setRes(_.reverse(formattedData))
  }, [nest])

  useEffect(() => {
    querySubgraph()
  }, [nest])

  return res
}

export default useGraphPriceHistory
