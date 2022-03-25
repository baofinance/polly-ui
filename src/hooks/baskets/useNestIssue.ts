import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { getRecipeContract, nestIssue } from 'bao/utils'
import useBao from 'hooks/base/useBao'

const useNestIssue = (nestContractAddress: string) => {
  const { account } = useWeb3React()
  const bao = useBao()
  const recipeContract = getRecipeContract(bao)

  const handleIssue = useCallback(
    (amountWeth: BigNumber, nestAmount: string) =>
      nestIssue(
        recipeContract,
        nestContractAddress,
        Config.addressMap.WETH,
        amountWeth,
        nestAmount,
        account,
      ),
    [account, nestContractAddress, bao],
  )

  return { onIssue: handleIssue }
}

export default useNestIssue
