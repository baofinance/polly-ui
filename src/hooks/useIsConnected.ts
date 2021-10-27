import { useCallback, useEffect, useState } from 'react'
import useBao from './useBao'

const useIsConnected = (): boolean => {
  const bao = useBao()
  const [hasAccounts, setHasAccounts] = useState<boolean | undefined>()

  const fetchIsConnected = useCallback(
    async () => setHasAccounts(await bao.hasAccounts()),
    [bao],
  )

  useEffect(() => {
    if (bao && bao.web3) fetchIsConnected()
  }, [bao])

  return hasAccounts
}

export default useIsConnected
