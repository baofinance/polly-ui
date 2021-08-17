import { Context } from 'contexts/BaoProvider'
import { useContext } from 'react'
import { Bao } from '../bao'

const useBao = (): Bao => {
  const { bao }: any = useContext(Context)
  return bao
}

export default useBao
