import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getMasterChefContract, getUserInfoChef } from 'bao/utils'
import useBao from 'hooks/base/useBao'

export const useUserFarmInfo = (pid: number) => {
  const [userInfo, setUserInfo] = useState<any | undefined>()
  const { account, library } = useWeb3React()
  const bao = useBao()

  const fetchUserInfo = useCallback(async () => {
    const _userInfo = await getUserInfoChef(
      getMasterChefContract(bao),
      pid,
      account,
    )
    setUserInfo(_userInfo)
  }, [bao, library])

  useEffect(() => {
    fetchUserInfo()
  }, [bao, library])

  return userInfo
}
