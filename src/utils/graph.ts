import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import BigNumber from 'bignumber.js'
import _ from 'lodash'

const SUSHI_SUBGRAPH_URLS = {
  matic: 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
  mainnet: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
}

// TODO- Move Apollo Clients to provider
const clients = {
  matic: new ApolloClient({
    uri: SUSHI_SUBGRAPH_URLS.matic,
    cache: new InMemoryCache(),
  }),
  maticPollyBurn: new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/clabby/polly-burn',
    cache: new InMemoryCache(),
  }),
  mainnet: new ApolloClient({
    uri: SUSHI_SUBGRAPH_URLS.mainnet,
    cache: new InMemoryCache(),
  }),
}

const _getClient = (network: string) =>
  network.toLowerCase() === 'matic' ? clients.matic : clients.mainnet

const _querySubgraph = (query: string, network = 'matic', _client?: ApolloClient<any>) => {
  const client = _client || _getClient(network)
  return new Promise((resolve, reject) => {
    client
      .query({
        query: gql(query),
      })
      .then(({ data }) => resolve(data))
      .catch((err) => reject(err))
  })
}

const getPriceHistoryMultiple = async (
  tokenAddresses: string[],
  network = 'matic',
  first?: number,
) =>
  await _querySubgraph(
    _getPriceHistoryQueryMultiple(tokenAddresses, first),
    network,
  )

const getPriceHistory = async (tokenAddress: string, network = 'matic') =>
  await _querySubgraph(_getPriceHistoryQuery(tokenAddress), network)

// This is janky, will remove once the sushi subgraph syncs USD prices for most of our tokens
const getPriceFromPair = async (
  wethPrice: BigNumber,
  tokenAddress: string,
  network = 'matic',
) => {
  const data: any = await _querySubgraph(
    _getPriceFromPair(tokenAddress.toLowerCase()),
    network,
  )
  if (!data.token) return

  const quotePair: any = _.find(
    data.token.basePairs.concat(data.token.quotePairs),
    (pair: any) => {
      return (
        pair.token0.symbol.toLowerCase().includes('eth') ||
        pair.token1.symbol.toLowerCase().includes('eth')
      )
    },
  )
  if (!quotePair) return

  const wethPerToken = quotePair.token0.symbol.toLowerCase().includes('eth')
    ? quotePair.token0Price
    : quotePair.token1Price

  return wethPrice.times(wethPerToken)
}

const getPriceFromPairMultiple = async (
  wethPrice: BigNumber,
  tokenAddresses: string[],
  network = 'matic',
) => {
  const data: any = await _querySubgraph(
    _getPriceFromPairMultiple(
      tokenAddresses.map((tokenAddress) => tokenAddress.toLowerCase()),
    ),
    network,
  )
  if (!data.tokens) return

  const prices: any[] = []
  data.tokens.forEach((token: any) => {
    const quotePair: any = _.find(
      token.basePairs.concat(token.quotePairs),
      (pair: any) => {
        return (
          pair.token0.symbol.toLowerCase().includes('eth') ||
          pair.token1.symbol.toLowerCase().includes('eth')
        )
      },
    )
    if (!quotePair) return

    const wethPerToken = quotePair.token0.symbol.toLowerCase().includes('eth')
      ? quotePair.token0Price
      : quotePair.token1Price

    prices.push({
      address: token.id,
      price: wethPrice.times(wethPerToken),
    })
  })
  return prices
}

const getPrice = async (tokenAddress: string, network = 'matic') => {
  const data: any = await getPriceHistory(tokenAddress, network)
  return data.tokens[0] && new BigNumber(data.tokens[0].dayData[0].priceUSD)
}

const getPollyBurned = async () => {
  const data: any = await _querySubgraph(
    _getPollyBurnQuery(),
    'matic',
    clients.maticPollyBurn,
  )
  return data.burn
}

const getPollySupply = async () => {
  const data: any = await _querySubgraph(
    _getPollySupplyQuery(),
    'matic',
    clients.maticPollyBurn,
  )
  return data.tokenStats.supply
}

const _getPriceHistoryQuery = (tokenAddress: string) =>
  `
  {
    tokens(where: {id:"${tokenAddress}"}) {
      id
      symbol
      name
      dayData(orderBy:date, orderDirection:desc) {
        date
        priceUSD
      }
    }
  }
  `

const _getPriceHistoryQueryMultiple = (tokenAddresses: string[], first = 100) =>
  `
  {
    tokens(where: {id_in:["${tokenAddresses
      .map((symbol) => symbol.toLowerCase())
      .join('","')}"]}) {
      id
      name
      symbol
      decimals
      dayData(orderBy:date, orderDirection:desc, first: ${first}) {
        date
        priceUSD
      }
    }
  }
  `

const _getPriceFromPair = (tokenAddress: string) =>
  `
  {
    token(id:"${tokenAddress}"){
      ${_.map(
        ['basePairs', 'quotePairs'],
        (prefix) => `
          ${prefix} {
            token0 {
              symbol
            },
            token1 {
              symbol
            }
            token0Price,
            token1Price
          }
          `,
      )}
    }
  }
  `

const _getPriceFromPairMultiple = (tokenAddresses: string[]) => {
  return `
  {
    tokens(where: {id_in:[${tokenAddresses
      .map((address) => `"${address}"`)
      .join(',')}]}){
      id,
      ${_.map(
        ['basePairs', 'quotePairs'],
        (prefix) => `
          ${prefix} {
            token0 {
              symbol
            },
            token1 {
              symbol
            }
            token0Price,
            token1Price
          }
          `,
      )}
    }
  }
  `
}

const _getPollyBurnQuery = () =>
  `
  {
    burn(id:"0"){
      burnedTokens,
      eventCount,
    }
  }
  `

const _getPollySupplyQuery = () =>
  `
  {
    tokenStats(id:"0"){
      supply
    }
  }
  `

export default {
  getPriceHistory,
  getPriceHistoryMultiple,
  getPriceFromPair,
  getPriceFromPairMultiple,
  getPrice,
  getPollyBurned,
  getPollySupply,
}
