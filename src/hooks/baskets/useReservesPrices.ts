import { useCallback, useEffect, useState } from 'react'
import useFarms from '../farms/useFarms'
import Multicall from '../../utils/multicall'
import useBao from '../base/useBao'
import BigNumber from 'bignumber.js'
import { getWethPriceLink } from '../../bao/utils'

type Prices = {
  [address: string]: BigNumber
}

const useReservesPrices = () => {
  const [prices, setPrices] = useState<Prices | undefined>()
  const bao = useBao()
  const farms = useFarms()

  const fetchPrices = useCallback(async () => {
    const wethPrice = await getWethPriceLink(bao)

    // TODO: Remove hard-coding of PID-nest map
    const NEST_PIDS: { [pid: number]: string } = {
      16: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      24: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      25: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      26: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
    }

    const contracts = Object.keys(NEST_PIDS).map((pid) =>
      bao.getNewContract(
        'uni_v2_lp.json',
        farms.find((farm) => farm.pid === parseInt(pid)).lpTokenAddress,
      ),
    )

    const ctx = Multicall.createCallContext(
      contracts.map((lp) => ({
        contract: lp,
        ref: lp.options.address,
        calls: [
          { method: 'getReserves' },
          { method: 'token0' },
          { method: 'token1' },
        ],
      })),
    )
    const res = await Multicall.parseCallResults(await bao.multicall.call(ctx))

    const prices = Object.keys(res).reduce((prev: any, cur: any, i) => {
      const addresses = [res[cur][1].values[0], res[cur][2].values[0]]
      const wethIdx =
        addresses[0].toLowerCase() ===
        NEST_PIDS[parseInt(Object.keys(NEST_PIDS)[i])].toLowerCase()
          ? 1
          : 0

      const reserves: BigNumber[] = [0, 1].map(
        (j) => new BigNumber(res[cur][0].values[j].hex),
      )
      return {
        ...prev,
        [addresses[wethIdx ? 0 : 1].toLowerCase()]: reserves[wethIdx]
          .div(reserves[wethIdx ? 0 : 1])
          .times(wethPrice),
      }
    }, {})

    setPrices(prices)
  }, [bao, farms])

  useEffect(() => {
    if (farms && bao) fetchPrices()
  }, [bao, farms])

  return prices
}

export default useReservesPrices
