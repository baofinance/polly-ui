import { useEffect, useState } from 'react'
import { Nest, NestComponent } from '../contexts/Nests/types'
import { useWallet } from 'use-wallet'
import { getBalance, getDecimals } from '../utils/erc20'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { getBalanceNumber } from '../utils/formatBalance'
import GraphClient from '../utils/graph'

const useComposition = (nest: Nest) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [composition, setComposition] = useState<Array<NestComponent> | undefined>()

  useEffect(() => {
    if (!nest || !nest.nestContract) return

    nest.nestContract.methods.getTokens().call().then(async (tokenComposition: string[]) => {
      const prices: any = await GraphClient.getPriceHistoryMultiple(tokenComposition)
      const res = await Promise.all(tokenComposition.map(async (component: any) => {
        const graphData = _.find(prices.tokens, token => token.id === component.toLowerCase())

        if (!graphData) return

        const imageUrl = require(`../assets/img/assets/${graphData.symbol}.png`)
        const componentBalance = await getBalance(ethereum, component, nest.nestTokenAddress)

        return {
          address: graphData.id,
          decimals: graphData.decimals,
          name: graphData.name,
          symbol: graphData.symbol,
          percentage: undefined,
          color: nest.pieColors[graphData.symbol],
          balance: new BigNumber(componentBalance),
          balanceDecimals: graphData.decimals,
          imageUrl,
          price: new BigNumber(graphData.dayData[0].priceUSD),
        }
      }))

      console.log(res)

      // Calculate total USD value of all component tokens in nest contract
      const totalUsd = _.sum(_.map(res, component => {
        if (component && component.price)
          return component.price.times(getBalanceNumber(component.balance, component.balanceDecimals)).toNumber()
      }))

      // Calculate percentages of component tokens in nest contract
      _.each(res, component => {
        if (component && component.price)
          component.percentage = component.price
            .times(getBalanceNumber(component.balance, component.balanceDecimals))
            .div(totalUsd)
            .times(100)
            .toFixed(2)
      })

      setComposition(res)
    })
  }, [nest])

  return composition
}

export default useComposition
