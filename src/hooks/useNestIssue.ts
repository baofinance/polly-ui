import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import { addressMap } from '../bao/lib/constants'
import { getRecipeContract, nestIssue } from '../bao/utils'
import useBao from './useBao'

const useNestIssue = (nestContractAddress: string) => {
  const { account } = useWallet()
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const handleIssue = useCallback((amountWeth: BigNumber, encodedAmountData: string) =>
    nestIssue(
      recipeContract,
      nestContractAddress,
      addressMap.WETH,
      amountWeth,
      encodedAmountData,
      account,
    ),
    [account, nestContractAddress, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
