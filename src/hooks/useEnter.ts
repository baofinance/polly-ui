import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { enter, gettBaoStakingContract } from '../bao/utils'
import useBao from './useBao'

const useEnter = () => {
  const { account } = useWallet()
  const bao = useBao()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await enter(gettBaoStakingContract(bao), amount, account)
      console.log(txHash)
    },
    [account],
  )

  return { onEnter: handle }
}

export default useEnter
