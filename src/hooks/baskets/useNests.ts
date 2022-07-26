import useBao from '../base/useBao'
import { useEffect, useState } from 'react'
import { ActiveSupportedNest } from '../../bao/lib/types'
import { getNests } from '../../bao/utils'

const useNests = (): ActiveSupportedNest[] => {
  const [baskets, setBaskets] = useState<ActiveSupportedNest[] | undefined>()
  const bao = useBao()

  useEffect(() => {
    if (bao) setBaskets(getNests(bao))
  }, [bao])

  return baskets
}

export default useNests
