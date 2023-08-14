import React, { useState, useCallback, useEffect, useReducer } from 'react'
import { PropsWithChildren } from 'react'
import { useWeb3React } from '@web3-react/core'

import Context from './context'
import reducer, { addTransaction, initialState, receiveTxReceipt, setTransactions } from './reducer'
import { Transaction, TransactionsMap, TransactionReceipt } from './types'

interface TransactionsProviderProps {
	children: React.ReactNode
}

const TransactionsProvider: React.FC<PropsWithChildren<TransactionsProviderProps>> = ({ children }) => {
	const [{ initialized, transactions }, dispatch] = useReducer(reducer, initialState)
	const [loaded, setLoaded] = useState(false)
	const { library } = useWeb3React()

	const handleAddTransaction = useCallback(
		(tx: Transaction) => {
			dispatch(addTransaction(tx))
		},
		[dispatch],
	)

	const handleTxReceipt = useCallback(
		(receipt: TransactionReceipt) => {
			dispatch(receiveTxReceipt(receipt.transactionHash, receipt))
		},
		[dispatch],
	)

	const handleClearTransactions = useCallback(() => {
		dispatch(setTransactions({}))
	}, [dispatch])

	const fetchTransactions = useCallback(async () => {
		try {
			const txsRaw = localStorage.getItem('transactions')
			const txs = (JSON.parse(txsRaw) as TransactionsMap) || {}
			dispatch(setTransactions(txs))

			// Add receipt to any finished transactions that aren't flagged
			for (const key of Object.keys(txs)) {
				const tx = txs[key]
				if (!tx.receipt) {
					const receipt = await library.getTransactionReceipt(tx.hash)
					if (receipt !== null) handleTxReceipt(receipt)
				}
			}
			setLoaded(true)
		} catch (e) {
			console.error(e)
		}
	}, [dispatch, handleTxReceipt, setLoaded, library])

	useEffect(() => {
		if (initialized) {
			localStorage.setItem('transactions', JSON.stringify(transactions))
		}
	}, [initialized, transactions])

	useEffect(() => {
		if (!library) return
		fetchTransactions()
	}, [fetchTransactions, library])

	return (
		<Context.Provider
			value={{
				loaded,
				transactions,
				onAddTransaction: handleAddTransaction,
				onTxReceipt: handleTxReceipt,
				onClearTransactions: handleClearTransactions,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default TransactionsProvider
