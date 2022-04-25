import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import experipieAbi from 'bao/lib/abi/experipie.json'
import Config from 'bao/lib/config'
import GraphUtil from 'utils/graph'
import MultiCall from 'utils/multicall'
import { getBalanceNumber, truncateNumber } from 'utils/numberFormat'
import useAllFarmTVL from 'hooks/farms/useAllFarmTVL'
import useBao from './useBao'
import useGeckoPrices from '../baskets/useGeckoPrices'
import useReservesPrices from "../baskets/useReservesPrices";

const useHomeAnalytics = () => {
  const [analytics, setAnalytics] = useState<
    | Array<{
        title: string
        data: any
      }>
    | undefined
  >()

  const bao = useBao()
  const geckoPrices = useGeckoPrices()
  const reservesPrices = useReservesPrices()
  const multicall = bao && bao.multicall

  const farmTVL = useAllFarmTVL(bao, multicall)

  const fetchAnalytics = useCallback(async () => {
    if (!(farmTVL && bao && geckoPrices && reservesPrices)) return

    const multicallContext = []
    for (const nest of Config.nests) {
      const nestAddress: any =
        (typeof nest.nestAddresses === 'string' && nest.nestAddresses) ||
        (nest.nestAddresses && nest.nestAddresses[Config.networkId]) ||
        nest.outputToken
      const nestContract = new bao.web3.eth.Contract(
        experipieAbi as AbiItem[],
        nestAddress,
      )
      multicallContext.push({
        ref: nestAddress,
        contract: nestContract,
        calls: [{ method: 'decimals' }, { method: 'totalSupply' }],
      })
    }

    const results = MultiCall.parseCallResults(
      await multicall.call(MultiCall.createCallContext(multicallContext)),
    )
    let totalNestUsd = new BigNumber(0)
    for (const nestAddress of Object.keys(results)) {
      const _price =
        reservesPrices[nestAddress.toLowerCase()] ||
        new BigNumber(0)
      const _supply = getBalanceNumber(
        new BigNumber(results[nestAddress][1].values[0].hex),
        results[nestAddress][0].values[0],
      )
      totalNestUsd = totalNestUsd.plus(_price.times(_supply).toNumber())
    }

    const pollySupply = await GraphUtil.getPollySupply()

    setAnalytics([
      {
        title: 'Polly Supply',
        data: truncateNumber(new BigNumber(pollySupply)),
      },
      {
        title: 'Total Value of Nests',
        data: `$${truncateNumber(totalNestUsd, 0)}`,
      },
      {
        title: 'Farms TVL',
        data: `$${truncateNumber(farmTVL.tvl, 0)}`,
      },
      {
        title: 'Polly Burned 🔥',
        data: truncateNumber(
          new BigNumber((await GraphUtil.getPollyBurned()).burnedTokens),
        ),
      },
    ])
  }, [farmTVL, bao, geckoPrices, reservesPrices])

  useEffect(() => {
    fetchAnalytics()
  }, [farmTVL, bao, geckoPrices, reservesPrices])

  return analytics
}

export default useHomeAnalytics
