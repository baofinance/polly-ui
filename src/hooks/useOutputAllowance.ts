import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { recipe } from '../constants/tokenAddresses'

const useOutputAllowance = (nestContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      nestContract,
      account,
      recipe,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, nestContract])

  useEffect(() => {
    if (account && nestContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, nestContract])

  return allowance
}

export default useOutputAllowance
