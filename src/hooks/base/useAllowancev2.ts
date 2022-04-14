import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useBao from './useBao'
import { getAllowance } from 'utils/erc20'
import { BigNumber } from 'bignumber.js'
import useTransactionProvider from './useTransactionProvider'
import useBlock from './useBlock'

const useAllowancev2 = (tokenAddress: string, spenderAddress: string) => {
  const { account } = useWeb3React()
  const bao = useBao()
  const { transactions } = useTransactionProvider()
  const block = useBlock()
  const [allowance, setAllowance] = useState<BigNumber | undefined>()

  const _getAllowance: any = useCallback(async () => {
    try {
      const tokenContract = bao.getNewContract('erc20.json', tokenAddress)
      const _allowance = await getAllowance(
        tokenContract,
        account,
        spenderAddress,
      )
      setAllowance(new BigNumber(_allowance))
    } catch (e) {
      setAllowance(new BigNumber(0))
    }
  }, [account, tokenAddress, spenderAddress])

  useEffect(() => {
    _getAllowance()
  }, [account, tokenAddress, spenderAddress, transactions, bao, block])

  return allowance
}

export default useAllowancev2
