import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { approve } from '../bao/utils'

const useApprovev2 = (tokenContract: Contract, spenderContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()

  const handleApprove = useCallback(async () => {
    try {
      return await approve(tokenContract, spenderContract, account)
    } catch (e) {
      return false
    }
  }, [account, tokenContract, spenderContract])

  return { onApprove: handleApprove }
}

export default useApprovev2
