import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import _ from 'lodash'
import { addressMap } from './lib/constants'

BigNumber.config({
	EXPONENTIAL_AT: 1000,
	DECIMAL_PLACES: 80,
})

export const getMasterChefAddress = (bao) => {
	return bao && bao.masterChefAddress
}

export const getWethPriceAddress = (bao) => {
	return bao && bao.wethPriceAddress
}

export const getPollyPriceAddress = (bao) => {
	return bao && bao.pollyPriceAddress
}

export const getPollyAddress = (bao) => {
	return bao && bao.pollyAddress
}

export const getWethContract = (bao) => {
	return bao && bao.contracts && bao.contracts.weth
}

export const getWethPriceContract = (bao) => {
	return bao && bao.contracts && bao.contracts.wethPrice
}

export const getPollyPriceContract = (bao) => {
	return bao && bao.contracts && bao.contracts.pollyPrice
}

export const getMasterChefContract = (bao) => {
	return bao && bao.contracts && bao.contracts.masterChef
}

export const getPollyContract = (bao) => {
	return bao && bao.contracts && bao.contracts.polly
}

export const gettBaoStakingContract = (bao) => {
	return bao && bao.contracts && bao.contracts.tBaoStaking
}

export const getNestContract = (bao, nid) => {
	if (bao && bao.contracts && bao.contracts.nests) {
		const nest = _.find(bao.contracts.nests, { nid })
		const address = nest.nestAddress
		return {
			address,
			nestContract: nest.nestContract,
			basketContract: nest.basketContract,
		}
	}
}

export const getRecipeContract = (bao) => {
	return bao && bao.contracts && bao.contracts.recipe
}

export const getNests = (bao) => {
	return bao
		? bao.contracts.nests.map(
				({
					nid,
					name,
					symbol,
					icon,
					nestAddress,
					nestContract,
					indexType,
					pieColors,
				}) => ({
					nid,
					id: symbol,
					name,
					icon,
					nestContract,
					indexType,
					pieColors,
					nestTokenAddress: nestAddress,
					inputToken: 'wETH',
					nestToken: symbol,
					inputTokenAddress: addressMap.WETH,
				}),
		  )
		: []
}

export const getFarms = (bao) => {
	return bao
		? bao.contracts.pools.map(
				({
					pid,
					name,
					symbol,
					icon,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					lpAddress,
					lpContract,
					refUrl,
					poolType,
				}) => ({
					pid,
					id: symbol,
					name,
					lpToken: symbol,
					lpTokenAddress: lpAddress,
					lpContract,
					tokenAddress,
					tokenDecimals,
					tokenSymbol,
					tokenContract,
					earnToken: 'POLLY',
					earnTokenAddress: bao.contracts.polly.options.address,
					icon,
					refUrl,
					poolType,
				}),
		  )
		: []
}

export const getPoolWeight = async (masterChefContract, pid) => {
	const [{ allocPoint }, totalAllocPoint] = await Promise.all([
		masterChefContract.methods.poolInfo(pid).call(),
		masterChefContract.methods.totalAllocPoint().call(),
	])

	return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getEarned = async (masterChefContract, pid, account) => {
	return masterChefContract.methods.pendingReward(pid, account).call()
}

export const getLockedEarned = async (pollyContract, account) => {
	return pollyContract.methods.lockOf(account).call()
}

export const getTotalLPWethValue = async (
	masterChefContract,
	wethContract,
	lpContract,
	tokenContract,
	tokenDecimals,
	pid,
) => {
	console.log(masterChefContract.address, 'masterchef')
	console.log(wethContract.address, 'weth')
	console.log(lpContract.address, 'lp')
	console.log(tokenContract.address, 'token')
	console.log(pid, 'pid')
	const [tokenAmountWholeLP, balance, totalSupply, lpContractWeth, poolWeight] =
		await Promise.all([
			tokenContract.methods.balanceOf(lpContract.options.address).call(),
			lpContract.methods.balanceOf(masterChefContract.options.address).call(),
			lpContract.methods.totalSupply().call(),
			wethContract.methods.balanceOf(lpContract.options.address).call(),
			getPoolWeight(masterChefContract, pid),
		])

	// Return p1 * w1 * 2
	const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
	const lpWethWorth = new BigNumber(lpContractWeth)
	const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
	// Calculate
	const tokenAmount = new BigNumber(tokenAmountWholeLP)
		.times(portionLp)
		.div(new BigNumber(10).pow(tokenDecimals))

	const wethAmount = new BigNumber(lpContractWeth)
		.times(portionLp)
		.div(new BigNumber(10).pow(18))
	return {
		tokenAmount,
		wethAmount,
		totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
		tokenPriceInWeth: wethAmount.div(tokenAmount),
		poolWeight: poolWeight,
	}
}

export const approve = async (lpContract, masterChefContract, account) => {
	return lpContract.methods
		.approve(masterChefContract.options.address, ethers.constants.MaxUint256)
		.send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account, ref) =>
	new Promise((resolve) =>
		masterChefContract.methods
			.deposit(pid, ethers.utils.parseUnits(amount, 18), ref)
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const unstake = async (masterChefContract, pid, amount, account, ref) =>
	new Promise((resolve) =>
		masterChefContract.methods
			.withdraw(pid, ethers.utils.parseUnits(amount, 18), ref)
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const harvest = async (masterChefContract, pid, account) =>
	new Promise((resolve) =>
		masterChefContract.methods
			.claimReward(pid)
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const getStaked = async (masterChefContract, pid, account) => {
	try {
		const { amount } = await masterChefContract.methods
			.userInfo(pid, account)
			.call()
		return new BigNumber(amount)
	} catch {
		return new BigNumber(0)
	}
}

export const getWethPrice = async (bao) => {
	console.log(bao)
	const amount = await bao.contracts.wethPrice.methods.latestAnswer().call()
	return new BigNumber(amount)
}

export const getPollyPrice = async (bao) => {
	// FIXME: re-assess once price oracle is deployed, or use baoswap rates
	return new BigNumber(0)
	// const addr = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'
	// const amount = await bao.contracts.baoPrice.methods
	//   .consult(addr.toString(), 1)
	//   .call()
	// return new BigNumber(amount)
}

export const getPollySupply = async (bao) => {
	return new BigNumber(await bao.contracts.polly.methods.totalSupply().call())
}

export const gettBaoSupply = async (bao) => {
	return new BigNumber(
		await bao.contracts.tBaoStaking.methods.totalSupply().call(),
	)
}

export const getReferrals = async (masterChefContract, account) => {
	return await masterChefContract.methods.getGlobalRefAmount(account).call()
}

export function getRefUrl() {
	var refer = '0x0000000000000000000000000000000000000000'
	const urlParams = new URLSearchParams(window.location.search)
	if (urlParams.has('ref')) {
		refer = urlParams.get('ref')
	}
	console.log(refer)

	return refer
}

export const redeem = async (masterChefContract, account) => {
	let now = new Date().getTime() / 1000
	if (now >= 1597172400) {
		return new Promise((resolve) =>
			masterChefContract.methods
				.exit()
				.send({ from: account })
				.on('receipt', (tx) => resolve(tx.transactionHash)),
		)
	} else {
		alert('pool not active')
	}
}

export const enter = async (contract, amount, account) =>
	new Promise((resolve) =>
		contract?.methods
			.enter(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const leave = async (contract, amount, account) =>
	new Promise((resolve) =>
		contract.methods
			.leave(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const fetchCalcToNest = async (
	recipeContract,
	nestAddress,
	nestAmount,
) => {
	const amount = new BigNumber(nestAmount).times(new BigNumber(10).pow(18))

	const amountEthNecessary = await recipeContract.methods
		.calcToPie(nestAddress, amount.toFixed(0))
		.call()
	return new BigNumber(amountEthNecessary).div(new BigNumber(10).pow(18))
}

export const nestIssue = async (
	recipeContract,
	_outputToken,
	_inputToken,
	_maxInput,
	_data,
	account,
) =>
	new Promise((resolve) =>
		recipeContract.methods
			.bake(
				_inputToken,
				_outputToken,
				new BigNumber(_maxInput).times(10 ** 18).toString(),
				_data,
			)
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const nestRedeem = async (nestContract, amount, account) =>
	new Promise((resolve) =>
		nestContract.methods
			.exitPool(new BigNumber(amount).times(10 ** 18).toString())
			.send({ from: account })
			.on('receipt', (tx) => resolve(tx.transactionHash)),
	)

export const getWethPriceLink = async (bao) => {
	const priceOracle = getWethPriceContract(bao)

	const [decimals, latestRound] = await Promise.all([
		priceOracle.methods.decimals().call(),
		priceOracle.methods.latestRoundData().call(),
	])

	return new BigNumber(latestRound.answer).div(10 ** decimals)
}

export const getUserInfo = async (masterChefContract, pid, account) =>
	await masterChefContract.methods.userInfo(pid, account).call()
