import { BigNumber } from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { getMasterChefContract, getStaked } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useBlock from 'hooks/base/useBlock'

const useStakedBalance = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()
  let userBalance

  const fetchBalance = useCallback(async () => {
    BigNumber.config({ DECIMAL_PLACES: 18 })
    const balance = await getStaked(masterChefContract, pid, account)
    userBalance = new BigNumber(balance)
    setBalance(userBalance.decimalPlaces(18))
  }, [account, pid, bao])

  useEffect(() => {
    if (account && bao) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, bao])

  return balance.decimalPlaces(18)
}

export default useStakedBalance
