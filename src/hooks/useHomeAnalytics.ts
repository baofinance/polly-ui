import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import Config from '../bao/lib/config'
import GraphUtil from '../utils/graph'
import { getBalanceNumber, truncateNumber } from '../utils/numberFormat'
import MultiCall from '../utils/multicall'
import useBao from './useBao'

import experipieAbi from '../bao/lib/abi/experipie.json'
import useAllFarmTVL from './useAllFarmTVL'

const useHomeAnalytics = () => {
  const [analytics, setAnalytics] = useState<
    | Array<{
        title: string
        data: any
      }>
    | undefined
  >()

  const bao = useBao()
  const web3 = bao && bao.web3
  const multicall = bao && bao.multicall

  const farmTVL = useAllFarmTVL(web3, multicall)

  const fetchAnalytics = useCallback(async () => {
    if (!(farmTVL && bao)) return

    const ethPrice = await GraphUtil.getPrice(Config.addressMap.WETH)
    const multicallContext = []
    for (const nest of Config.nests) {
      const nestAddress: any =
        (typeof nest.nestAddresses === 'string' && nest.nestAddresses) ||
        (nest.nestAddresses && nest.nestAddresses[Config.networkId]) ||
        nest.outputToken
      const nestContract = new web3.eth.Contract(
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
        (await GraphUtil.getPriceFromPair(ethPrice, nestAddress)) ||
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
  }, [farmTVL, bao])

  useEffect(() => {
    fetchAnalytics()
  }, [farmTVL, bao])

  return analytics
}

export default useHomeAnalytics
