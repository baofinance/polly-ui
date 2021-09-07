import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js/bignumber'
import Web3 from 'web3'
import { Multicall as MC } from 'ethereum-multicall'
import Multicall from '../utils/multicall'
import GraphUtil from '../utils/graph'
import { decimate } from '../utils/formatBalance'
import {
  addressMap,
  contractAddresses,
  supportedPools,
} from '../bao/lib/constants'

// LP Contract ABI
import lpAbi from '../bao/lib/abi/uni_v2_lp.json'
import { AbiItem } from 'web3-utils'

export const fetchLPInfo = async (farms: any[], multicall: MC, web3: Web3) => {
  const results = Multicall.parseCallResults(
    await multicall.call(
      Multicall.createCallContext(
        farms.map(
          (farm) =>
            ({
              ref: farm.lpAddresses[137],
              contract: new web3.eth.Contract(
                lpAbi as AbiItem[],
                farm.lpAddresses[137],
              ),
              calls: [
                { method: 'getReserves' },
                { method: 'token0' },
                { method: 'token1' },
                {
                  method: 'balanceOf',
                  params: [contractAddresses.masterChef[137]],
                },
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
      lpAddress: key,
      lpStaked: new BigNumber(res0[3].values[0].hex),
      lpSupply: new BigNumber(res0[4].values[0].hex),
    }
  })
}

const useAllFarmTVL = (web3: Web3, multicall: MC) => {
  const [tvl, setTvl] = useState<any | undefined>()

  const fetchAllFarmTVL = useCallback(async () => {
    const lps: any = await fetchLPInfo(supportedPools, multicall, web3)
    const wethPrice = await GraphUtil.getPrice(addressMap.WETH)

    const tvls: any[] = []
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
      tvls.push({
        lpAddress: lpInfo.lpAddress,
        tvl: lpStakedUSD,
      })
      _tvl = _tvl.plus(lpStakedUSD)
    })
    setTvl({
      tvl: _tvl,
      tvls,
    })
  }, [web3, multicall])

  useEffect(() => {
    // Only fetch TVL once per page load
    if (!(web3 && multicall) || tvl) return

    fetchAllFarmTVL()
  }, [web3, multicall])

  return tvl
}

export default useAllFarmTVL
