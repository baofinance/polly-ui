const Web3 = require('web3')
const BigNumber = require('bignumber.js')

const recipeAbi = require('./abi/recipe.json')
const rpcUrl = 'https://rpc-mainnet.maticvigil.com'
const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))

const contracts = {
	recipe: '0x2E62EE5005c4069e82d37479f42D1a7Aa2C1B8ba',
	nest: '0x28cC94Cf01A8f29668368687e409d7E3DAC17bFE',
}
const amount = new BigNumber(1).times(new BigNumber(10).pow(18)).toFixed(0)

// functions

const callContractWeb3 = async () => {
	const recipe = new web3.eth.Contract(recipeAbi, contracts.recipe)

	const ethNecessary = await recipe.methods
		.calcToPie(contracts.nest, amount)
		.call()
	console.log(`${decimate(ethNecessary)}`)
}

// util

const decimate = (num, dec = 18) =>
	new BigNumber(num).div(new BigNumber(10).pow(dec))

// init

callContractWeb3()
