import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { nestRedeem, getNestContract } from '../bao/utils'

const useNestRedeem = (nid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const nestContract = getNestContract(bao)

  const handleNestRedeem = useCallback(
    async (amount: string) => {
      console.log()
      const txHash = await nestRedeem(
        nestContract,
        nid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, nid, bao],
  )

  return { onNestRedeem: handleNestRedeem }
}

export default useNestRedeem
