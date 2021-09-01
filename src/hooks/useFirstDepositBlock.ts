import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getFirstDepositBlock, getMasterChefContract } from 'bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useFirstDepositBlock = (pid: number) => {
  const [firstDepositBlock, setFirstDepositBlock] = useState(new BigNumber(0).toNumber())
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchFirstDepositBlock = useCallback(async () => {
    const firstDepositBlock = await getFirstDepositBlock(masterChefContract, pid, account)
    setFirstDepositBlock(new BigNumber(firstDepositBlock).toNumber())
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchFirstDepositBlock()
    }
  }, [account, block, masterChefContract, setFirstDepositBlock, bao])

  return firstDepositBlock
}

export default useFirstDepositBlock
