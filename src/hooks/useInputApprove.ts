import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { approve, getRecipeContract } from '../bao/utils'
import useBao from './useBao'

const useInputApprove = (inputTokenContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(inputTokenContract, recipeContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, inputTokenContract, recipeContract])

  return { onApprove: handleApprove }
}

export default useInputApprove
