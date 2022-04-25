import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { NestComponent } from '../../contexts/Nests/types'

const useNav = (composition: Array<NestComponent>, supply: BigNumber) => {
  const [nav, setNav] = useState<{ nav: BigNumber } | undefined>()

  useEffect(() => {
    if (!(composition && supply)) return

    let totalUSD = new BigNumber(0)
    composition
      .map((component) => {
        return component.price.times(
          component.balance.div(10 ** component.balanceDecimals),
        )
      })
      .forEach((usdVal) => (totalUSD = totalUSD.plus(usdVal)))

    setNav({
      nav: totalUSD.div(supply.div(10 ** 18)),
    })
  }, [composition, supply])

  return nav
}

export default useNav
