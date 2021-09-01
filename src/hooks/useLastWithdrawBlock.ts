import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getLastWithDrawBlock, getMasterChefContract } from 'bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useLastWithdrawBlock = (pid: number) => {
  const [lastWithdrawBlock, setLastWithdrawBlock] = useState(new BigNumber(0).toNumber())
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchLastWithdrawBlock = useCallback(async () => {
    const lastWithdrawBlock = await getLastWithDrawBlock(masterChefContract, pid, account)
    setLastWithdrawBlock(new BigNumber(lastWithdrawBlock).toNumber())
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchLastWithdrawBlock()
    }
  }, [account, block, masterChefContract, setLastWithdrawBlock, bao])

  return lastWithdrawBlock
}

export default useLastWithdrawBlock
