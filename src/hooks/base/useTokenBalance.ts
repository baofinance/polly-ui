import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import { provider } from 'web3-core'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, library } =  useWeb3React()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(library, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, library, tokenAddress])

  useEffect(() => {
    if (account && library && tokenAddress) {
      fetchBalance()
    }
  }, [account, library, setBalance, tokenAddress])

  return balance
}

export default useTokenBalance
