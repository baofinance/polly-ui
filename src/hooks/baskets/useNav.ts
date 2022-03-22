import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import Config from 'bao/lib/config'
import { NestComponent } from '../../contexts/Nests/types'
import GraphUtil from 'utils/graph'
import useBao from '../base/useBao'
import { decimate } from 'utils/numberFormat'

const useNav = (composition: Array<NestComponent>, supply: BigNumber) => {
  const [nav, setNav] = useState<
    { nav: BigNumber; mainnetNav: BigNumber } | undefined
  >()
  const bao = useBao()

  useEffect(() => {
    if (!(bao && composition && supply)) return

    let mainnetAddresses = composition.map(
      (component: NestComponent) => MAINNET_ADDRESS_MAP[component.address],
    )
    if (mainnetAddresses.includes(undefined)) mainnetAddresses = [] // If a component has no mainnet address, don't fetch mainnet NAV
    GraphUtil.getPriceHistoryMultiple(mainnetAddresses, 'mainnet', 1).then(
      async (_mainnetPrices: any) => {
        const mainnetPrices = JSON.parse(JSON.stringify(_mainnetPrices)) // Create mutable copy
        const wethPrice = await GraphUtil.getPrice(
          MAINNET_ADDRESS_MAP[Config.addressMap.WETH],
          'mainnet',
        )
        // Check for special case low liquidity pairs
        for (let i = 0; i < mainnetPrices.tokens.length; i++) {
          const priceInfo = {
            id: mainnetPrices.tokens[i].id,
            dayData: mainnetPrices.tokens[i].dayData,
          }
          // RAI Liquidity on SUSHI mainnet is very low, causing a skew in mainnet NAV
          // comparison. This can be removed once RAI has a large enough pool on SUSHI's
          // mainnet exchange.
          if (mainnetPrices.tokens[i].id === MAINNET_ADDRESS_MAP[Config.addressMap.RAI]) {
            const raiOracle = bao.getNewContract(
              'chainoracle.json',
              '0x7f45273fD7C644714825345670414Ea649b50b16'
            )
            const raiPrice = await raiOracle.methods.latestRoundData().call()
            mainnetPrices.tokens[i].dayData[0].priceUSD =
              decimate(raiPrice.answer, 8).toString()
          } else if (parseFloat(priceInfo.dayData[0].priceUSD) <= 0) {
            mainnetPrices.tokens[i].dayData[0].priceUSD = (
              await GraphUtil.getPriceFromPair(
                wethPrice,
                priceInfo.id,
                'mainnet',
              )
            ).toString()
          }
        }

        // Map price info to mainnet addresses
        const mainnetPriceMap: any = {}
        mainnetAddresses.forEach((address) => {
          mainnetPriceMap[address] = new BigNumber(
            _.find(
              mainnetPrices.tokens,
              (priceInfo: any) =>
                priceInfo.id.toLowerCase() === address.toLowerCase(),
            ).dayData[0].priceUSD,
          )
        })

        let totalUSD = new BigNumber(0)
        let totalUSDMainnet = new BigNumber(0)
        // matic assets
        composition
          .map((component) => {
            return component.price.times(
              component.balance.div(10 ** component.balanceDecimals),
            )
          })
          .forEach((usdVal) => (totalUSD = totalUSD.plus(usdVal)))
        // mainnet assets
        if (mainnetAddresses.length > 0) // If a component has no mainnet address, don't fetch mainnet NAV
          composition
            .map((component) => {
              return mainnetPriceMap[
                MAINNET_ADDRESS_MAP[component.address]
                ].times(
                component.baseBalance ||
                component.balance.div(10 ** component.balanceDecimals),
              )
            })
            .forEach((usdVal) => (totalUSDMainnet = totalUSDMainnet.plus(usdVal)))
        setNav({
          nav: totalUSD.div(supply.div(10 ** 18)),
          mainnetNav: totalUSDMainnet.div(supply.div(10 ** 18)),
        })
      },
    )
  }, [bao, composition, supply])

  return nav
}

const MAINNET_ADDRESS_MAP: any = {
  '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619':
    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', // WETH
  '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39':
    '0x514910771af9ca656af840dff83e8264ecf986ca', // LINK
  '0x4257ea7637c355f81616050cbb6a9b709fd72683':
    '0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b', // CVX
  '0x172370d5cd63279efa6d502dab29171933a610af':
    '0xD533a949740bb3306d119CC777fa900bA034cd52', // CRV
  '0x50b728d8d964fd00c2d0aad81718b71311fef68a':
    '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f', // SNX
  '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a':
    '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2', // SUSHI
  '0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c':
    '0xc00e94cb662c3520282e6f5717214004a7f26888', // COMP
  '0x6f7c932e7684666c9fd1d44527765433e01ff61d':
    '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2', // MKR
  '0xd6df932a45c0f255f85145f286ea0b292b21c90b':
    '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', // AAVE
  '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3':
    '0xba100000625a3754423978a60c9317c58a424e3d', // BAL
  '0xda537104d6a5edd53c6fbba9a898708e465260b6':
    '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e', // YFI
  '0x95c300e7740d2a88a44124b424bfc1cb2f9c3b89':
    '0xdbdb4d16eda451d0503b854cf79d55697f90c8df', // ALCX
  '0xc81278a52ad0e1485b7c3cdf79079220ddd68b7d':
    '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1', // BAO
  '0xb33eaad8d922b1083446dc23f610c2567fb5180f':
    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI
  '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270':
    '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0', // MATIC
  '0x3066818837c5e6ed6601bd5a91b0762877a6b731':
    '0x04Fa0d235C4abf4BcF4787aF4CF447DE572eF828', // UMA
  '0x3ae490db48d74b1bc626400135d4616377d0109f':
    '0xa1faa113cbe53436df28ff0aee54275c13b40975', // ALPHA
  '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063':
    '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
  '0x00e5646f60ac6fb446f621d146b6e1886f002905':
    '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919', // RAI
  '0xc2132d05d31c914a87c6611c10748aeb04b58e8f':
    '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174':
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
  '0x5fe2b58c013d7601147dcdd68c143a77499f5531':
    '0xc944E90C64B2c07662A292be6244BDf05Cda44a7', // GRT
}

export default useNav
