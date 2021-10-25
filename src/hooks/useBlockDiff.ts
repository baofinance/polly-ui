import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import useBlock from './useBlock'

const useBlockDiff = (userInfo: any) => {
  const { account, ethereum } = useWallet()
  const block = useBlock()
  const [blockDiff, setBlockDiff] = useState<number | undefined>()

  const fetchBlockDiff = useCallback(async () => {
    if (!(account && ethereum && userInfo)) return

    const firstDepositBlock = new BigNumber(userInfo.firstDepositBlock)
    const lastWithdrawBlock = new BigNumber(userInfo.lastWithdrawBlock)

    const blockDiff =
      block -
      new BigNumber(
        firstDepositBlock.gt(lastWithdrawBlock)
          ? firstDepositBlock
          : lastWithdrawBlock,
      ).toNumber()
    setBlockDiff(blockDiff)
  }, [ethereum, block, userInfo])

  useEffect(() => {
    fetchBlockDiff()
  }, [ethereum, block, userInfo])

  return blockDiff > 0 && blockDiff
}

export default useBlockDiff
