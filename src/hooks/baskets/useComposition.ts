import Config from 'bao/lib/config'
import { ActiveSupportedNest } from 'bao/lib/types'
import BigNumber from 'bignumber.js'
import useBao from 'hooks/base/useBao'
import { useCallback, useEffect, useState } from 'react'
import MultiCall from 'utils/multicall'
import { decimate } from 'utils/numberFormat'
import useGeckoPrices from './useGeckoPrices'

export type BasketComponent = {
  address: string
  symbol: string
  name: string
  decimals: number
  price: BigNumber
  image: any
  balance: BigNumber
  percentage: number
  color: string
  underlying?: string
  underlyingPrice?: BigNumber
  strategy?: string
  apy?: BigNumber
}

const useComposition = (nest: ActiveSupportedNest): Array<BasketComponent> => {
  const [composition, setComposition] = useState<
    Array<BasketComponent> | undefined
  >()
  const prices = useGeckoPrices()
  const bao = useBao()

  const fetchComposition = useCallback(async () => {
    const tokenComposition: string[] = await nest.nestContract.methods
      .getTokens()
      .call()
    const lendingRegistry = bao.getContract('lendingRegistry')

    console.log(tokenComposition)

    const tokensQuery = MultiCall.createCallContext(
      tokenComposition.map((address) => ({
        contract: bao.getNewContract('erc20.json', address),
        ref: address,
        calls: [
          { method: 'decimals' },
          { method: 'symbol' },
          { method: 'name' },
          { method: 'balanceOf', params: [address] },
        ],
      })),
    )
    const tokenInfo = MultiCall.parseCallResults(
      await bao.multicall.call(tokensQuery),
    )

    const _comp: BasketComponent[] = []
    for (let i = 0; i < tokenComposition.length; i++) {
      const _c: any = tokenInfo[tokenComposition[i]] && {
        decimals: tokenInfo[tokenComposition[i]][0].values[0],
        symbol: tokenInfo[tokenComposition[i]][1].values[0],
        name: tokenInfo[tokenComposition[i]][2].values[0],
        balance: new BigNumber(tokenInfo[tokenComposition[i]][3].values[0].hex),
      }
      _c.address = tokenComposition[i]
      _c.price = new BigNumber(prices[tokenComposition[i].toLowerCase()])

      // Check if component is lent out. If the coin gecko prices array doesn't conclude it,
      // the current component is a wrapped interest bearing token.
      if (!Object.keys(prices).includes(_c.address.toLowerCase())) {
        // Get the underlying token's address as well as the lending protocol identifer
        const lendingQuery = MultiCall.createCallContext([
          {
            contract: lendingRegistry,
            ref: 'lendingRegistry',
            calls: [
              { method: 'wrappedToUnderlying', params: [_c.address] },
              { method: 'wrappedToProtocol', params: [_c.address] },
            ],
          },
        ])
        const { lendingRegistry: lendingRes } = MultiCall.parseCallResults(
          await bao.multicall.call(lendingQuery),
        )

        _c.underlying = lendingRes[0].values[0]
        _c.underlyingPrice = prices[_c.underlying.toLowerCase()]
        _c.strategy = _getStrategy(lendingRes[1].values[0])

        // Get Exchange Rate
        const logicAddress = await lendingRegistry.methods
          .protocolToLogic(lendingRes[1].values[0])
          .call()
        const logicContract = bao.getNewContract(
          'lendingLogicKashi.json',
          logicAddress,
        )
        const exchangeRate = await logicContract.methods
          .exchangeRate(_c.address)
          .call()
        // xSushi APY can't be found on-chain, check for special case
        const apy = new BigNumber(
          await logicContract.methods
            .getAPRFromUnderlying(lendingRes[0].values[0])
            .call(),
        )
        const underlyingDecimals = await bao
          .getNewContract('erc20.json', lendingRes[0].values[0])
          .methods.decimals()
          .call()

        _c.price = decimate(
          prices[_c.underlying.toLowerCase()].times(exchangeRate),
        )
        _c.apy = apy

        // Adjust price for compound's exchange rate.
        // wrapped balance * exchange rate / 10 ** (18 - 8 + underlyingDecimals)
        // Here, the price is already decimated by 1e18, so we can subtract 8
        // from the underlying token's decimals.
        if (_c.strategy === 'Compound')
          _c.price = decimate(_c.price, underlyingDecimals - 8)
      }

      _comp.push({
        ..._c,
        image: require(`assets/img/assets/${_getImageURL(_c.symbol)}.png`),
        color: nest.pieColors[_c.symbol],
      })
    }

    const marketCap = _comp.reduce(
      (prev, comp) =>
        prev.plus(decimate(comp.balance, comp.decimals).times(comp.price)),
      new BigNumber(0),
    )

    // Assign allocation percentages
    for (let i = 0; i < _comp.length; i++) {
      const comp = _comp[i]

      _comp[i].percentage = decimate(new BigNumber(comp.balance), comp.decimals)
        .times(comp.price)
        .div(marketCap)
        .times(100)
        .toNumber()
    }

    setComposition(_comp)
  }, [bao, nest, prices])

  useEffect(() => {
    if (
      !(
        bao &&
        nest &&
        nest.nestContract &&
        nest.pieColors &&
        prices &&
        Object.keys(prices).length > 0
      )
    )
      return

    fetchComposition()
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
