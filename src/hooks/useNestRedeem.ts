import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getNestContract, nestRedeem } from '../bao/utils'
import useBao from './useBao'

const useNestRedeem = (nid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const nestContract = getNestContract(bao, nid)

  const handleNestRedeem = useCallback(
    async (amount: string) => {
      const txHash = await nestRedeem(
        nestContract.nestContract,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, nid, bao],
  )

  return { onNestRedeem: handleNestRedeem }
}

export default useNestRedeem
