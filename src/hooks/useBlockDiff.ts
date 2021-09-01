import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import useBlock from './useBlock'
import useBao from './useBao'
import { getMasterChefContract, getUserInfo } from '../bao/utils'

const useBlockDiff = (pid: number) => {
  const { account, ethereum } = useWallet()
  const block = useBlock()
  const bao = useBao()
  const [blockDiff, setBlockDiff] = useState<number | undefined>()

  const fetchBlockDiff = useCallback(async () => {
    if (!(account && ethereum && bao)) return

    const userInfo: any = await getUserInfo(
      getMasterChefContract(bao),
      pid,
      account
    )
    const firstDepositBlock =
      new BigNumber(userInfo.firstDepositBlock)
    const lastWithdrawBlock =
      new BigNumber(userInfo.lastWithdrawBlock)

    const blockDiff =
      block -
      new BigNumber(
        firstDepositBlock.gt(lastWithdrawBlock)
          ? firstDepositBlock
          : lastWithdrawBlock,
      ).toNumber()
    setBlockDiff(blockDiff)
  }, [bao, ethereum, block])

  useEffect(() => {
    fetchBlockDiff()
  }, [bao, ethereum, block])

  return blockDiff > 0 && blockDiff
}

export default useBlockDiff
