import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import _ from 'lodash'
import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import { addressMap, supportedNests } from '../bao/lib/constants'
import GraphUtil from '../utils/graph'
import { getBalance } from 'utils/erc20'
import { getBalanceNumber, getDisplayBalance } from '../utils/formatBalance'

import experipieAbi from '../bao/lib/abi/experipie.json'

/**
 * Home analytics hook, temporary until we've got a subgraph deployed
 * for nests & polly token.
 */
const useHomeAnalytics = () => {
  const [analytics, setAnalytics] = useState<Array<{
    title: string,
    data: any
  }> | undefined>()

  // Read only web3 instance
  const web3 = new Web3(
    new Web3.providers.HttpProvider('https://rpc-mainnet.maticvigil.com')
  )

  const fetchAnalytics = useCallback(async () => {
    const totalNestUsdMap: Array<{
      price: BigNumber,
      supply: number
    }> = []
    const ethPrice = await GraphUtil.getPrice(addressMap.WETH)
    for (const nest of supportedNests) {
      const nestAddress: any =
        nest.nestAddress[137] || nest.nestAddress
      const nestContract = new web3.eth.Contract(
        experipieAbi as AbiItem[],
        nestAddress
      )
      const [decimals, supply] = await Promise.all([
        nestContract.methods.decimals().call(),
        nestContract.methods.totalSupply().call(),
      ])

      totalNestUsdMap.push({
        price: await GraphUtil.getPriceFromPair(
          ethPrice,
          nestAddress
        ),
        supply: getBalanceNumber(new BigNumber(supply), decimals)
      })
    }
    const totalNestUsd = new BigNumber(
      _.sum(
        totalNestUsdMap.map(data =>
          data.price.times(data.supply).toNumber()
        )
      )
    )

    setAnalytics([
      {
        title: 'Polly Supply',
        data: '-'
      },
      {
        title: 'Cumulative Market Cap (Nests)',
        data: `$${getDisplayBalance(totalNestUsd, 0)}`
      },
      {
        title: 'Farms TVL',
        data: '-'
      },
      {
        title: 'BAO Burned 🔥',
        data: getDisplayBalance(
          new BigNumber(
            await getBalance(web3.currentProvider, addressMap.BAO, addressMap.DEAD)
          )
        )
      }
    ])
  }, [])

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return analytics
}

export default useHomeAnalytics
