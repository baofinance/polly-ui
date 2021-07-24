import { Contract } from 'web3-eth-contract'

export enum IndexType {
  PORTFOLIO = 'portfolio',
  YIELD = 'yield',
  METAGOVERNANCE = 'metagovernance',
  TEST = 'test',
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
}

export interface NestsContext {
  nests: Nest[]
}
