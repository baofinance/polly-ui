import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import {
  addressMap,
  contractAddresses,
  supportedNests,
} from '../bao/lib/constants'
import GraphUtil from '../utils/graph'
import { getBalance } from 'utils/erc20'
import { getBalanceNumber, getDisplayBalance } from '../utils/formatBalance'
import MultiCall from '../utils/multicall'
import { Multicall as MC } from 'ethereum-multicall'

import experipieAbi from '../bao/lib/abi/experipie.json'
import pollyAbi from '../bao/lib/abi/polly.json'

/**
 * Home analytics hook, temporary until we've got a subgraph deployed
 * for nests & polly token.
 */
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
    new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com'),
  )
  const multicall = new MC({ web3Instance: web3, tryAggregate: true })

  const fetchAnalytics = useCallback(async () => {
    const ethPrice = await GraphUtil.getPrice(addressMap.WETH)
    const multicallContext = []
    for (const nest of supportedNests) {
      const nestAddress: any =
        nest.nestAddress ||
        (nest.nestAddress && nest.nestAddress[137]) ||
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

    const pollyContract = new web3.eth.Contract(
      pollyAbi as AbiItem[],
      contractAddresses.polly[137],
    )
    const pollySupply = await pollyContract.methods.totalSupply().call()

    setAnalytics([
      {
        title: 'Polly Supply',
        data: getDisplayBalance(new BigNumber(pollySupply)),
      },
      {
        title: 'Total Value of Nests',
        data: `$${getDisplayBalance(totalNestUsd, 0)}`,
      },
      {
        title: 'Farms TVL',
        data: '-',
      },
      {
        title: 'BAO Burned 🔥',
        data: getDisplayBalance(
          new BigNumber(
            await getBalance(
              web3.currentProvider,
              addressMap.BAO,
              addressMap.DEAD,
            ),
          ),
        ),
      },
    ])
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return analytics
}

export default useHomeAnalytics
