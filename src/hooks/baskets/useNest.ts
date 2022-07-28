import { Context } from 'contexts/Nests'
import { useContext } from 'react'
import Config from 'bao/lib/config'
import { getNestContract } from 'bao/utils'
import useBao from 'hooks/base/useBao'

const useNest: any = (id: string) => {
  const bao = useBao()
  const { nests } = useContext(Context)
  const nest = Config.nests.find((nest) => nest.nid.toString() === id)
  const nestContract = getNestContract(bao, nest.nid)

  return (
    nests.find((nest) => nest.nid.toString() === id) || {
      nid: nest.nid,
      nestToken: nest.symbol,
      nestTokenAddress: nest.nestAddresses[Config.networkId],
      nestContract: nestContract,
      inputToken: 'WETH',
      inputTokenAddress: Config.addressMap.WETH,
      name: nest.name,
      icon: '',
    }
  )
}

export default useNest
