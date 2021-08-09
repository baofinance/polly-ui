import { useContext } from 'react'
import { Context } from '../contexts/Nests'

import { addressMap, supportedNests } from '../bao/lib/constants'

const useNest: any = (id: string) => {
  const { nests } = useContext(Context)
  const nest = supportedNests.find((nest) => nest.nid.toString() === id)
  return (
    nests.find((nest) => nest.nid.toString() === id) || {
      nid: nest.nid,
      nestToken: nest.symbol,
      nestTokenAddress: nest.nestAddress[137],
      inputToken: 'WETH',
      inputTokenAddress: addressMap.WETH,
      name: nest.name,
      icon: '',
    }
  )
}

export default useNest
