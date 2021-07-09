import { Contract } from 'web3-eth-contract'

export interface Nest {
  nid: number
  name: string
  nestContract: Contract
  nestToken: string
  nestTokenAddress: string
  mintingTokenAddress: string
  icon: string
  id: string
  tokenSymbol: string
}

export interface NestsContext {
  nests: Nest[]
}
