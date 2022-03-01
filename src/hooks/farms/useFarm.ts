import { Context as FarmsContext, Farm } from 'contexts/Farms'
import { useContext } from 'react'

const useFarm = (id: string): Farm => {
  const { farms } = useContext(FarmsContext)
  const farm = farms.find((farm) => farm.id === id)
  return farm
}

export default useFarm
