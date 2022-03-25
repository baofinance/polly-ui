import useBao from 'hooks/base/useBao'
import React, { useCallback, useEffect, useReducer } from 'react'
import { TransactionReceipt } from 'web3-core'
import Context from './context'
import reducer, {
	addTransaction,
	initialState,
	receiveTxReceipt,
	setTransactions,
} from './reducer'
import { Transaction, TransactionsMap } from './types'

const TransactionsProvider: React.FC = ({ children }) => {
	const bao = useBao()
	const [{ initialized, transactions }, dispatch] = useReducer(
		reducer,
		initialState,
	)

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

	const fetchTransactions = useCallback(async () => {
		try {
			const txsRaw = localStorage.getItem('transactions')
			const txs = (JSON.parse(txsRaw) as TransactionsMap) || {}
			dispatch(setTransactions(txs))

			if (!bao) return

			// Add receipt to any finished transactions that aren't flagged
			for (const key of Object.keys(txs)) {
				const tx = txs[key]
				if (!tx.receipt) {
					const receipt = await bao.web3.eth.getTransactionReceipt(tx.hash)
					if (receipt !== null) handleTxReceipt(receipt)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}, [bao, dispatch])

	useEffect(() => {
		if (initialized) {
			localStorage.setItem('transactions', JSON.stringify(transactions))
		}
	}, [initialized, transactions])

	useEffect(() => {
		fetchTransactions()
	}, [fetchTransactions])

	return (
		<Context.Provider
			value={{
				transactions,
				onAddTransaction: handleAddTransaction,
				onTxReceipt: handleTxReceipt,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default TransactionsProvider
