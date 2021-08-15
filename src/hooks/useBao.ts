import { Context } from 'contexts/BaoProvider'
import { useContext } from 'react'

const useBao = () => {
  const { bao } = useContext(Context)
  return bao
}

export default useBao
