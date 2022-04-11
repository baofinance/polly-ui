import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import { provider } from 'web3-core'
import useBao from './useBao'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } =  useWeb3React()
  const bao = useBao()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(bao, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, bao, tokenAddress])

  useEffect(() => {
    if (account && bao && tokenAddress) {
      fetchBalance()
    }
  }, [account, bao, setBalance, tokenAddress])

  return balance
}

export default useTokenBalance
