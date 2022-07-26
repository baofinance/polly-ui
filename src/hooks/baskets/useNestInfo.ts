import { useCallback, useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import useBao from '../base/useBao'
import { ActiveSupportedNest } from '../../bao/lib/types'

type NestInfo = {
  totalSupply: BigNumber
}

const useNestInfo = (nest: ActiveSupportedNest): NestInfo => {
  const [info, setInfo] = useState<NestInfo | undefined>()
  const bao = useBao()

  const fetchInfo = useCallback(async () => {
    const supply = await nest.nestContract.methods.totalSupply().call()

    setInfo({
      totalSupply: new BigNumber(supply),
    })
  }, [bao, nest])

  useEffect(() => {
    if (!(bao && nest)) return

    fetchInfo()
  }, [bao, nest])

  return info
}

export default useNestInfo
