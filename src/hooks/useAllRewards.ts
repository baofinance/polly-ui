import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getMasterChefContract, harvest } from '../bao/utils'
import useReward from 'hooks/useReward'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import useBao from './useBao'

const useAllRewards = () => {
  const farmsWithBalance = useFarmsWithBalance();
  const { account } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleAllRewards = useCallback(async () => {
    try {
      const txHashes: Array<string> = await Promise.all(
        farmsWithBalance.map((farmPid) => {
          return harvest(masterChefContract, farmPid, account);
        })
      )
    } catch(error) {
      console.log("failed to harvest all farms");
      console.log(error);
    }

  }, [account, farmsWithBalance, bao])

  return { onUseAllRewards: handleAllRewards}
}

export default useAllRewards
