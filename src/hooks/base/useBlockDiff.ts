import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import useBlock from './useBlock'
import useBao from './useBao'

const useBlockDiff = (userInfo: any) => {
  const { account } = useWeb3React()
  const bao = useBao() 
  const block = useBlock()
  const [blockDiff, setBlockDiff] = useState<number | undefined>()

  const fetchBlockDiff = useCallback(async () => {
    if (!(account && bao && userInfo)) return

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
  }, [bao, block, userInfo])

  useEffect(() => {
    fetchBlockDiff()
  }, [bao, block, userInfo])

  return blockDiff > 0 && blockDiff
}

export default useBlockDiff
