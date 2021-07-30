import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
	ONE_MINUTE_IN_SECONDS,
	ONE_HOUR_IN_SECONDS,
	ONE_DAY_IN_SECONDS,
	ONE_YEAR_IN_SECONDS,
	ZERO: new BigNumber(0),
	ONE: new BigNumber(1),
	ONES_31: new BigNumber('4294967295'), // 2**32-1
	ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
	ONES_255: new BigNumber(
		'115792089237316195423570985008687907853269984665640564039457584007913129639935',
	), // 2**256-1
	INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
	uniswapFactory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
	uniswapFactoryV2: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
	WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
	SUSHI: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
	GRT: '0x5fe2b58c013d7601147dcdd68c143a77499f5531',
	wBTC: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
	USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
	LINK: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
	USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
	AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
	SNX: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
	CRV: '0x172370d5cd63279efa6d502dab29171933a610af',
	MATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
	TESTINDEX: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19', //Test index consisting of amDAI & WMATIC
}

export const contractAddresses = {
	bao: {
		137: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a', //set to sushi for now
	},
	masterChef: {
		137: '0x80C7DD17B01855a6D2347444a0FCC36136a314de', //sushi masterchef address, change
	},
	weth: {
		137: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
	},
	recipe: {
		137: '0xF6bCa56DE573380d5424F950367d257B73E40280',
	},
}
//
/*
Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
	{
		pid: 0,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'TEST INDEX FARM',
		symbol: 'TESTERTOKEN',
		tokenSymbol: 'TST',
		icon: '/bao.png',
		refUrl: '',
	},
]

export const supportedNests = [
	{
		nid: 1,
		nestAddress: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		symbol: 'WSTEST',
		isExperipie: true,
		name: 'wMATIC/SUSHI Test Nest',
		description: 'Polly Nest consisting of SUSHI & WMATIC',
		useMintOverBuy: true,
		useRecipe: true,
		swapEnabled: false,
		swapFees: '0.2',
		streamingFees: '1%',
		coingeckoId: 'metaverse-nft-index',
		composition: [
			{
				symbol: 'wMATIC',
				address: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
				decimals: 18,
				color: '#d9ae36',
				percentage: 50,
				coingeckoId: 'polygon',
				coingeckoImageId: 4713,
			},
			{
				symbol: 'SUSHI',
				address: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
				decimals: 18,
				color: '#0171F5',
				percentage: 50,
				coingeckoId: 'sushi',
				coingeckoImageId: 12271,
			},
		],
		docs: 'https://raw.githubusercontent.com/pie-dao/docs/master/current-pies/btc%2B%2B.md',
		indexType: 'test',
	},
	{
		nid: 2,
		nestAddress: {
			137: '0xE6af83Ba3604385f76f43C087619c6BF42E98426',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0xE6af83Ba3604385f76f43C087619c6BF42E98426',
		symbol: 'crTEST',
		isExperipie: true,
		name: 'Cream Test Nest',
		description: 'Polly Nest consisting of crDAI & crWETH',
		useMintOverBuy: true,
		useRecipe: true,
		swapEnabled: false,
		swapFees: '0.2',
		streamingFees: '1%',
		coingeckoId: 'metaverse-nft-index',
		composition: [
			{
				symbol: 'crDAI',
				address: '0x4eceddf62277ed78623f9a94995c680f8fd6c00e',
				decimals: 8,
				color: '#d9ae36',
				percentage: 50,
				coingeckoId: '',
				coingeckoImageId: '',
			},
			{
				symbol: 'crWETH',
				address: '0x7ef18d0a9c3fb1a716ff6c3ed0edf52a2427f716',
				decimals: 8,
				color: '#da2a2a',
				percentage: 50,
				coingeckoId: '',
				coingeckoImageId: '',
			},
		],
		docs: 'https://raw.githubusercontent.com/pie-dao/docs/master/current-pies/btc%2B%2B.md',
		indexType: 'test',
	},
	{
		nid: 3,
		nestAddress: {
			137: '0x092737fd2AF3c233E6ace3153028006bBC6E6Ec6',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0x092737fd2AF3c233E6ace3153028006bBC6E6Ec6',
		symbol: 'pDEFI',
		isExperipie: true,
		name: 'Polygon DeFi Test Nest',
		description: 'Polygon DeFi Ecosystem Test Nest',
		useMintOverBuy: true,
		useRecipe: true,
		swapEnabled: false,
		swapFees: '0.2',
		streamingFees: '1%',
		coingeckoId: 'metaverse-nft-index',
		composition: [
			{
				symbol: 'SUSHI',
				address: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
				decimals: 18,
				color: '#0171F5',
				percentage: 25,
				coingeckoId: 'sushi',
				coingeckoImageId: 12271,
			},
			{
				symbol: 'GRT',
				address: '0x5fe2b58c013d7601147dcdd68c143a77499f5531',
				decimals: 18,
				color: '#4c2caf',
				percentage: 25,
				coingeckoId: 'the-graph',
				coingeckoImageId: 13397,
			},
			{
				symbol: 'LINK',
				address: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
				decimals: 18,
				color: '#2a5ada',
				percentage: 25,
				coingeckoId: 'chainlink',
				coingeckoImageId: 877,
			},
			{
				symbol: 'WETH',
				address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
				decimals: 18,
				color: '#da2a2a',
				percentage: 25,
				coingeckoId: 'ethereum',
				coingeckoImageId: 2518,
			},
		],
		docs: 'https://raw.githubusercontent.com/pie-dao/docs/master/current-pies/btc%2B%2B.md',
		indexType: 'test',
	},
	{
		nid: 4,
		nestAddress: {
			137: '0xfa4699e63158B11dAeADb852Aab8Bc2F6b8D8952',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0xfa4699e63158B11dAeADb852Aab8Bc2F6b8D8952',
		symbol: 'amTEST',
		isExperipie: true,
		name: 'Polygon Aave Market Test Nest',
		description: 'Polygon Aave Strategy Test Nest',
		useMintOverBuy: true,
		useRecipe: true,
		swapEnabled: false,
		swapFees: '0.2',
		streamingFees: '1%',
		coingeckoId: 'metaverse-nft-index',
		composition: [
			{
				symbol: 'amWETH',
				address: '0x28424507fefb6f7f8e9d3860f56504e4e5f5f390',
				decimals: 18,
				color: '#0171F5',
				percentage: 50,
				coingeckoId: 'aave-polygon-weth',
				coingeckoImageId: 17266,
			},
			{
				symbol: 'amWMATIC',
				address: '0x8df3aad3a84da6b69a4da8aec3ea40d9091b2ac4',
				decimals: 18,
				color: '#4c2caf',
				percentage: 50,
				coingeckoId: 'aave-polygon-wmatic',
				coingeckoImageId: 17267,
			},
		],
		docs: 'https://raw.githubusercontent.com/pie-dao/docs/master/current-pies/btc%2B%2B.md',
		indexType: 'test',
	},
	{
		nid: 5,
		nestAddress: {
			137: '0x15F5742B377F65770344f35248931FA0eAb8c30c',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0x15F5742B377F65770344f35248931FA0eAb8c30c',
		symbol: 'amsTEST',
		isExperipie: true,
		name: 'Polygon Aave Stables Test Nest',
		description: 'Polygon Aave Stable Strategy Test Nest',
		useMintOverBuy: true,
		useRecipe: true,
		swapEnabled: false,
		swapFees: '0.2',
		streamingFees: '1%',
		coingeckoId: 'metaverse-nft-index',
		composition: [
			{
				symbol: 'amDAI',
				address: '0x27f8d03b3a2196956ed754badc28d73be8830a6e',
				decimals: 6,
				color: '#0171F5',
				percentage: 50,
				coingeckoId: 'aave-polygon-dai',
				coingeckoImageId: 17251,
			},
			{
				symbol: 'amUSDT',
				address: '0x60d55f02a771d515e077c9c2403a1ef324885cec',
				decimals: 6,
				color: '#4c2caf',
				percentage: 50,
				coingeckoId: 'aave-polygon-usdt',
				coingeckoImageId: 17264,
			},
			{
				symbol: 'amUSDC',
				address: '0x1a13f4ca1d028320a707d99520abfefca3998b7f',
				decimals: 6,
				color: '#4c2caf',
				percentage: 50,
				coingeckoId: 'aave-polygon-usdc',
				coingeckoImageId: 17249,
			},
		],
		docs: 'https://raw.githubusercontent.com/pie-dao/docs/master/current-pies/btc%2B%2B.md',
		indexType: 'test',
	},
]
