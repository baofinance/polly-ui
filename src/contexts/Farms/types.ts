import { Contract } from 'web3-eth-contract'
import BigNumber from 'bignumber.js/bignumber'

export enum PoolType {
  SUSHI = 'sushi',
  POLLY = 'polly',
  ARCHIVED = 'archived',
}

export interface Farm {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  earnToken: string
  earnTokenAddress: string
  icon: string
  id: string
  tokenSymbol: string
  refUrl: string
  pairUrl: string
  poolType?: PoolType
  tvl?: BigNumber
}

export interface FarmsContext {
  farms: Farm[]
  unharvested: number
}
