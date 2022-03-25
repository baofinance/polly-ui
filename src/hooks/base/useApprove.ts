import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { approve, getMasterChefContract } from 'bao/utils'
import useBao from './useBao'

const useApprove = (lpContract: Contract) => {
  const { account } = useWeb3React()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, masterChefContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, masterChefContract])

  return { onApprove: handleApprove }
}

export default useApprove
