import { useEffect, useState } from 'react'
import { NestComponent } from '../contexts/Nests/types'
import BigNumber from 'bignumber.js'

const useNav = (composition: Array<NestComponent>, supply: BigNumber) => {
  const [nav, setNav] = useState<BigNumber | undefined>()

  useEffect(() => {
    if (!(composition && supply)) return

    let totalUSD = new BigNumber(0)
    composition
      .map(component =>
        component.price.times(component.balance.div(10 ** component.decimals))
      )
      .forEach(usdVal => totalUSD = totalUSD.plus(usdVal))
    setNav(totalUSD.div(supply.div(10 ** 18)))
  }, [composition, supply])

  return nav
}

export default useNav