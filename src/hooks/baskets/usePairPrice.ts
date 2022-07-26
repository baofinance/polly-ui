import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import GraphClient from 'utils/graph'
import { getWethPriceLink } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import useBlock from 'hooks/base/useBlock'
import { ActiveSupportedNest } from 'bao/lib/types'

const usePairPrice = (nest: ActiveSupportedNest) => {
  const [res, setRes] = useState<BigNumber | undefined>()
  const bao = useBao()
  const { transactions } = useTransactionProvider()
  const block = useBlock()

  const querySubgraph = useCallback(async () => {
    if (!(nest && nest.address && bao)) return

    const wethPrice = await getWethPriceLink(bao)
    const pairPrice = await GraphClient.getPriceFromPair(
      wethPrice,
      nest.address,
    )
    setRes(pairPrice)
  }, [bao, nest])

  useEffect(() => {
    querySubgraph()
  }, [bao, nest, transactions, block])

  return res
}

export default usePairPrice
