import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useWallet } from 'use-wallet'
import Config from 'bao/lib/config'
import { getRecipeContract, nestIssue } from 'bao/utils'
import useBao from 'hooks/base/useBao'

const useNestIssue = (nestContractAddress: string) => {
  const { account } = useWallet()
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const handleIssue = useCallback(
    (amountWeth: BigNumber, encodedAmountData: string) =>
      nestIssue(
        recipeContract,
        nestContractAddress,
        Config.addressMap.WETH,
        amountWeth,
        encodedAmountData,
        account,
      ),
    [account, nestContractAddress, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
