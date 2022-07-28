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
  nestAddresses?: {
    [network: number]: string
  }
  lpAddress: string
  symbol: string
  name: string
  icon: string
  cgIds: { [address: string]: string }
  pieColors: { [asset: string]: string }
  desc: string
  swap?: string
  address?: string
  nestContract?: Contract
}

export interface NestsContext {
  nests: Nest[]
}
