import { Erc20, Experipie, Recipe, Uni_v2_lp } from '@/typechain/index'

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
	poolType: string
	tokenSymbol: string
	iconA: string
	iconB: string
	refUrl: string
	pairUrl: string
	type: string
}

export interface SupportedNest {
	nid: number
	nestAddresses: {
		[network: number]: string
	}
	lpAddress: string
	symbol: string
	name: string
	icon: string
	cgIds: { [address: string]: string }
	llamaPools: { [address: string]: string }
	pieColors: { [asset: string]: string }
	desc: string
	swap?: string
	address: string
	nestContract: Experipie
	recipeAddress: string
	recipeContract: Recipe
	recipeVersion: number
}

export interface FarmableSupportedPool extends SupportedPool {
	lpAddress: string
	tokenAddress: string
	lpContract: Uni_v2_lp
	tokenContract: Erc20
}

export interface ActiveSupportedNest extends SupportedNest {
	address: string
	nestContract: Experipie
	recipeContract: Recipe
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
		}
	}
}

export interface SubgraphConfig {
	[subgraphName: string]: {
		[networkId: number]: string
	}
}

export interface Config {
	networkId: number
	defaultRpc: RpcConfig
	addressMap: AddressMapConfig
	llamaIds: AddressMapConfig
	contracts: ContractsConfig
	subgraphs: SubgraphConfig
	farms: SupportedPool[]
	nests: SupportedNest[]
}
