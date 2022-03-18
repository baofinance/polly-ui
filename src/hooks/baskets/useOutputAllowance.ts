import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getAllowance } from 'utils/erc20'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import Config from 'bao/lib/config'

const useOutputAllowance = (nestContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      nestContract,
      account,
      Config.contracts.recipe[Config.networkId].address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, nestContract])

  useEffect(() => {
    if (account && nestContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, nestContract])

  return allowance
}

export default useOutputAllowance
