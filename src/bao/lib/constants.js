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
		137: '0xd683Cb11005EfC90A1c3995251821a20c7860f7A',
	},
	wethPrice: {
		137: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
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
		name: 'DeFi Nest',
		symbol: 'nDEFI',
		tokenSymbol: 'nDEFI',
		icon: '/bao.png',
		refUrl: 'http://localhost:3000/nests/4',
	},
	{
		pid: 1,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'Stable Nest',
		symbol: 'nSTBL',
		tokenSymbol: 'nSTBL',
		icon: '/bao.png',
		refUrl: '',
	},
	{
		pid: 2,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'Infrastructure Nest',
		symbol: 'nINFRA',
		tokenSymbol: 'nINFRA',
		icon: '/bao.png',
		refUrl: '',
	},
	{
		pid: 3,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'Dex Nest',
		symbol: 'nDEX',
		tokenSymbol: 'nDEX',
		icon: '/bao.png',
		refUrl: '',
	},
	{
		pid: 4,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'Stable Nest',
		symbol: 'nSTBL',
		tokenSymbol: 'nSTBL',
		icon: '/bao.png',
		refUrl: '',
	},
	{
		pid: 5,
		lpAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenAddresses: {
			137: '0xCFDfc852e6D73903cDC0d5d859E561FA46b15C19',
		},
		tokenDecimals: 18,
		name: 'Infrastructure Nest',
		symbol: 'nINFRA',
		tokenSymbol: 'nINFRA',
		icon: '/bao.png',
		refUrl: '',
	},

]

export const supportedNests = [
	{
		nid: 4,
		nestAddress: {
			137: '0x092737fd2AF3c233E6ace3153028006bBC6E6Ec6',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0x092737fd2AF3c233E6ace3153028006bBC6E6Ec6',
		symbol: 'nDEFI',
		name: 'Polygon DeFi Nest Test',
		description: 'Polygon DeFi Ecosystem Test Nest',
		pieColors: {
			SUSHI: '#DB5FA9',
			GRT: '#353993',
			LINK: '#2A5AD9',
			WETH: '#d05555',
		},
	},/*
	{
		nid: 6,
		nestAddress: {
			137: '0x15F5742B377F65770344f35248931FA0eAb8c30c',
		},
		inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		outputToken: '0x15F5742B377F65770344f35248931FA0eAb8c30c',
		symbol: 'nLEND',
		name: 'Polygon Lending Nest Test',
		description: 'Polygon Aave Stable Strategy Test Nest',
		pieColors: {
			DAI: '#F9AF1C',
			USDT: '#52AE95',
			USDC: '#2775CA',
			},
	},*/
]
