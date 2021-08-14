import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getMasterChefContract, harvest } from '../bao/utils'
import useBao from './useBao'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, bao])

  return { onReward: handleReward }
}

export default useReward
