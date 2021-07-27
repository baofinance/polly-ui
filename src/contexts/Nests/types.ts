import { Contract } from 'web3-eth-contract'

export enum IndexType {
  PORTFOLIO = 'portfolio',
  YIELD = 'yield',
  METAGOVERNANCE = 'metagovernance',
  TEST = 'test',
}

interface NestComponent {
  symbol: string
  address: string
  decimals: number
  color: string
  percentage: number
  coingeckoId: number
  coingeckoImageId: number
  imageUrl?: string
}

export interface Nest {
  nid: number
  id: string
  name: string
  nestContract: Contract
  nestToken: string
  nestTokenAddress: string
  inputTokenContract: Contract
  inputToken: string
  inputTokenAddress: string
  icon: string
  tokenSymbol: string
  coingeckoId: string
  indexType?: IndexType
  composition: Array<NestComponent>
}

export interface NestsContext {
  nests: Nest[]
}
