import { useContext } from 'react'

import { Context } from '@/contexts/Transactions'

const usePendingTransactions = () => {
	const { transactions } = useContext(Context)
	return Object.keys(transactions)
		.map(txHash => transactions[txHash])
		.filter(tx => !tx.receipt)
}

export default usePendingTransactions
