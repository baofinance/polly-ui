import { useEffect, useState } from 'react'
import { Nest, NestComponent } from '../contexts/Nests/types'
import { useWallet } from 'use-wallet'
import { getBalance, getDecimals } from '../utils/erc20'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'

const useComposition = (nest: Nest) => {
  const { ethereum }: { ethereum: provider } = useWallet()
  const [composition, setComposition] = useState<Array<NestComponent> | undefined>()

  useEffect(() => {
    Promise.all(nest.composition.map(async (component: any) => {
      const [coinGeckoInfo, componentBalance, tokenDecimals]: any = await Promise.all([
        (await fetch(`https://api.coingecko.com/api/v3/coins/${component.coingeckoId}`)).json(),
        getBalance(ethereum, component.address, nest.nestTokenAddress),
        getDecimals(ethereum, component.address)
      ])

      return {
        ...component,
        balance: new BigNumber(componentBalance),
        balanceDecimals: parseInt(tokenDecimals),
        imageUrl: coinGeckoInfo.image ? coinGeckoInfo.image.large : 'NOT_FOUND'
      }
    })).then(res => setComposition(res))
  }, [nest])

  return composition
}

export default useComposition
