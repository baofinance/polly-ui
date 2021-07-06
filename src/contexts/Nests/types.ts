import { Contract } from 'web3-eth-contract'

export interface Nest {
  pid: number
  name: string
  nestContract: Contract
  nestAddress: string
  icon: string
  id: string
  tokenSymbol: string
}

export interface NestsContext {
  nests: Nest[]
}
