import { Context } from 'contexts/Transactions'
import { useContext } from 'react'

const usePendingTransactions = () => {
  const { transactions } = useContext(Context)
  const pendingTransactions = Object.keys(transactions)
    .map((txHash) => transactions[txHash])
    .filter((tx) => !tx.receipt)
  return pendingTransactions
}

export default usePendingTransactions
