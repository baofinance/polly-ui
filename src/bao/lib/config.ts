import { Config } from './types'

export default {
  networkId: 137,
  defaultRpc: {
    chainId: '0x89',
    rpcUrls: [
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    ],
    blockExplorerUrls: ['https://polygonscan.com'],
    chainName: 'Matic Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  addressMap: {
    uniswapFactory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    uniswapFactoryV2: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    lendingLogicKashi: '0xcBA495A74e23D5B42853e41334e26DDd322Af082',
    lendingLogicKLIMA: '0x9DbE23De3F716BDFd1d9664F0e6Cde59d0A5b8C0',
    WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
    SUSHI: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
    GRT: '0x5fe2b58c013d7601147dcdd68c143a77499f5531',
    wBTC: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
    DAI: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
    USDC: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
    LINK: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
    AAVE: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
    SNX: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
    CRV: '0x172370d5cd63279efa6d502dab29171933a610af',
    MATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    BAO: '0xc81278a52ad0e1485b7c3cdf79079220ddd68b7d',
    POLLY: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
    nDEFI: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
    nSTBL: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
    nINFR: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
    nPOLY: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
    RAI: '0x00e5646f60ac6fb446f621d146b6e1886f002905',
    KLIMA: '0x4e78011ce80ee02d2c3e649fb657e45898257815',
    DEAD: '0x000000000000000000000000000000000000dead',
  },
  contracts: {
    polly: {
      137: {
        address: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
        abi: 'polly.json',
      },
    },
    masterChef: {
      137: {
        address: '0x850161bF73944a8359Bd995976a34Bb9fe30d398',
        abi: 'masterchef.json',
      },
    },
    weth: {
      137: {
        address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
        abi: 'weth.json',
      },
    },
    recipe: {
      137: {
        address: '0x802458BA47b7949d018184cCEcAD8178d57c5919',
        abi: 'recipe.json',
      },
    },
    wethPrice: {
      137: {
        address: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
        abi: 'chainoracle.json',
      },
    },
    nestRedeem: {
      137: {
        address: '0xCDdEcEC6fccaD613328F56D48Afb2d92dea9A96f',
        abi: 'nestRedeem.json',
      },
    },
  },
  subgraphs: {
    137: {
      sushiExchange:
        'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
      pollyBurn: 'https://api.thegraph.com/subgraphs/name/clabby/polly-burn',
    },
    1: {
      sushiExchange:
        'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
    },
  },
  nests: [
    {
      nid: 1,
      nestAddresses: {
        137: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      },
      inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      outputToken: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      symbol: 'nDEFI',
      name: 'nDEFI',
      icon: '/ndefi.svg',
      cgIds: {
        '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a': 'sushi',
        '0x172370d5Cd63279eFa6d502DAB29171933a610AF': 'curve-dao-token',
        '0xD6DF932A45C0f255f85145f286eA0b292B21C90B': 'aave',
        '0xb33EaAd8d922B1083446DC23f610c2567fB5180f': 'uniswap',
        '0x9a71012B13CA4d3D0Cdc72A177DF3ef03b0E76A3': 'balancer',
      },
      pieColors: {
        SUSHI: '#DB5FA9',
        CRV: '#F2E308',
        AAVE: '#9965A6',
        UNI: '#FF017A',
        BAL: '#b9b9b9',
      },
    },
    {
      nid: 2,
      nestAddresses: {
        137: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      },
      inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      outputToken: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      symbol: 'nSTBL',
      name: 'nSTBL',
      icon: '/nstbl.svg',
      cgIds: {
        '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': 'dai',
        '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': 'tether',
        '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': 'usd-coin',
        '0x00e5646f60AC6Fb446f621d146B6E1886f002905': 'rai',
      },
      pieColors: {
        DAI: '#F5AC37',
        USDT: '#50AF95',
        RAI: '#68FEE2',
        USDC: '#2775CA',
      },
    },
    {
      nid: 3,
      nestAddresses: {
        137: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      },
      inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      outputToken: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      symbol: 'nINFR',
      name: 'nINFR',
      icon: '/nINFR.png',
      cgIds: {
        '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619': 'weth',
        '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39': 'chainlink',
        '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': 'wmatic',
        '0x5fe2B58c013d7601147DcdD68C143A77499f5531': 'the-graph',
      },
      pieColors: {
        WETH: '#d05555',
        LINK: '#2A5AD9',
        WMATIC: '#8247E5',
        GRT: '#353993',
      },
    },
    {
      nid: 4,
      nestAddresses: {
        137: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      },
      inputToken: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      outputToken: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      symbol: 'nPOLY',
      name: 'nPOLY',
      icon: '/nPOLY.png',
      cgIds: {
        '0x4e78011ce80ee02d2c3e649fb657e45898257815': 'klima-dao',
        '0xFbdd194376de19a88118e84E279b977f165d01b8': 'beefy-finance',
        '0x831753DD7087CaC61aB5644b308642cc1c33Dc13': 'quick',
        '0x580a84c73811e1839f75d86d75d88cca0c241ff4': 'qi-dao',
      },
      pieColors: {
        KLIMA: '#0c3',
        BIFI: '#F9F3EB',
        QUICK: '#2172e5',
        QI: '#f16e69',
      },
    },
  ],
  farms: [
    // Incentivized pools
    {
      pid: 17,
      lpAddresses: {
        137: '0xf27c14aedad4c1cfa7207f826c64ade3d5c741c3',
      },
      tokenAddresses: {
        137: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      },
      tokenDecimals: 18,
      name: 'POLLY-ETH',
      symbol: 'SLP',
      tokenSymbol: 'POLLY',
      poolType: 'active',
      iconA: '/POLLY.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x4C392822D4bE8494B798cEA17B43d48B2308109C',
    },
    {
      pid: 18,
      lpAddresses: {
        137: '0x095fc71521668d5bcc0fc3e3a9848e8911af21d9',
      },
      tokenAddresses: {
        137: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      },
      tokenDecimals: 18,
      name: 'POLLY-nDEFI',
      symbol: 'SLP',
      tokenSymbol: 'POLLY',
      poolType: 'active',
      iconA: '/POLLY.png',
      iconB: 'nDEFI.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      pairUrl:
        'https://app.sushi.com/legacy/add/0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B/0x4C392822D4bE8494B798cEA17B43d48B2308109C',
    },
    {
      pid: 19,
      lpAddresses: {
        137: '0xf70b37a372befe8c274a84375c233a787d0d4dfa',
      },
      tokenAddresses: {
        137: '0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      },
      tokenDecimals: 18,
      name: 'POLLY-RAI',
      symbol: 'SLP',
      tokenSymbol: 'POLLY',
      poolType: 'active',
      iconA: '/POLLY.png',
      iconB: 'RAI.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x4C392822D4bE8494B798cEA17B43d48B2308109C',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x00e5646f60ac6fb446f621d146b6e1886f002905/0x4C392822D4bE8494B798cEA17B43d48B2308109C',
    },
    {
      pid: 27,
      lpAddresses: {
        137: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      },
      tokenAddresses: {
        137: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      },
      tokenDecimals: 18,
      name: 'nPOLY',
      symbol: 'nPOLY',
      tokenSymbol: 'nPOLY',
      poolType: 'active',
      iconA: '/nPOLY.png',
      iconB: null,
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      pairUrl: '/nests/4',
    },
    {
      pid: 25,
      lpAddresses: {
        137: '0x55674956a8407ed694Ad3a68edf65B52e5A65ae5',
      },
      tokenAddresses: {
        137: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      },
      tokenDecimals: 18,
      name: 'nPOLY-ETH',
      symbol: 'SLP',
      tokenSymbol: 'nPOLY',
      poolType: 'active',
      iconA: '/nPOLY.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
    },
    {
      pid: 28,
      lpAddresses: {
        137: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      },
      tokenAddresses: {
        137: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      },
      tokenDecimals: 18,
      name: 'nINFR',
      symbol: 'nINFR',
      tokenSymbol: 'nINFR',
      poolType: 'active',
      iconA: '/nINFR.png',
      iconB: null,
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
      pairUrl: '/nests/3',
    },
    {
      pid: 26,
      lpAddresses: {
        137: '0xEA502Bd4f454690E7baf347E2C2b1476e5FcD6C7',
      },
      tokenAddresses: {
        137: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      },
      tokenDecimals: 18,
      name: 'nINFR-ETH',
      symbol: 'SLP',
      tokenSymbol: 'nINFR',
      poolType: 'active',
      iconA: '/nINFR.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
    },
    {
      pid: 14,
      lpAddresses: {
        137: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      },
      tokenAddresses: {
        137: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      },
      tokenDecimals: 18,
      name: 'nDEFI',
      symbol: 'nDEFI',
      tokenSymbol: 'nDEFI',
      poolType: 'active',
      iconA: '/nDEFI.png',
      iconB: null,
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      pairUrl: '/nests/1',
    },
    {
      pid: 15,
      lpAddresses: {
        137: '0xd0fa2eaa5d854f184394e93f7b75624084600685',
      },
      tokenAddresses: {
        137: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      },
      tokenDecimals: 18,
      name: 'nDEFI-RAI',
      symbol: 'SLP',
      tokenSymbol: 'nDEFI',
      poolType: 'active',
      iconA: '/nDEFI.png',
      iconB: '/RAI.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x00e5646f60ac6fb446f621d146b6e1886f002905/0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
    },
    {
      pid: 16,
      lpAddresses: {
        137: '0x1534d7c91bd77eb447acb7fb92ea042b918f58bb',
      },
      tokenAddresses: {
        137: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      },
      tokenDecimals: 18,
      name: 'nDEFI-ETH',
      symbol: 'SLP',
      tokenSymbol: 'nDEFI',
      poolType: 'active',
      iconA: '/nDEFI.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
    },
    {
      pid: 23,
      lpAddresses: {
        137: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      },
      tokenAddresses: {
        137: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      },
      tokenDecimals: 18,
      name: 'nSTBL',
      symbol: 'nSTBL',
      tokenSymbol: 'nSTBL',
      poolType: 'active',
      iconA: '/nSTBL.png',
      iconB: null,
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      pairUrl: '/nests/2',
    },
    {
      pid: 24,
      lpAddresses: {
        137: '0x0c98d36908dfbe11C9A4d1F3CD8A9b94bAbA7521',
      },
      tokenAddresses: {
        137: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      },
      tokenDecimals: 18,
      name: 'nSTBL-ETH',
      symbol: 'SLP',
      tokenSymbol: 'nSTBL',
      poolType: 'active',
      iconA: '/nSTBL.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
    },
    // Begin regular pools
    {
      pid: 22,
      lpAddresses: {
        137: '0x67cf45e239793a72f4bd4d46303735aeedf5d2b4',
      },
      tokenAddresses: {
        137: '0x00e5646f60ac6fb446f621d146b6e1886f002905',
      },
      tokenDecimals: 18,
      name: 'RAI-ETH',
      symbol: 'SLP',
      tokenSymbol: 'RAI',
      poolType: 'active',
      iconA: '/RAI.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x00e5646f60ac6fb446f621d146b6e1886f002905',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x00e5646f60ac6fb446f621d146b6e1886f002905',
    },
    {
      pid: 0,
      lpAddresses: {
        137: '0xdfa3ddd1807db8e4b4851d2e5421374e433a2983',
      },
      tokenAddresses: {
        137: '0xda537104d6a5edd53c6fbba9a898708e465260b6',
      },
      tokenDecimals: 18,
      name: 'YFI-ETH',
      symbol: 'SLP',
      tokenSymbol: 'YFI',
      poolType: 'archived',
      iconA: '/YFI.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xda537104d6a5edd53c6fbba9a898708e465260b6',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0xDA537104D6A5edd53c6fBba9A898708E465260b6',
    },
    {
      pid: 1,
      lpAddresses: {
        137: '0xce5b8977f5021f1ef1232b1d4a0cfd03e8bcba9b',
      },
      tokenAddresses: {
        137: '0x4257EA7637c355F81616050CbB6a9b709fd72683',
      },
      tokenDecimals: 18,
      name: 'CVX-ETH',
      symbol: 'SLP',
      tokenSymbol: 'CVX',
      poolType: 'archived',
      iconA: '/CVX.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x4257EA7637c355F81616050CbB6a9b709fd72683',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619/0x4257EA7637c355F81616050CbB6a9b709fd72683',
    },
    {
      pid: 2,
      lpAddresses: {
        137: '0x5e5c517ec55d6393d91d6a1379e5ae393a01a423',
      },
      tokenAddresses: {
        137: '0x3AE490db48d74B1bC626400135d4616377D0109f',
      },
      tokenDecimals: 18,
      name: 'ALPHA-ETH',
      symbol: 'SLP',
      tokenSymbol: 'ALPHA',
      poolType: 'archived',
      iconA: '/ALPHA.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x3AE490db48d74B1bC626400135d4616377D0109f',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x3AE490db48d74B1bC626400135d4616377D0109f',
    },
    {
      pid: 3,
      lpAddresses: {
        137: '0xc56060af39152c614fa67e169c0dd1809a886e4f',
      },
      tokenAddresses: {
        137: '0xb33eaad8d922b1083446dc23f610c2567fb5180f',
      },
      tokenDecimals: 18,
      name: 'UNI-ETH',
      symbol: 'SLP',
      tokenSymbol: 'UNI',
      poolType: 'archived',
      iconA: '/UNI.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xb33eaad8d922b1083446dc23f610c2567fb5180f',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0xb33eaad8d922b1083446dc23f610c2567fb5180f',
    },
    {
      pid: 4,
      lpAddresses: {
        137: '0xb5846453b67d0b4b4ce655930cf6e4129f4416d7',
      },
      tokenAddresses: {
        137: '0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
      },
      tokenDecimals: 18,
      name: 'SUSHI-ETH',
      symbol: 'SLP',
      tokenSymbol: 'SUSHI',
      poolType: 'archived',
      iconA: '/SUSHI.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a',
    },
    {
      pid: 5,
      lpAddresses: {
        137: '0x396e655c309676caf0acf4607a868e0cded876db',
      },
      tokenAddresses: {
        137: '0x172370d5cd63279efa6d502dab29171933a610af',
      },
      tokenDecimals: 18,
      name: 'CRV-ETH',
      symbol: 'SLP',
      tokenSymbol: 'CRV',
      poolType: 'archived',
      iconA: '/CRV.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x172370d5cd63279efa6d502dab29171933a610af',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x172370d5cd63279efa6d502dab29171933a610af',
    },
    {
      pid: 6,
      lpAddresses: {
        137: '0xc67136e235785727a0d3b5cfd08325327b81d373',
      },
      tokenAddresses: {
        137: '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3',
      },
      tokenDecimals: 18,
      name: 'BAL-ETH',
      symbol: 'SLP',
      tokenSymbol: 'BAL',
      poolType: 'archived',
      iconA: '/BAL.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3',
    },
    {
      pid: 7,
      lpAddresses: {
        137: '0x9021a31062a1d9c9c35d632ed54a9d923e46809f',
      },
      tokenAddresses: {
        137: '0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c',
      },
      tokenDecimals: 18,
      name: 'COMP-ETH',
      symbol: 'SLP',
      tokenSymbol: 'COMP',
      poolType: 'archived',
      iconA: '/COMP.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x8505b9d2254a7ae468c0e9dd10ccea3a837aef5c',
    },
    {
      pid: 8,
      lpAddresses: {
        137: '0xbf61e1d82bd440cb9da11d325c046f029a663890',
      },
      tokenAddresses: {
        137: '0x6f7C932e7684666C9fd1d44527765433e01fF61d',
      },
      tokenDecimals: 18,
      name: 'MKR-ETH',
      symbol: 'SLP',
      tokenSymbol: 'MKR',
      poolType: 'archived',
      iconA: '/MKR.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x6f7C932e7684666C9fd1d44527765433e01fF61d',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x6f7C932e7684666C9fd1d44527765433e01fF61d',
    },
    {
      pid: 9,
      lpAddresses: {
        137: '0x14dbe3e6814fd532ef87e4be9b4192c018752823',
      },
      tokenAddresses: {
        137: '0x95c300e7740D2A88a44124B424bFC1cB2F9c3b89',
      },
      tokenDecimals: 18,
      name: 'ALCX-ETH',
      symbol: 'SLP',
      tokenSymbol: 'ALCX',
      poolType: 'archived',
      iconA: '/ALCX.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x95c300e7740D2A88a44124B424bFC1cB2F9c3b89',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x95c300e7740D2A88a44124B424bFC1cB2F9c3b89',
    },
    {
      pid: 10,
      lpAddresses: {
        137: '0x74d23f21f780ca26b47db16b0504f2e3832b9321',
      },
      tokenAddresses: {
        137: '0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
      },
      tokenDecimals: 18,
      name: 'LINK-ETH',
      symbol: 'SLP',
      tokenSymbol: 'LINK',
      poolType: 'archived',
      iconA: '/LINK.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39',
    },
    {
      pid: 11,
      lpAddresses: {
        137: '0x116ff0d1caa91a6b94276b3471f33dbeb52073e7',
      },
      tokenAddresses: {
        137: '0x50b728d8d964fd00c2d0aad81718b71311fef68a',
      },
      tokenDecimals: 18,
      name: `SNX-ETH`,
      symbol: 'SLP',
      tokenSymbol: 'SNX',
      poolType: 'archived',
      iconA: '/SNX.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x50b728d8d964fd00c2d0aad81718b71311fef68a',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x50b728d8d964fd00c2d0aad81718b71311fef68a',
    },
    {
      pid: 12,
      lpAddresses: {
        137: '0x6be10c5c7178af8c49997d07d6a5444c15e58170',
      },
      tokenAddresses: {
        137: '0x3066818837c5e6ed6601bd5a91b0762877a6b731',
      },
      tokenDecimals: 18,
      name: `UMA-ETH`,
      symbol: 'SLP',
      tokenSymbol: 'UMA',
      poolType: 'archived',
      iconA: '/UMA.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0x3066818837c5e6ed6601bd5a91b0762877a6b731',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0x3066818837c5e6ed6601bd5a91b0762877a6b731',
    },
    {
      pid: 13,
      lpAddresses: {
        137: '0x2481cbe674fb72cf8cd3031ff4747078d168c9b3',
      },
      tokenAddresses: {
        137: '0xc81278a52AD0e1485B7C3cDF79079220Ddd68b7D',
      },
      tokenDecimals: 18,
      name: `BAO-ETH`,
      symbol: 'SLP',
      tokenSymbol: 'BAO',
      poolType: 'active',
      iconA: '/BAO.png',
      iconB: '/WETH.png',
      refUrl:
        'https://app.sushi.com/swap?inputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619&outputCurrency=0xc81278a52AD0e1485B7C3cDF79079220Ddd68b7D',
      pairUrl:
        'https://app.sushi.com/legacy/add/0x7ceb23fd6bc0add59e62ac25578270cff1b9f619/0xc81278a52AD0e1485B7C3cDF79079220Ddd68b7D',
    },
  ],
} as Config
