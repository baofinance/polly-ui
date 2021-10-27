import BigNumber from 'bignumber.js'
import { Nest } from 'contexts/Nests'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from 'utils/graph'
import { getWethPriceLink } from '../bao/utils'
import useBao from './useBao'

const usePairPrice = (nest: Nest) => {
  const [res, setRes] = useState<BigNumber | undefined>()
  const bao = useBao()

  const querySubgraph = useCallback(async () => {
    if (!(nest && nest.nestTokenAddress && bao)) return

    const wethPrice = await getWethPriceLink(bao)
    const pairPrice = await GraphClient.getPriceFromPair(
      wethPrice,
      nest.nestTokenAddress,
    )
    setRes(pairPrice)
  }, [bao, nest])

  useEffect(() => {
    querySubgraph()
  }, [bao, nest])

  return res
}

export default usePairPrice
