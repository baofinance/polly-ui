import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getPollyContract, gettBaoStakingContract } from '../bao/utils'
import { getAllowance } from '../utils/erc20'
import useBao from './useBao'

const useAllowanceStaking = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const baoContract = getPollyContract(bao)
  const stakingContract = gettBaoStakingContract(bao)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      baoContract,
      account,
      stakingContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, stakingContract, baoContract])

  useEffect(() => {
    if (account && stakingContract && baoContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 5000)
    return () => clearInterval(refreshInterval)
  }, [account, stakingContract, baoContract])

  return allowance
}

export default useAllowanceStaking
