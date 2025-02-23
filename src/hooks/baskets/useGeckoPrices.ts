import { useCallback, useEffect, useState } from 'react'
import useNests from './useNests'
import BigNumber from 'bignumber.js'
import { parseUnits } from 'ethers/lib/utils'

type Prices = {
  [address: string]: BigNumber
}

const useGeckoPrices = () => {
  const [prices, setPrices] = useState<Prices | undefined>()
  const nests = useNests()

  const fetchPrices = useCallback(async () => {
    const allCgIds: any = nests.reduce((prev, cur) => {
      const reversedCgIds = Object.keys(cur.cgIds).reduce(
        (_prev, _cur) => ({ ..._prev, [cur.cgIds[_cur]]: _cur }),
        {},
      )
      return { ...prev, ...reversedCgIds }
    }, {})

    const idsToQuery = Object.keys(allCgIds).join(',')
    const res = await (
      await fetch(
        `https://bao-price-api.herokuapp.com/api/price?id=${idsToQuery}`,
      )
    ).json()

    setPrices(
      Object.keys(res.price).reduce(
        (prev, cur) => ({
          ...prev,
          [allCgIds[cur].toLowerCase()]: parseUnits(
            res.price[cur].usd.toString(),
          ),
        }),
        {},
      ),
    )
  }, [nests])

  useEffect(() => {
    if (nests) fetchPrices()
  }, [nests])

  return prices
}

export default useGeckoPrices
