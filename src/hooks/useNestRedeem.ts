import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import { nestRedeem } from '../bao/utils'

const useNestRedeem = (nestContract: Contract) => {
  const { account } = useWallet()

  const handleRedeem = useCallback(async () => {
    const txHash = await nestRedeem(nestContract, account)
    console.log(txHash)
    return txHash
  }, [account, nestContract])

  return { onRedeem: handleRedeem }
}

export default useNestRedeem
