import { useContext } from 'react'
import { Context } from '../contexts/Nests'

import { supportedNests } from '../bao/lib/constants'
import { wethMaticAddress } from '../constants/tokenAddresses'

const useNest = (id: string) => {
  const { nests } = useContext(Context)
  const nest = supportedNests.find((nest) => nest.nid.toString() === id)
  return (
    nests.find((nest) => nest.nid.toString() === id) || {
      nid: nest.nid,
      nestToken: nest.symbol,
      nestTokenAddress: nest.nestAddress[137],
      inputToken: 'WETH',
      inputTokenAddress: wethMaticAddress,
      name: nest.name,
      icon: '',
    }
  )
}

export default useNest
