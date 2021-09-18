import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import { Nest, NestComponent } from 'contexts/Nests/types'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import useBao from './useBao'
import useMulticall from './useMulticall'
import { getBalance, getContract, getCreamContract } from 'utils/erc20'
import { decimate, getBalanceNumber } from 'utils/formatBalance'
import { getMaticPriceLink, getWethPriceLink } from '../bao/utils'
import GraphClient from 'utils/graph'
import MultiCall from 'utils/multicall'
import { addressMap } from '../bao/lib/constants'

const useComposition = (nest: Nest) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [composition, setComposition] = useState<
    Array<NestComponent> | undefined
  >()
  const bao = useBao()
  const multicall = useMulticall()

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
        const maticPrice = await getMaticPriceLink(bao)

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

            let price = new BigNumber(graphData.dayData[0].priceUSD)
                .div(wethPrice)
                .times(maticPrice),
              basePrice,
              baseBalance
            if (price.eq(0))
              price = await GraphClient.getPriceFromPair(
                wethPrice,
                graphData.id,
              )

            let specialSymbol, specialDecimals, componentBalance
            if (component.toLowerCase() !== specialCaseToken) {
              const specialContract = getContract(
                ethereum,
                component.toLowerCase(),
              )

              const mcContracts = [
                {
                  ref: 'specialContract',
                  contract: specialContract,
                  calls: [{ method: 'symbol' }, { method: 'decimals' }],
                },
                {
                  ref: 'componentToken',
                  contract: getContract(ethereum, component),
                  calls: [
                    { method: 'balanceOf', params: [nest.nestTokenAddress] },
                  ],
                },
              ]
              if (
                Object.keys(SPECIAL_TOKEN_ADDRESSES).includes(
                  component.toLowerCase(),
                )
              )
                mcContracts.push({
                  ref: 'creamContract',
                  contract: getCreamContract(ethereum, component),
                  calls: [{ method: 'exchangeRateCurrent' }],
                })
              const _multicallContext = MultiCall.createCallContext(mcContracts)
              const {
                specialContract: results,
                componentToken: componentResults,
                creamContract: creamResults,
              } = MultiCall.parseCallResults(
                await multicall.call(_multicallContext),
              )
              specialSymbol = results[0].values[0]
              specialDecimals = results[1].values[0]
              componentBalance = componentResults[0].values[0].hex

              // Special corrections for the price of lending assets etc.
              if (_getStrategy(specialSymbol) === 'CREAM') {
                const exchangeRate = new BigNumber(
                  creamResults[0].values[0].hex,
                )
                const underlying = getBalanceNumber(
                  new BigNumber(exchangeRate).times(componentBalance),
                  18,
                )
                baseBalance = decimate(underlying, 18)
                basePrice = new BigNumber(price)
                price = new BigNumber(price).times(
                  new BigNumber(
                    getBalanceNumber(new BigNumber(underlying).plus(1)),
                  ).div(
                    getBalanceNumber(
                      new BigNumber(componentBalance),
                      specialDecimals,
                    ),
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
              balance: new BigNumber(
                componentBalance ||
                  (await getBalance(
                    ethereum,
                    component,
                    nest.nestTokenAddress,
                  )),
              ),
              balanceDecimals: specialDecimals || graphData.decimals,
              imageUrl,
              price: new BigNumber(price),
              basePrice,
              baseBalance,
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
