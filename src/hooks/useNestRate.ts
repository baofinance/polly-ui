import { useEffect, useState } from 'react'
import useBao from './useBao'
import { fetchCalcToNest, getRecipeContract, getWethPriceLink } from '../bao/utils'

const useNestRate: any = (nestAddress: string) => {
	const bao = useBao()
	const recipeContract = getRecipeContract(bao)

	const [wethPerIndex, setWethPerIndex]: any = useState()
	const [wethPrice, setWethPrice]: any = useState()
	const [usdPerIndex, setUsdPerIndex]: any = useState()

	useEffect(() => {
		fetchCalcToNest(recipeContract, nestAddress, 1).then(wethPerNest => {
			setWethPerIndex(wethPerNest)
			getWethPriceLink(bao).then(_wethPrice => {
				setWethPrice(_wethPrice)
				setUsdPerIndex(_wethPrice.times(wethPerNest))
			})
		})
	}, [bao, nestAddress])

	return {
		wethPerIndex,
		wethPrice,
		usdPerIndex
	}
}

export default useNestRate
