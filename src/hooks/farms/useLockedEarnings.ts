import { useWeb3React } from '@web3-react/core'
import { getLockedEarned, getPollyContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import useBao from 'hooks/base/useBao'
import useBlock from 'hooks/base/useBlock'
import { useCallback, useEffect, useState } from 'react'

const useLockedEarnings = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const bao = useBao()
  const baoContract = getPollyContract(bao)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getLockedEarned(baoContract, account)
    setBalance(new BigNumber(balance))
  }, [account, baoContract, bao])

  useEffect(() => {
    if (account && baoContract && bao) {
      fetchBalance()
    }
  }, [account, block, baoContract, setBalance, bao])

  return balance
}

export default useLockedEarnings
