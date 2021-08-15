import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import {
  fetchCalcToNest,
  getRecipeContract,
  getWethPriceLink,
} from '../bao/utils'
import useBao from './useBao'

const useNestRate = (nestAddress: string) => {
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const [wethPerIndex, setWethPerIndex] = useState<BigNumber | undefined>()
  const [wethPrice, setWethPrice] = useState<BigNumber | undefined>()
  const [usdPerIndex, setUsdPerIndex] = useState<BigNumber | undefined>()

  const nestRate = useCallback(async () => {
    if (!recipeContract || !nestAddress) return

    const [wethPerNest, _wethPrice]: any = await Promise.all([
      fetchCalcToNest(recipeContract, nestAddress, 1),
      getWethPriceLink(bao),
    ])

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
