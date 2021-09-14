import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import { addressMap, supportedNests } from '../bao/lib/constants'
import GraphUtil from '../utils/graph'
import { getBalanceNumber, getDisplayBalance, getAnalytics } from '../utils/formatBalance'
import MultiCall from '../utils/multicall'
import { Multicall as MC } from 'ethereum-multicall'

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

  // Read only web3 instance
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://polygon-rpc.com'),
  )
  const multicall = new MC({ web3Instance: web3, tryAggregate: true })

  const farmTVL = useAllFarmTVL(web3, multicall)

  const fetchAnalytics = useCallback(async () => {
    if (!farmTVL) return

    const ethPrice = await GraphUtil.getPrice(addressMap.WETH)
    const multicallContext = []
    for (const nest of supportedNests) {
      const nestAddress: any =
        (typeof nest.nestAddresses === 'string' && nest.nestAddresses) ||
        (nest.nestAddresses && nest.nestAddresses[137]) ||
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
        data: getAnalytics(new BigNumber(pollySupply)),
      },
      {
        title: 'Total Value of Nests',
        data: `$${getAnalytics(totalNestUsd, 0)}`,
      },
      {
        title: 'Farms TVL',
        data: `$${getAnalytics(farmTVL.tvl, 0)}`,
      },
      {
        title: 'Polly Burned 🔥',
        data: getAnalytics(
          new BigNumber((await GraphUtil.getPollyBurned()).burnedTokens),
        ),
      },
    ])
  }, [farmTVL])

  useEffect(() => {
    fetchAnalytics()
  }, [farmTVL])

  return analytics
}

export default useHomeAnalytics
