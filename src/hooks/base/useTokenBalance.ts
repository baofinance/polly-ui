import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { getBalance } from 'utils/erc20'
import useBao from './useBao'
import useTransactionProvider from './useTransactionProvider'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } =  useWeb3React()
  const bao = useBao()
  const { transactions } = useTransactionProvider()

  const fetchBalance = useCallback(async () => {
    const balance = await getBalance(bao, tokenAddress, account)
    setBalance(new BigNumber(balance))
  }, [account, bao, tokenAddress])

  useEffect(() => {
    if (account && bao && tokenAddress) {
      fetchBalance()
    }
  }, [account, bao, setBalance, tokenAddress, transactions])

  return balance
}

export default useTokenBalance
