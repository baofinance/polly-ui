import { Context } from 'contexts/Nests'
import { useContext } from 'react'
import Config from 'bao/lib/config'

const useNest: any = (id: string) => {
  const { nests } = useContext(Context)
  const nest = Config.nests.find((nest) => nest.nid.toString() === id)
  return (
    nests.find((nest) => nest.nid.toString() === id) || {
      nid: nest.nid,
      nestToken: nest.symbol,
      nestTokenAddress: nest.nestAddresses[Config.networkId],
      inputToken: 'WETH',
      inputTokenAddress: Config.addressMap.WETH,
      name: nest.name,
      icon: '',
    }
  )
}

export default useNest
