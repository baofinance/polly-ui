import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import {
  getFarms,
  getMasterChefContract,
  getTotalLPWethValue,
  getWethContract,
} from 'bao/utils'
import { getContract } from 'utils/erc20'
import useBao from 'hooks/base/useBao'
import useBlock from 'hooks/base/useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = (): StakedValue[] => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account, ethereum } = useWallet<provider>()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)
  const wethContract = getWethContract(bao)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const balances: Array<StakedValue> = await Promise.all(
      farms.map(({ pid, lpContract, tokenAddress, tokenDecimals }) =>
        getTotalLPWethValue(
          masterChefContract,
          wethContract,
          lpContract,
          getContract(ethereum, tokenAddress),
          tokenDecimals,
          pid,
        ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, bao])

  return balances
}

export default useAllStakedValue
