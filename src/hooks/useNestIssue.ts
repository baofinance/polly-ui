import { useCallback } from 'react'

import { Contract } from 'web3-eth-contract'
import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { nestIssue, getRecipeContract } from '../bao/utils'

const useNestIssue = (nestContract: Contract) => {
  const { account } = useWallet()
  const bao = useBao()

  const handleIssue = useCallback(
    async (amount: string) => {
      const txHash = await nestIssue(
        getRecipeContract(bao),
        nestContract,
      )
      console.log(txHash)
    },
    [account, nestContract, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
