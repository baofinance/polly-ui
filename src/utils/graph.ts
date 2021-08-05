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

const getPriceHistoryQuery = (tokenSymbol: string) =>
  `
  {
    tokens(where: {symbol:"${tokenSymbol}"}) {
      id
      symbol
      name,
      dayData(orderBy:date, orderDirection:desc) {
        date
        priceUSD
      }
    }
  }
  `

const getPriceHistoryQueryMultiple = (tokenSymbols: string[]) =>
  `
  {
    tokens(where: {symbol_in:["${tokenSymbols.join('","')}"]}) {
      id
      symbol
      name,
      dayData(orderBy:date, orderDirection:desc) {
        date
        priceUSD
      }
    }
  }
  `

const getSubgraphPriceHistoryMultiple = (tokenSymbol: string[], network: string = 'matic') => {
  const client = _getClient(network)
  return new Promise(resolve => {
    client.query({
      query: gql(getPriceHistoryQueryMultiple(tokenSymbol))
    })
      .then(({ data }) => resolve(data))
      .catch(() => {})
  })
}

const getSubgraphPriceHistory = (tokenSymbol: string, network: string = 'matic') => {
  const client = _getClient(network)
  return new Promise(resolve => {
    client.query({
      query: gql(getPriceHistoryQuery(tokenSymbol))
    })
      .then(({ data }) => resolve(data))
      .catch(() => {})
  })
}

const getSubgraphPrice = async (tokenSymbol: string, network: string = 'matic') => {
  const data: any = await getSubgraphPriceHistory(tokenSymbol, network)
  return data.tokens[0] && new BigNumber(data.tokens[0].dayData[0].priceUSD)
}

export { getSubgraphPriceHistory, getSubgraphPriceHistoryMultiple, getSubgraphPrice, getPriceHistoryQuery }
