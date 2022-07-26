import { Bao } from 'bao'
import erc20Abi from 'bao/lib/abi/erc20.json'
import lpAbi from 'bao/lib/abi/uni_v2_lp.json'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js/bignumber'
import { Multicall as MC } from 'ethereum-multicall'
import useReservesPrices from 'hooks/baskets/useReservesPrices'
import { useCallback, useEffect, useState } from 'react'
import Multicall from 'utils/multicall'
import { decimate } from 'utils/numberFormat'
import { AbiItem } from 'web3-utils'
import useGeckoPrices from '../baskets/useGeckoPrices'

export const fetchLPInfo = async (farms: any[], multicall: MC, bao: Bao) => {
  const results = Multicall.parseCallResults(
    await multicall.call(
      Multicall.createCallContext(
        farms.map((farm) =>
          farm.pid === 14 ||
          farm.pid === 23 ||
          farm.pid === 27 ||
          farm.pid === 28 // single asset farms (TODO: make single asset a config field)
            ? ({
                ref: farm.lpAddresses[Config.networkId],
                contract: new bao.web3.eth.Contract(
                  erc20Abi as AbiItem[],
                  farm.lpAddresses[Config.networkId],
                ),
                calls: [
                  {
                    method: 'balanceOf',
                    params: [
                      Config.contracts.masterChef[Config.networkId].address,
                    ],
                  },
                  { method: 'totalSupply' },
                ],
              } as any)
            : ({
                ref: farm.lpAddresses[Config.networkId],
                contract: new bao.web3.eth.Contract(
                  lpAbi as AbiItem[],
                  farm.lpAddresses[Config.networkId],
                ),
                calls: [
                  { method: 'getReserves' },
                  { method: 'token0' },
                  { method: 'token1' },
                  {
                    method: 'balanceOf',
                    params: [
                      Config.contracts.masterChef[Config.networkId].address,
                    ],
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

    if (
      key.toLowerCase() === Config.addressMap.nDEFI.toLowerCase() ||
      key.toLowerCase() === Config.addressMap.nSTBL.toLowerCase() ||
      key.toLowerCase() === Config.addressMap.nPOLY.toLowerCase() ||
      key.toLowerCase() === Config.addressMap.nINFR.toLowerCase()
    )
      return {
        singleAsset: true,
        lpAddress: key,
        lpStaked: new BigNumber(res0[0].values[0].hex),
        lpSupply: new BigNumber(res0[1].values[0].hex),
      }

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

const useAllFarmTVL = (bao: Bao, multicall: MC) => {
  const [tvl, setTvl] = useState<any | undefined>()
  const geckoPrices = useGeckoPrices()
  const tokenPrices = useReservesPrices()

  const fetchAllFarmTVL = useCallback(async () => {
    const lps: any = await fetchLPInfo(Config.farms, multicall, bao)
    const wethPrice = geckoPrices[Config.addressMap.WETH.toLowerCase()]

    const tvls: any[] = []
    let _tvl = new BigNumber(0)
    lps.forEach((lpInfo: any) => {
      let lpStakedUSD
      if (lpInfo.singleAsset) {
        lpStakedUSD = decimate(lpInfo.lpStaked).times(
          tokenPrices[lpInfo.lpAddress.toLowerCase()],
        )
        _tvl = _tvl.plus(lpStakedUSD)
      } else {
        let token, tokenPrice, specialPair
        if (
          lpInfo.tokens[0].address.toLowerCase() ===
            Config.addressMap.POLLY.toLowerCase() &&
          lpInfo.tokens[1].address.toLowerCase() ===
            Config.addressMap.nDEFI.toLowerCase()
        ) {
          // POLLY-nDEFI pair
          token = lpInfo.tokens[1]
          specialPair = true
        } else if (
          lpInfo.tokens[0].address.toLowerCase() ===
            Config.addressMap.WETH.toLowerCase() ||
          lpInfo.tokens[0].address.toLowerCase() ===
            Config.addressMap.RAI.toLowerCase()
        )
          // *-wETH pair and *-RAI pair
          token = lpInfo.tokens[0]
        else token = lpInfo.tokens[1]

        if (
          token.address.toLowerCase() === Config.addressMap.WETH.toLowerCase()
        )
          // *-wETH pair
          tokenPrice = wethPrice
        else if (
          token.address.toLowerCase() ===
            Config.addressMap.nDEFI.toLowerCase() &&
          specialPair
        )
          // POLLY-nDEFI pair
          tokenPrice = tokenPrices[Config.addressMap.nDEFI.toLowerCase()]
        // *-RAI pair
        else tokenPrice = geckoPrices[Config.addressMap.RAI.toLowerCase()]

        lpStakedUSD = token.balance
          .times(tokenPrice)
          .times(2)
          .times(lpInfo.lpStaked.div(lpInfo.lpSupply))
      }

      tvls.push({
        lpAddress: lpInfo.lpAddress,
        tvl: lpStakedUSD,
        lpStaked: lpInfo.lpStaked,
      })
      _tvl = _tvl.plus(lpStakedUSD)
    })
    setTvl({
      tvl: _tvl,
      tvls,
    })
  }, [bao, multicall, tokenPrices, geckoPrices])

  useEffect(() => {
    // Only fetch TVL once per page load
    if (!(bao && multicall && tokenPrices && geckoPrices) || tvl) return

    fetchAllFarmTVL()
  }, [bao, multicall, tokenPrices, geckoPrices])

  return tvl
}

export default useAllFarmTVL
