import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { approvev2 } from 'bao/utils'

const useApprovev2 = (tokenContract: Contract, spenderContract: Contract) => {
  const { account } = useWeb3React()

  const handleApprove = useCallback(() => {
    return approvev2(tokenContract, spenderContract, account)
  }, [account, tokenContract, spenderContract])

  return { onApprove: handleApprove }
}

export default useApprovev2
