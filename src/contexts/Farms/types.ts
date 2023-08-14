import { FarmableSupportedPool } from '@/bao/lib/types'
import { BigNumber } from 'ethers'
import { Contract } from '@ethersproject/contracts'

export enum PoolType {
	ACTIVE = 'active',
	ARCHIVED = 'archived',
}

export interface Farm {
	pid: number
	name: string
	lpToken: string
	lpTokenAddress: string
	lpContract: Contract
	tokenAddress: string
	tokenDecimals: number
	earnToken: string
	earnTokenAddress: string
	iconA: string
	iconB: string
	id: string
	tokenSymbol: string
	refUrl: string
	pairUrl: string
	poolType: PoolType
	tvl: BigNumber
	type: string
}

export interface FarmsContext {
	farms: FarmableSupportedPool[]
}
