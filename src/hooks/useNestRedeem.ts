import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { getNestContract, nestRedeem } from '../bao/utils'
import useBao from './useBao'
import { exponentiate } from '../utils/numberFormat'

const useNestRedeem = (nid: number, redeemToWeth = true) => {
  const { account } = useWallet()
  const bao = useBao()
  const nestContract = getNestContract(bao, nid)

  const handleNestRedeem = useCallback(
    (amount: string) => {
      return redeemToWeth
        ? bao.getContract('nDefiRedeem')
          .methods
          .redeemNestToWeth(exponentiate(amount))
          .send({ from: account })
        : nestRedeem(nestContract, amount, account)
    },
    [account, nid, bao, redeemToWeth],
  )

  return { onNestRedeem: handleNestRedeem }
}

export default useNestRedeem
