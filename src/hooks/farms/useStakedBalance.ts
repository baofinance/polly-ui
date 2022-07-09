import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getMasterChefContract, getStaked } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import useBlock from 'hooks/base/useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const { transactions } = useTransactionProvider()
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    BigNumber.config({ DECIMAL_PLACES: 18 })
    const balance = await getStaked(masterChefContract, pid, account)
    const userBalance = new BigNumber(balance)

    setBalance(userBalance.decimalPlaces(18))
  }, [account, pid, masterChefContract])

  useEffect(() => {
    if (account && bao) {
      fetchBalance()
    }
  }, [account, pid, setBalance, transactions, bao, block])

  return balance.decimalPlaces(18)
}

export default useStakedBalance
