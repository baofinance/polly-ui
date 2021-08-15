import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getAllowance } from 'utils/erc20'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { contractAddresses } from '../bao/lib/constants'

const useInputAllowance = (inputTokenContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      inputTokenContract,
      account,
      contractAddresses.recipe[137],
    )
    setAllowance(new BigNumber(allowance))
  }, [account, inputTokenContract])

  useEffect(() => {
    if (account && inputTokenContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, inputTokenContract])

  return allowance
}

export default useInputAllowance
