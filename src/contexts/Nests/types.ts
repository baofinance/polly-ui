import { Contract } from 'web3-eth-contract'

export enum NestType {
  POLLY = 'polly',
  ARCHIVED = 'archived',
}

export interface Nest {
  nid: number
  name: string
  nestAddress: string
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: string
  id: string
  tokenSymbol: string
  refUrl: string
  nestType?: NestType
}

export interface NestsContext {
  nests: Nest[]
}
