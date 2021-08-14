import { Context as FarmsContext } from 'contexts/Farms'
import { useContext } from 'react'

const useUnharvested = () => {
  const { unharvested } = useContext(FarmsContext)
  return unharvested
}

export default useUnharvested
