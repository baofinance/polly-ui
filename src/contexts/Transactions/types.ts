import { TransactionReceipt } from '@ethersproject/providers'

export type { TransactionReceipt } from '@ethersproject/providers'

export interface Transaction {
	description: string
	hash: string
	receipt?: TransactionReceipt
}

export interface TransactionsMap {
	[key: string]: Transaction
}
