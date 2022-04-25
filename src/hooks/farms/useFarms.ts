import { Context as FarmsContext } from 'contexts/Farms'
import { useContext } from 'react'

const useFarms = () => {
  const { farms } = useContext(FarmsContext)
  return farms
}

export default useFarms
