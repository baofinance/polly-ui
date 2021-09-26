import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getEarned, getFarms, getMasterChefContract } from '../bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'

const useFarmsWithBalance = () => {
  const [farmsWithBalance, setFarmsWithBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    var farmsWithBalance: Array<BigNumber> = await Promise.all(
      farms.map(function({ pid }: { pid: BigNumber }){
        const fetchFarmBalances = async () => {
          const amountEarned = await getEarned(masterChefContract, pid, account);
          return amountEarned > 0 ? pid : undefined;
        }
        return fetchFarmBalances();
      })
    );
    farmsWithBalance = farmsWithBalance.filter((farmPid: BigNumber|undefined) => {
        return farmPid != undefined;
    });
    setFarmsWithBalance(farmsWithBalance);
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllBalances()
    }
  }, [account, block, masterChefContract, setFarmsWithBalance, bao])

  return farmsWithBalance
}

export default useFarmsWithBalance
