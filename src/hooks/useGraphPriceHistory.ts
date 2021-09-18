import { TimeseriesData } from 'components/Graphs/AreaGraph/AreaGraph'
import { Nest } from 'contexts/Nests'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from 'utils/graph'
import { getMaticPriceLink, getWethPriceLink } from '../bao/utils'
import useBao from './useBao'
import { BigNumber } from 'bignumber.js'

const useGraphPriceHistory = (nest: Nest) => {
  const [res, setRes] = useState<TimeseriesData[] | undefined>()
  const bao = useBao()

  const querySubgraph = useCallback(async () => {
    if (!(nest && nest.nestTokenAddress && bao)) return

    const wethPrice = await getWethPriceLink(bao)
    const maticPrice = await getMaticPriceLink(bao)

    const data: any = await GraphClient.getPriceHistory(
      nest.nestTokenAddress.toLowerCase(),
    )
    const formattedData: Array<TimeseriesData> = data.tokens[0].dayData.map(
      (dayData: any) => ({
        date: new Date(dayData.date * 1000).toISOString(),
        close: new BigNumber(dayData.priceUSD).div(wethPrice).times(maticPrice),
      }),
    )
    setRes(_.reverse(formattedData))
  }, [nest])

  useEffect(() => {
    querySubgraph()
  }, [nest])

  return res
}

export default useGraphPriceHistory
