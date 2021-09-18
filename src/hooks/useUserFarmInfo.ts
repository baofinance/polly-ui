import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import useBao from './useBao'
import { getMasterChefContract, getUserInfoChef } from '../bao/utils'

export const useUserFarmInfo = (pid: number) => {
  const [userInfo, setUserInfo] = useState<any | undefined>()
  const { account, ethereum } = useWallet()
  const bao = useBao()

  const fetchUserInfo = useCallback(async () => {
    const _userInfo = await getUserInfoChef(
      getMasterChefContract(bao),
      pid,
      account,
    )
    setUserInfo(_userInfo)
  }, [bao, ethereum])

  useEffect(() => {
    fetchUserInfo()
  }, [bao, ethereum])

  return userInfo
}
