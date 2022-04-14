import BigNumber from 'bignumber.js'
import { Nest } from 'contexts/Nests'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from 'utils/graph'
import { getWethPriceLink } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'

const usePairPrice = (nest: Nest) => {
  const [res, setRes] = useState<BigNumber | undefined>()
  const bao = useBao()
  const { transactions } = useTransactionProvider()

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
  }, [bao, nest, transactions])

  return res
}

export default usePairPrice
