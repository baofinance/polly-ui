import Config from 'bao/lib/config'
import { ActiveSupportedNest } from 'bao/lib/types'
import { getRecipeContract, getWethPriceContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import useBao from 'hooks/base/useBao'
import useBlock from 'hooks/base/useBlock'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import { useCallback, useEffect, useState } from 'react'
import MultiCall from 'utils/multicall'
import { decimate, exponentiate } from 'utils/numberFormat'

const useNestRate = (nest: ActiveSupportedNest) => {
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)
  const wethAddress = Config.addressMap.WETH
  const { transactions } = useTransactionProvider()
  const block = useBlock()

  const [wethPerIndex, setWethPerIndex] = useState<BigNumber | undefined>()
  const [wethPrice, setWethPrice] = useState<BigNumber | undefined>()
  const [usdPerIndex, setUsdPerIndex] = useState<BigNumber | undefined>()

  const nestRate = useCallback(async () => {
    if (!(bao && nest)) return

    const wethOracle = getWethPriceContract(bao)
    const multicallContext = MultiCall.createCallContext([
      {
        ref: 'recipeContract',
        contract: recipeContract,
        calls: [
          {
            method: 'getPrice',
            params: [
              wethAddress,
              nest.nestAddresses[137],
              exponentiate(1).toString(),
            ],
          },
        ],
      },
      {
        ref: 'linkWethOracle',
        contract: wethOracle,
        calls: [{ method: 'decimals' }, { method: 'latestRoundData' }],
      },
    ])
    const { recipeContract: recipeResults, linkWethOracle: oracleResults } =
      await MultiCall.parseCallResults(
        await bao.multicall.call(multicallContext),
      )
    const wethPerNest = decimate(recipeResults[0].values[0].hex)
    const _wethPrice = decimate(
      oracleResults[1].values[1].hex,
      oracleResults[0].values[0],
    )

    setWethPerIndex(wethPerNest)
    setWethPrice(_wethPrice)
    setUsdPerIndex(_wethPrice.times(wethPerNest))
  }, [bao, wethAddress, nest])

  useEffect(() => {
    nestRate()
  }, [bao, transactions, block, wethAddress, nest])

  return {
    wethPerIndex,
    wethPrice,
    usdPerIndex,
  }
}

export default useNestRate
