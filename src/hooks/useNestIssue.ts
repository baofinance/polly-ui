import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { nestIssue, getRecipeContract } from '../bao/utils'

const useNestIssue = (nid: number) => {
  const { account } = useWallet()
  const bao = useBao()

  const handleIssue = useCallback(
    async (amount: string) => {
      const txHash = await nestIssue(
        getRecipeContract(bao),
        nid,
      )
      console.log(txHash)
    },
    [account, nid, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
