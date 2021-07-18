import { useCallback } from 'react'
import BigNumber from 'bignumber.js';

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { nestIssue, getRecipeContract } from '../bao/utils'
import { wethMaticAddress } from '../constants/tokenAddresses';

const useNestIssue = (nestContractAddress: string) => {
  const { account } = useWallet()
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const handleIssue = useCallback(
    async (amountWeth: string, amountIndex: string) => {
      const encodedAmountData = await recipeContract.methods.encodeData(
        new BigNumber(amountIndex)
          .times(10 ** 18)
          .toString()
      ).call();

      const txHash = await nestIssue(
        recipeContract,
        nestContractAddress,
        wethMaticAddress,
        amountWeth,
        encodedAmountData,
        account
      )
      console.log(txHash)
    },
    [account, nestContractAddress, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
