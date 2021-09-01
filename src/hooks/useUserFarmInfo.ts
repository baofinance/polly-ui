import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import useBao from './useBao'
import { getMasterChefContract, getUserInfo } from '../bao/utils'

export const useUserFarmInfo = (pid: number) => {
  const [userInfo, setUserInfo] = useState<any | undefined>()
  const { account, ethereum } = useWallet()
  const bao = useBao()

  const fetchUserInfo = useCallback(async () => {
    const _userInfo = await getUserInfo(
      getMasterChefContract(bao),
      pid,
      account
    )
    setUserInfo(_userInfo)
  }, [bao, ethereum])

  useEffect(() => {
    fetchUserInfo()
  }, [bao, ethereum])

  return userInfo
}