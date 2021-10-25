import { Context } from 'contexts/Transactions'
import { useContext } from 'react'

const usePendingTransactions = () => {
  const { transactions } = useContext(Context)
  return Object.keys(transactions)
    .map((txHash) => transactions[txHash])
    .filter((tx) => !tx.receipt)
}

export default usePendingTransactions
