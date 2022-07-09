import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { Nest, NestComponent } from 'contexts/Nests/types'
import useBao from 'hooks/base/useBao'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { getBalance, getContract, getCreamContract } from 'utils/erc20'
import GraphClient from 'utils/graph'
import MultiCall from 'utils/multicall'
import { decimate, getBalanceNumber } from 'utils/numberFormat'
import useGeckoPrices from './useGeckoPrices'

const useComposition = (nest: Nest) => {
  const [composition, setComposition] = useState<
    Array<NestComponent> | undefined
  >()
  const prices = useGeckoPrices()
  const bao = useBao()

  useEffect(() => {
    if (
      !(
        nest &&
        nest.nestContract &&
        nest.pieColors &&
        prices &&
        Object.keys(prices).length > 0
      )
    )
      return

    nest.nestContract.methods
      .getTokens()
      .call()
      .then(async (tokenComposition: string[]) => {
        const graphPrices: any = await GraphClient.getPriceHistoryMultiple(
          tokenComposition.map((tokenAddress: string) =>
            _getTokenAddress(tokenAddress),
          ),
        )

        const res = await Promise.all(
          tokenComposition.map(async (component: any) => {
            const specialCaseToken = _getTokenAddress(component).toLowerCase()
            let graphData = _.find(
              graphPrices.tokens,
              (token) => token.id === specialCaseToken,
            )

            if (!graphData) {
              if (component === '0xFbdd194376de19a88118e84E279b977f165d01b8') {
                graphData = {
                  id: component.toLowerCase(),
                  name: 'Beefy Finance',
                  symbol: 'BIFI',
                  decimals: 18,
                }
              }
            }

            const imageUrl = require(`assets/img/assets/${_getImageURL(
              graphData.symbol,
            )}.png`)

            let price = prices[component.toLowerCase()],
              basePrice,
              baseBalance

            let specialSymbol, specialDecimals, componentBalance
            if (component.toLowerCase() !== specialCaseToken) {
              price = prices[SPECIAL_TOKEN_ADDRESSES[component.toLowerCase()]]
              const specialContract = getContract(bao, component.toLowerCase())

              const mcContracts = [
                {
                  ref: 'specialContract',
                  contract: specialContract,
                  calls: [{ method: 'symbol' }, { method: 'decimals' }],
                },
                {
                  ref: 'componentToken',
                  contract: getContract(bao, component),
                  calls: [
                    { method: 'balanceOf', params: [nest.nestTokenAddress] },
                  ],
                },
              ]
              if (
                Object.keys(SPECIAL_TOKEN_ADDRESSES).includes(
                  component.toLowerCase(),
                )
              ) {
                mcContracts.push(
                  {
                    ref: 'creamContract',
                    contract: getCreamContract(bao, component),
                    calls: [{ method: 'exchangeRateCurrent' }],
                  },
                  {
                    ref: 'lendingLogicKashi',
                    contract: bao.getNewContract(
                      'lendingLogicKashi.json',
                      Config.addressMap.lendingLogicKashi,
                    ),
                    calls: [
                      { method: 'exchangeRateView', params: [component] },
                    ],
                  },
                  {
                    ref: 'lendingLogicKLIMA',
                    contract: bao.getNewContract(
                      'lendingLogicKLIMA.json',
                      Config.addressMap.lendingLogicKLIMA,
                    ),
                    calls: [
                      { method: 'exchangeRateView', params: [component] },
                    ],
                  },
                )
              }
              const _multicallContext = MultiCall.createCallContext(mcContracts)
              const {
                specialContract: results,
                componentToken: componentResults,
                creamContract: creamResults,
                lendingLogicKashi: kashiResults,
              } = MultiCall.parseCallResults(
                await bao.multicall.call(_multicallContext),
              )
              specialSymbol = results[0].values[0]
              specialDecimals = results[1].values[0]
              componentBalance = componentResults[0].values[0].hex

              // Special corrections for the price of lending assets etc.
              const _strategy = _getStrategy(specialSymbol)
              if (_strategy === 'CREAM') {
                const exchangeRate = new BigNumber(
                  creamResults[0].values[0].hex,
                )
                const underlying = decimate(
                  new BigNumber(exchangeRate).times(componentBalance),
                )
                baseBalance = decimate(underlying, 18)
                basePrice = new BigNumber(price)
                price = basePrice.times(
                  new BigNumber(
                    getBalanceNumber(new BigNumber(underlying).plus(1)),
                  ).div(
                    getBalanceNumber(
                      new BigNumber(componentBalance),
                      specialDecimals,
                    ),
                  ),
                )
              } else if (_strategy === 'KASHI') {
                const exchangeRate = decimate(kashiResults[0].values[0].hex)
                const underlying = new BigNumber(componentBalance).times(
                  exchangeRate,
                )
                baseBalance = decimate(underlying, specialDecimals)
                basePrice = new BigNumber(price)
                price = basePrice.times(exchangeRate)
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
                  (await getBalance(bao, component, nest.nestTokenAddress)),
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
  }, [bao, nest, prices])

  return composition
}

const SPECIAL_TOKEN_ADDRESSES: any = {
  '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390': Config.addressMap.WETH, // amWETH
  '0x4486835e0c567a320c0636d8f6e6e6679a46a271': Config.addressMap.AAVE, // crAAVE
  '0x20d5d319c2964ecb52e1b006a4c059b7f6d6ad0a': Config.addressMap.LINK, // crLINK
  '0xe82225ba6bed28406912522f01c7102dd9f07e78': Config.addressMap.CRV, // crCRV
  '0x3fae5e5722c51cdb5b0afd8c7082e8a6af336ee8': Config.addressMap.MATIC, // crMATIC
  '0x468a7bf78f11da82c90b17a93adb7b14999af5ab': Config.addressMap.SUSHI, // crSUSHI
  '0xd4409b8d17d5d49a7ed9ae734b0e8edba29b9ffa': Config.addressMap.SNX, // crSNX
  '0x1a13f4ca1d028320a707d99520abfefca3998b7f': Config.addressMap.USDC, // amUSDC (0xd51b929792cfcde30f2619e50e91513dcec89b23 kashi USDC)
  '0x60d55f02a771d515e077c9c2403a1ef324885cec': Config.addressMap.USDT, // amUSDT
  '0x27f8d03b3a2196956ed754badc28d73be8830a6e': Config.addressMap.DAI, // amDAI
  '0xb0c22d8d350c67420f06f48936654f567c73e8c8': Config.addressMap.KLIMA, //sKLIMA
}

// Special cases for token addresses (i.e. lending strategies)
const _getTokenAddress = (tokenAddress: string) =>
  SPECIAL_TOKEN_ADDRESSES[tokenAddress.toLowerCase()] || tokenAddress

const _getStrategy = (symbol: string) =>
  symbol.startsWith('cr')
    ? 'CREAM'
    : symbol.startsWith('am')
    ? 'AAVE'
    : symbol.startsWith('km')
    ? 'KASHI'
    : symbol.startsWith('sKLIMA')
    ? 'sKLIMA'
    : 'NONE'

// Special cases for image URLS, i.e. wrapped assets
const _getImageURL = (symbol: string) =>
  symbol.toLowerCase() === 'wmatic'
    ? 'MATIC'
    : symbol.toLowerCase() === 'sklima'
    ? 'KLIMA'
    : symbol

export default useComposition
