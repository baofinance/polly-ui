import type { Chainoracle } from '@/typechain/index'
import Multicall from '@/utils/multicall'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from 'ethers'
import { Bao } from './Bao'

export const getPoolWeight = async (MasterchefContract: Contract, pid: number): Promise<BigNumber> => {
	const [{ allocPoint }, totalAllocPoint] = await Promise.all([
		MasterchefContract.methods.poolInfo(pid).call(),
		MasterchefContract.methods.totalAllocPoint().call(),
	])

	return BigNumber.from(allocPoint).div(BigNumber.from(totalAllocPoint))
}

export const getTotalLPWethValue = async (
	MasterchefContract: Contract,
	wethContract: Contract,
	lpContract: Contract,
	tokenContract: Contract,
	tokenDecimals: number,
	pid: number,
): Promise<{
	tokenAmount: BigNumber
	wethAmount: BigNumber
	totalWethValue: BigNumber
	tokenPriceInWeth: BigNumber
	poolWeight: BigNumber
}> => {
	const [tokenAmountWholeLP, balance, totalSupply, lpContractWeth, poolWeight] = await Promise.all([
		tokenContract.methods.balanceOf(lpContract.options.address).call(),
		lpContract.methods.balanceOf(MasterchefContract.options.address).call(),
		lpContract.methods.totalSupply().call(),
		wethContract.methods.balanceOf(lpContract.options.address).call(),
		getPoolWeight(MasterchefContract, pid),
	])

	// Return p1 * w1 * 2
	const portionLp = BigNumber.from(balance).div(BigNumber.from(totalSupply))
	const lpWethWorth = BigNumber.from(lpContractWeth)
	const totalLpWethValue = portionLp.mul(lpWethWorth).mul(BigNumber.from(2))
	// Calculate
	const tokenAmount = BigNumber.from(tokenAmountWholeLP).mul(portionLp).div(BigNumber.from(10).pow(tokenDecimals))

	const wethAmount = BigNumber.from(lpContractWeth).mul(portionLp).div(BigNumber.from(10).pow(18))
	return {
		tokenAmount,
		wethAmount,
		totalWethValue: totalLpWethValue.div(BigNumber.from(10).pow(18)),
		tokenPriceInWeth: wethAmount.div(tokenAmount),
		poolWeight: poolWeight,
	}
}

export const getOraclePrice = async (bao: Bao, priceOracle: Chainoracle): Promise<BigNumber> => {
	const { price } = Multicall.parseCallResults(
		await bao.multicall.call(
			Multicall.createCallContext([
				{
					ref: 'price',
					contract: priceOracle,
					calls: [{ method: 'decimals' }, { method: 'latestRoundData' }],
				},
			]),
		),
	)

	return price[1].values[1].mul(BigNumber.from(10).pow(price[0].values[0]))
}
