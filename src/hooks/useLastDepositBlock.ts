import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getLastDepositBlock, getMasterChefContract } from 'bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useLastDepositBlock = (pid: number) => {
  const [lastDepositBlock, setLastDepositBlock] = useState(new BigNumber(0).toNumber())
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchLastDepositBlock = useCallback(async () => {
    const lastDepositBlock = await getLastDepositBlock(masterChefContract, pid, account)
    setLastDepositBlock(new BigNumber(lastDepositBlock).toNumber())
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchLastDepositBlock()
    }
  }, [account, block, masterChefContract, setLastDepositBlock, bao])

  return lastDepositBlock
}

export default useLastDepositBlock
