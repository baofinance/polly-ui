import { useEffect, useState } from 'react'
import { NestComponent } from '../contexts/Nests/types'

const useComposition: any = (_composition: Array<NestComponent>) => {
  const [composition, setComposition]: any = useState()

  useEffect(() => {
    Promise.all(_composition.map(async (component: any) => {
      const coinGeckoInfo =
        await (await fetch(`https://api.coingecko.com/api/v3/coins/${component.coingeckoId}`)).json()

      return {
        ...component,
        imageUrl: coinGeckoInfo.image ? coinGeckoInfo.image.large : 'NOT_FOUND'
      }
    })).then(res => setComposition(res))
  }, [_composition])

  return composition
}

export default useComposition
