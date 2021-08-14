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

  const handleIssue = useCallback(
    async (amountWeth: string, amountIndex: string) => {
      const encodedAmountData = await recipeContract.methods
        .encodeData(new BigNumber(amountIndex).times(10 ** 18).toString())
        .call()

      const txHash = await nestIssue(
        recipeContract,
        nestContractAddress,
        addressMap.WETH,
        amountWeth,
        encodedAmountData,
        account,
      )
      console.log(txHash)
    },
    [account, nestContractAddress, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
