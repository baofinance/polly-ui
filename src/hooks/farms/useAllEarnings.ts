import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getEarned, getFarms, getMasterChefContract } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import useBlock from 'hooks/base/useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account } = useWeb3React()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)
  const { transactions } = useTransactionProvider()
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(masterChefContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllBalances()
    }
  }, [account, transactions, masterChefContract, setBalance, bao, block])

  return balances
}

export default useAllEarnings
