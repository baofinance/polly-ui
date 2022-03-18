import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getMasterChefContract, harvest } from 'bao/utils'
import useBao from 'hooks/base/useBao'

const useReward = (pid: number) => {
  const { account } = useWeb3React()
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
