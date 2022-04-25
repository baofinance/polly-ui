import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'

export enum IndexType {
  PORTFOLIO = 'portfolio',
  YIELD = 'yield',
  METAGOVERNANCE = 'metagovernance',
  NESTS = 'test',
}

export interface NestComponent {
  symbol: string
  address: string
  decimals: number
  color: string
  percentage: number
  imageUrl?: string
  balance?: BigNumber
  balanceDecimals?: number
  price?: BigNumber
  basePrice?: BigNumber
  baseBalance?: BigNumber
  strategy?: string
}

export interface Nest {
  nid: number
  id: string
  name: string
  nestContract: Contract
  nestToken: string
  nestTokenAddress: string
  inputToken: string
  inputTokenAddress: string
  icon: string
  indexType?: IndexType
  pieColors: any
  cgIds: any
}

export interface NestsContext {
  nests: Nest[]
}
