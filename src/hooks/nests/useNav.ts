import { BigNumber } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { NestComponent } from './useComposition'

const useNav = (composition?: NestComponent[], supply?: BigNumber) => {
	const nav = useMemo(() => {
		if (!composition || !supply) return null
		if (composition.length === 0 || supply.lte('0')) return BigNumber.from('1')
		const totalVal = composition.reduce((prev, comp) => {
			const balance = parseFloat(formatUnits(comp.balance, comp.decimals))
			const price = parseFloat(formatUnits(comp.price))
			return prev.add(parseUnits((balance * price).toString()))
		}, BigNumber.from(0))
		const _nav = parseFloat(formatUnits(totalVal)) / parseFloat(formatUnits(supply))
		return _nav
	}, [composition, supply])

	return nav
}

export default useNav
