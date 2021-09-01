import { useCallback, useEffect, useState } from 'react'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { useWallet } from 'use-wallet'
import useBlock from './useBlock'
import useFirstDepositBlock from './useFirstDepositBlock'
import useLastDepositBlock from './useLastDepositBlock'
import useLastWithdrawBlock from './useLastWithdrawBlock'
import { getMasterChefContract } from 'bao/utils'
import useBao from './useBao'
import BigNumber from 'bignumber.js'

const useBlockDiff = (pid: number) => {
  const {
    account,
    ethereum,
  }: { account: string; ethereum: provider } = useWallet()
  const block = useBlock()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const firstDepositBlock = useFirstDepositBlock(pid)
  const lastWithdrawBlock = useLastWithdrawBlock(pid)

  const blockDiff =
    block -
    new BigNumber(
      firstDepositBlock >
        lastWithdrawBlock
        ? firstDepositBlock
        : lastWithdrawBlock,
    ).toNumber();

  return blockDiff
}

export default useBlockDiff
