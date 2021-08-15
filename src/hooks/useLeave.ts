import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { gettBaoStakingContract, leave } from '../bao/utils'
import useBao from './useBao'

const useLeave = () => {
  const { account } = useWallet()
  const bao = useBao()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await leave(gettBaoStakingContract(bao), amount, account)
      console.log(txHash)
    },
    [account],
  )

  return { onLeave: handle }
}

export default useLeave
