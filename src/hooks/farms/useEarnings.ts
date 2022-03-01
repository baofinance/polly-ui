import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getEarned, getMasterChefContract } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import useBlock from 'hooks/base/useBlock'

const useEarnings = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account, ethereum }: { account: string; ethereum: provider } =
    useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned(masterChefContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchBalance()
    }
  }, [account, block, masterChefContract, setBalance, bao])

  return balance
}

export default useEarnings
