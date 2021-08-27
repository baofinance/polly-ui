import BigNumber from 'bignumber.js'
import { Nest, NestComponent } from 'contexts/Nests/types'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getBalance, getContract, getCreamContract } from 'utils/erc20'
import { getBalanceNumber } from 'utils/formatBalance'
import GraphClient from 'utils/graph'
import { provider } from 'web3-core'
import { getWethPriceLink } from '../bao/utils'
import useBao from './useBao'
import { addressMap } from '../bao/lib/constants'

const useComposition = (nest: Nest) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [composition, setComposition] = useState<
    Array<NestComponent> | undefined
  >()
  const bao = useBao()

  useEffect(() => {
    if (!nest || !nest.nestContract) return

    nest.nestContract.methods
      .getTokens()
      .call()
      .then(async (tokenComposition: string[]) => {
        const prices: any = await GraphClient.getPriceHistoryMultiple(
          tokenComposition.map((tokenAddress: string) =>
            _getTokenAddress(tokenAddress),
          ),
        )
        const wethPrice = await getWethPriceLink(bao)

        const res = await Promise.all(
          tokenComposition.map(async (component: any) => {
            const specialCaseToken = _getTokenAddress(component).toLowerCase()
            const graphData = _.find(
              prices.tokens,
              (token) => token.id === specialCaseToken,
            )

            if (!graphData) return

            const imageUrl = require(`assets/img/assets/${_getImageURL(
              graphData.symbol,
            )}.png`)

            const componentBalance = await getBalance(
              ethereum,
              component,
              nest.nestTokenAddress,
            )

            let price = graphData.dayData[0].priceUSD
            if (price === '0')
              price = await GraphClient.getPriceFromPair(
                wethPrice,
                graphData.id,
              )

            let specialSymbol, specialDecimals
            if (component.toLowerCase() !== specialCaseToken) {
              const specialContract = getContract(
                ethereum,
                component.toLowerCase(),
              )
              const [symbol, decimals] = await Promise.all([
                specialContract.methods.symbol().call(),
                specialContract.methods.decimals().call(),
              ])
              specialSymbol = symbol
              specialDecimals = decimals

              // Special corrections for the price of lending assets etc.
              if (_getStrategy(symbol) === 'CREAM') {
                const creamContract = getCreamContract(ethereum, component)
                const exchangeRate = await creamContract.methods
                  .exchangeRateCurrent()
                  .call()

                const underlying = getBalanceNumber(
                  new BigNumber(exchangeRate).times(componentBalance),
                  18,
                )
                price = new BigNumber(price).times(
                  new BigNumber(
                    getBalanceNumber(new BigNumber(underlying).plus(1)),
                  ).div(
                    getBalanceNumber(new BigNumber(componentBalance), decimals),
                  ),
                )
              }
            }

            return {
              address: graphData.id,
              rawAddress: component,
              decimals: graphData.decimals,
              name: graphData.name,
              symbol: specialSymbol || graphData.symbol,
              percentage: undefined,
              color: nest.pieColors[graphData.symbol],
              balance: new BigNumber(componentBalance),
              balanceDecimals: specialDecimals || graphData.decimals,
              imageUrl,
              price: new BigNumber(price),
              strategy: _getStrategy(specialSymbol || graphData.symbol),
            }
          }),
        )

        // Calculate total USD value of all component tokens in nest contract
        const totalUsd = _.sum(
          _.map(res, (component) => {
            if (component && component.price)
              return component.price
                .times(
                  getBalanceNumber(
                    component.balance,
                    component.balanceDecimals,
                  ),
                )
                .toNumber()
          }),
        )

        // Calculate percentages of component tokens in nest contract
        _.each(res, (component) => {
          if (component && component.price)
            component.percentage = component.price
              .times(
                getBalanceNumber(component.balance, component.balanceDecimals),
              )
              .div(totalUsd)
              .times(100)
              .toFixed(2)
        })

        setComposition(
          _.orderBy(
            res,
            (component) => parseFloat(component.percentage),
            'desc',
          ),
        )
      })
  }, [nest])

  return composition
}

const SPECIAL_TOKEN_ADDRESSES: any = {
  '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390': addressMap.WETH, // amWETH
  '0x4486835e0c567a320c0636d8f6e6e6679a46a271': addressMap.AAVE, // crAAVE
  '0x20d5d319c2964ecb52e1b006a4c059b7f6d6ad0a': addressMap.LINK, // crLINK
  '0xe82225ba6bed28406912522f01c7102dd9f07e78': addressMap.CRV, // crCRV
  '0x3fae5e5722c51cdb5b0afd8c7082e8a6af336ee8': addressMap.MATIC, // crMATIC
  '0x468a7bf78f11da82c90b17a93adb7b14999af5ab': addressMap.SUSHI, // crSUSHI
  '0xd4409b8d17d5d49a7ed9ae734b0e8edba29b9ffa': addressMap.SNX, // crSNX
}

// Special cases for token addresses (i.e. lending strategies)
const _getTokenAddress = (tokenAddress: string) =>
  SPECIAL_TOKEN_ADDRESSES[tokenAddress.toLowerCase()] || tokenAddress

const _getStrategy = (symbol: string) =>
  symbol.startsWith('cr') ? 'CREAM' : symbol.startsWith('am') ? 'AAVE' : 'NONE'

// Special cases for image URLS, i.e. wrapped assets
const _getImageURL = (symbol: string) =>
  symbol.toLowerCase() === 'wmatic' ? 'MATIC' : symbol

export default useComposition
