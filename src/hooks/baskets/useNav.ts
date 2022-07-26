import { useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import { BasketComponent } from './useComposition'
import { decimate } from '../../utils/numberFormat'

const useNav = (composition: BasketComponent[], supply: BigNumber) => {
  const [nav, setNav] = useState<BigNumber | undefined>()

  useEffect(() => {
    if (!(composition && supply)) return

    setNav(
      composition
        .reduce(
          (prev, comp) =>
            prev.plus(comp.price.times(comp.balance.div(10 ** comp.decimals))),
          new BigNumber(0),
        )
        .div(decimate(supply)),
    )
  }, [composition, supply])

  return nav
}

export default useNav
