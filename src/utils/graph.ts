import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import BigNumber from 'bignumber.js'

const SUSHI_SUBGRAPH_URLS = {
  matic: 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange',
  mainnet: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange'
}

// TODO- Move Apollo Clients to provider
const clients = {
  matic: new ApolloClient({
    uri: SUSHI_SUBGRAPH_URLS.matic,
    cache: new InMemoryCache()
  }),
  mainnet: new ApolloClient({
    uri: SUSHI_SUBGRAPH_URLS.mainnet,
    cache: new InMemoryCache()
  })
}

const _getClient = (network: string) =>
  network.toLowerCase() === 'matic' ? clients.matic : clients.mainnet

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

const _getPriceHistoryQueryMultiple = (tokenAddresses: string[]) =>
  `
  {
    tokens(where: {id_in:["${tokenAddresses.map(symbol => symbol.toLowerCase()).join('","')}"]}) {
      id
      name
      symbol
      decimals
      dayData(orderBy:date, orderDirection:desc) {
        date
        priceUSD
      }
    }
  }
  `

const getPriceHistoryMultiple = (tokenAddresses: string[], network: string = 'matic') => {
  const client = _getClient(network)
  return new Promise(resolve => {
    client.query({
      query: gql(_getPriceHistoryQueryMultiple(tokenAddresses))
    })
      .then(({ data }) => resolve(data))
      .catch(() => {})
  })
}

const getPriceHistory = (tokenAddress: string, network: string = 'matic') => {
  const client = _getClient(network)
  return new Promise(resolve => {
    client.query({
      query: gql(_getPriceHistoryQuery(tokenAddress))
    })
      .then(({ data }) => resolve(data))
      .catch(() => {})
  })
}

const getPrice = async (tokenAddress: string, network: string = 'matic') => {
  const data: any = await getPriceHistory(tokenAddress, network)
  return data.tokens[0] && new BigNumber(data.tokens[0].dayData[0].priceUSD)
}

export default { getPriceHistory, getPriceHistoryMultiple, getPrice }
