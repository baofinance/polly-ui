import { TimeseriesData } from 'components/Graphs/AreaGraph/AreaGraph'
import { Nest } from 'contexts/Nests'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from 'utils/graph'
import { addressMap } from '../bao/lib/constants'

const useGraphPriceHistory = (nest: Nest) => {
  const [res, setRes] = useState<TimeseriesData[] | undefined>()

  const querySubgraph = useCallback(async () => {
    const data: any = await GraphClient.getPriceHistory(addressMap.WETH)
    const formattedData: Array<TimeseriesData> = []

    _.each(data.tokens[0].dayData, (dayData) => {
      formattedData.push({
        date: new Date(dayData.date * 1000).toISOString(),
        close: parseFloat(dayData.priceUSD),
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
