import { Context } from 'contexts/Multicall'
import { useContext } from 'react'
import { Multicall } from 'ethereum-multicall'

const useBao = (): Multicall => {
  const { multicall }: any = useContext(Context)
  return multicall
}

export default useBao
