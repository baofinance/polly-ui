import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getAllowance } from 'utils/erc20'
import { Contract } from 'web3-eth-contract'
import Config from 'bao/lib/config'
import useBlock from './useBlock'
import useBao from './useBao'

const useAllowance = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const bao = useBao()
  const block = useBlock()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      Config.contracts.masterChef[Config.networkId].address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, lpContract])

  useEffect(() => {
    if (account && lpContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, lpContract, bao, block])

  return allowance
}

export default useAllowance
