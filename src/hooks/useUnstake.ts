import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getMasterChefContract, getRefUrl, unstake } from '../bao/utils'
import useBao from './useBao'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleUnstake = useCallback(
    async (amount: string) => {
      console.log(getRefUrl())
      const txHash = await unstake(
        masterChefContract,
        pid,
        amount,
        account,
        getRefUrl(),
      )
      console.log(txHash)
    },
    [account, pid, bao],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
