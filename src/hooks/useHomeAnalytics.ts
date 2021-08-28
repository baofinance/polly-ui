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
    const totalNestUsdMap: Array<{
      price: BigNumber
      supply: number
    }> = []
    const ethPrice = await GraphUtil.getPrice(addressMap.WETH)
    for (const nest of supportedNests) {
      const nestAddress: any =
        nest.nestAddress ||
        (nest.nestAddress && nest.nestAddress[137]) ||
        nest.outputToken
      const nestContract = new web3.eth.Contract(
        experipieAbi as AbiItem[],
        nestAddress,
      )
      const { nestContract: nestResults } = MultiCall.parseCallResults(
        await multicall.call(
          MultiCall.createCallContext([
            {
              ref: 'nestContract',
              contract: nestContract,
              calls: [{ method: 'decimals' }, { method: 'totalSupply' }],
            },
          ]),
        ),
      )

      totalNestUsdMap.push({
        price:
          (await GraphUtil.getPriceFromPair(ethPrice, nestAddress)) ||
          new BigNumber(0),
        supply: getBalanceNumber(
          new BigNumber(nestResults[1].values[0].hex),
          nestResults[0].values[0],
        ),
      })
    }
    const totalNestUsd = new BigNumber(
      _.sum(
        totalNestUsdMap.map((data) => data.price.times(data.supply).toNumber()),
      ),
    )

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
