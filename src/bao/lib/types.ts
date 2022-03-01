import { Contract } from 'web3-eth-contract'

export interface SupportedPool {
  pid: number
  lpAddresses: {
    [network: number]: string
  }
  tokenAddresses: {
    [network: number]: string
  }
  tokenDecimals: number
  name: string
  symbol: string
  tokenSymbol: string
  iconA: string
  iconB: string
  refUrl: string
  pairUrl: string
}

export interface SupportedNest {
  nid: number
  nestAddresses: {
    [network: number]: string
  }
  inputToken: string
  outputToken: string
  symbol: string
  name: string
  icon: string
  pieColors: {
    [asset: string]: string
  }
}

export interface FarmableSupportedPool extends SupportedPool {
  lpAddress: string
  tokenAddress: string
  lpContract: Contract
  tokenContract: Contract
}

export interface ActiveSupportedNest extends SupportedNest {
  nestAddress: string
  nestContract: Contract
}

export interface RpcConfig {
  chainId: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

export interface AddressMapConfig {
  [name: string]: string
}

export interface ContractsConfig {
  [name: string]: {
    [networkId: number]: {
      address: string
      abi: string
      contract?: Contract
    }
  }
}

export interface SubgraphConfig {
  [networkId: number]: {
    [name: string]: string
  }
}

export interface Config {
  networkId: number
  defaultRpc: RpcConfig
  addressMap: AddressMapConfig
  contracts: ContractsConfig
  subgraphs: SubgraphConfig
  farms: SupportedPool[]
  nests: SupportedNest[]
}

export const ConfirmationType = {
  Hash: 0,
  Confirmed: 1,
  Both: 2,
  Simulate: 3,
}
