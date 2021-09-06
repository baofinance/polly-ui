import { useCallback, useEffect, useState } from 'react'
import { Multicall as MC } from 'ethereum-multicall'
import Multicall from '../utils/multicall'
import BigNumber from 'bignumber.js/bignumber'
import { Farm } from '../contexts/Farms'
import { Bao } from '../bao'
import { decimate, getDisplayBalance } from '../utils/formatBalance'
import { getMasterChefContract, getWethPriceLink } from '../bao/utils'
import useBao from './useBao'
import useMulticall from './useMulticall'
import useFarms from './useFarms'
import { addressMap } from '../bao/lib/constants'

export const fetchLPInfo = async (farms: Farm[], bao: Bao, multicall: MC) => {
  if (!(farms && bao && multicall)) return undefined

  const masterChef = getMasterChefContract(bao)
  const results = Multicall.parseCallResults(
    await multicall.call(
      Multicall.createCallContext(
        farms.map(
          (farm, i) =>
            ({
              ref: i,
              contract: farm.lpContract,
              calls: [
                { method: 'getReserves' },
                { method: 'token0' },
                { method: 'token1' },
                { method: 'balanceOf', params: [masterChef.options.address] },
                { method: 'totalSupply' },
              ],
            } as any),
        ),
      ),
    ),
  )

  return Object.keys(results).map((key: any) => {
    const res0 = results[key]
    const reserves = [
      new BigNumber(res0[0].values[0].hex),
      new BigNumber(res0[0].values[1].hex),
    ]
    const token0Address = res0[1].values[0]
    const token1Address = res0[2].values[0]

    const tokens = [
      {
        address: token0Address,
        balance: decimate(reserves[0]),
      },
      {
        address: token1Address,
        balance: decimate(reserves[1]),
      },
    ]

    return {
      tokens,
      lpStaked: new BigNumber(res0[3].values[0].hex),
      lpSupply: new BigNumber(res0[4].values[0].hex),
    }
  })
}

const useAllFarmTVL = () => {
  const bao = useBao()
  const multicall = useMulticall()
  const farms = useFarms()

  const [tvl, setTvl] = useState<BigNumber | undefined>()

  const fetchAllFarmTVL = useCallback(async () => {
    const wethPrice = await getWethPriceLink(bao)
    const lps: any = await fetchLPInfo(farms[0], bao, multicall)

    let _tvl = new BigNumber(0)
    lps.forEach((lpInfo: any) => {
      const lpStakedUSD = (
        lpInfo.tokens[0].address.toLowerCase() === addressMap.WETH.toLowerCase()
          ? lpInfo.tokens[0].balance
          : lpInfo.tokens[1].balance
      )
        .times(wethPrice)
        .times(2)
        .times(lpInfo.lpStaked.div(lpInfo.lpSupply))
      _tvl = _tvl.plus(lpStakedUSD)
    })
    setTvl(_tvl)
  }, [bao, multicall])

  useEffect(() => {
    if (!(bao && multicall && farms)) return

    fetchAllFarmTVL()
  }, [bao, multicall])

  return tvl
}

export default useAllFarmTVL
