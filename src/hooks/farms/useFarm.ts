import { FarmableSupportedPool } from '@/bao/lib/types'
import { Context as FarmsContext } from '@/contexts/Farms'
import { useContext } from 'react'

const useFarm = (id: number): FarmableSupportedPool => {
	const { farms } = useContext(FarmsContext)
	return farms.find(farm => farm.pid === id)
}

export default useFarm
