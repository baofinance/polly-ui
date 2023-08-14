import type { BigNumberish } from '@ethersproject/bignumber'
import BN from 'bignumber.js'
import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'

export const getDisplayBalance = (balance: BigNumberish | BN, decimals = 18, precision?: number): string => {
	const n = new BN(balance.toString()).div(new BN(10).pow(decimals))
	if (n.gt(0) && n.lt(1)) {
		return n.toFormat(typeof precision === 'number' ? precision : 4)
	} else if (n.lt(0) && n.gt(-1)) {
		return n.toFormat(typeof precision === 'number' ? precision : 4)
	} else {
		return n.toFormat(typeof precision === 'number' ? precision : 2)
	}
}

export const truncateNumber = (balance: BigNumberish | BN, decimals = 18): string => {
	const n = new BN(balance.toString()).dividedBy(new BN(10).pow(decimals))
	if (n.isGreaterThanOrEqualTo(1000000000)) {
		return n.div(1000000000).toFixed(2).replace(/\.0$/, '') + 'B'
	}
	if (n.isGreaterThanOrEqualTo(1000000)) {
		return n.div(1000000).toFixed(2).replace(/\.0$/, '') + 'M'
	}
	if (n.isGreaterThanOrEqualTo(1000)) {
		return n.div(1000).toFixed(2).replace(/\.0$/, '') + 'K'
	}
	if (n.isGreaterThanOrEqualTo(0)) {
		return n.toFixed(2)
	}
	return n.toFixed()
}

export const getFullDisplayBalance = (balance: BigNumber | BN, decimals = 18): string => {
	return new BN(balance.toString()).dividedBy(new BN(10).pow(decimals)).toFixed()
}

export const decimate = (n: BigNumberish | BN, decimals = 18): BigNumber => {
	return BigNumber.from(n.toString()).div(BigNumber.from(10).pow(BigNumber.from(decimals)))
}

export const exponentiate = (n: BigNumberish | BN, decimals = 18): BigNumber => {
	return BigNumber.from(n.toString()).mul(BigNumber.from(10).pow(BigNumber.from(decimals)))
}

const ONE = BigNumber.from(1)
const TWO = BigNumber.from(2)

export const sqrt = (value: BigNumber): BigNumber => {
	const x = BigNumber.from(value)
	let z = x.add(ONE).div(TWO)
	let y = x
	while (z.sub(y).isNegative()) {
		y = z
		z = x.div(z).add(z).div(TWO)
	}
	return y
}

export const isBigNumberish = (val: BigNumberish | BN): boolean => {
	try {
		BigNumber.from(val.toString())
		return true
	} catch (e) {
		return false
	}
}

export const fromDecimal = (n: number | string): BigNumber => {
	return parseUnits(new BN(n).toFixed(18))
}
