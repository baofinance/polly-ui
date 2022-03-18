import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getMasterChefContract, getRefUrl, stake } from 'bao/utils'
import useBao from 'hooks/base/useBao'

const useStake = (pid: number) => {
  const { account } = useWeb3React()
  const bao = useBao()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getMasterChefContract(bao),
        pid,
        amount,
        account,
        getRefUrl(),
      )
      console.log(txHash)
    },
    [account, pid, bao],
  )

  return { onStake: handleStake }
}

export default useStake
