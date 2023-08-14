import { Bao } from '@/bao/Bao'
import { useContext } from 'react'
import { BaoContext } from '@/contexts/BaoProvider'

const useBao = (): Bao => {
	const { bao }: BaoContext = useContext(BaoContext)
	return bao
}

export default useBao
