import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getNestContract, nestRedeem } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import { exponentiate } from 'utils/numberFormat'

const useNestRedeem = (nid: number, redeemToWeth = true) => {
  const { account } = useWeb3React()
  const bao = useBao()
  const nestContract = getNestContract(bao, nid)

  const handleNestRedeem = useCallback(
    (amount: string) => {
      return redeemToWeth
        ? bao
            .getContract('nestRedeem')
            .methods.redeemNestToWeth(
              nestContract.options.address,
              exponentiate(amount).toString(),
            )
            .send({ from: account })
        : nestRedeem(nestContract, amount, account)
    },
    [account, bao, redeemToWeth, nestContract],
  )

  return { onNestRedeem: handleNestRedeem }
}

export default useNestRedeem
