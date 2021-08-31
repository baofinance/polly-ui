import BigNumber from 'bignumber.js'
import MultiCall from '../utils/multicall'
import { useCallback, useEffect, useState } from 'react'
import useBao from './useBao'
import useMulticall from './useMulticall'
import {
  getRecipeContract,
  getWethPriceContract,
} from '../bao/utils'
import { decimate, exponentiate } from '../utils/formatBalance'

const useNestRate = (nestAddress: string) => {
  const bao = useBao()
  const multicall = useMulticall()
  const recipeContract = getRecipeContract(bao)

  const [wethPerIndex, setWethPerIndex] = useState<BigNumber | undefined>()
  const [wethPrice, setWethPrice] = useState<BigNumber | undefined>()
  const [usdPerIndex, setUsdPerIndex] = useState<BigNumber | undefined>()

  const nestRate = useCallback(async () => {
    if (!recipeContract || !nestAddress) return

    const wethOracle = getWethPriceContract(bao)
    const multicallContext = MultiCall.createCallContext([
      {
        ref: 'recipeContract',
        contract: recipeContract,
        calls: [
          {
            method: 'calcToPie',
            params: [ nestAddress, exponentiate(1).toString() ]
          }
        ]
      },
      {
        ref: 'linkWethOracle',
        contract: wethOracle,
        calls: [
          { method: 'decimals' },
          { method: 'latestRoundData' }
        ]
      }
    ])
    const { recipeContract: recipeResults, linkWethOracle: oracleResults } =
      await MultiCall.parseCallResults(
        await multicall.call(multicallContext)
      )
    const wethPerNest = decimate(recipeResults[0].values[0].hex)
    const _wethPrice = decimate(
      oracleResults[1].values[1].hex,
      oracleResults[0].values[0]
    )

    setWethPerIndex(wethPerNest)
    setWethPrice(_wethPrice)
    setUsdPerIndex(_wethPrice.times(wethPerNest))
  }, [bao, nestAddress])

  useEffect(() => {
    nestRate()
  }, [bao, nestAddress])

  return {
    wethPerIndex,
    wethPrice,
    usdPerIndex,
  }
}

export default useNestRate
