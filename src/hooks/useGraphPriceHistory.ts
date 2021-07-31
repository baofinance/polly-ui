import { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { Nest } from '../contexts/Nests'
import { TimeseriesData } from '../components/Graphs/AreaGraph/AreaGraph'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { addressMap } from '../bao/lib/constants'

const SUSHI_SUBGRAPH = 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange'

// TODO: Move this client to a provider
const client = new ApolloClient({
  uri: SUSHI_SUBGRAPH,
  cache: new InMemoryCache()
})

const useGraphPriceHistory = (nest: Nest) => {
  const [res, setRes] = useState<TimeseriesData[] | undefined>()

  // Replace weth address with nest.nestAddress once sushi pools are live
  const query = `
  {
    tokens(where: {id:"${addressMap.WETH}"}) {
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

  const querySubgraph = useCallback(async () => {
    client.query({
      query: gql(query)
    }).then(({ data }) => {
      const formattedData: Array<TimeseriesData> = []

      _.each(data.tokens[0].dayData, dayData => {
        formattedData.push({
          date: new Date(dayData.date * 1000).toISOString(),
          close: parseFloat(dayData.priceUSD)
        })
      })

      setRes(_.reverse(formattedData))
    })
  }, [nest])

  useEffect(() => {
    querySubgraph()
  }, [nest])

  return res
}

export default useGraphPriceHistory
