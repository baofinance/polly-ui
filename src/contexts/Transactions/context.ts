import { createContext } from 'react'
import { TransactionReceipt } from 'web3-core'
import { Transaction, TransactionsMap } from './types'

interface TransactionsContext {
  transactions: TransactionsMap
  onAddTransaction: (tx: Transaction) => void
  onTxReceipt: (receipt: TransactionReceipt) => void
}

export default createContext<TransactionsContext>({
  transactions: {},
  onAddTransaction: (tx: Transaction) => {},
  onTxReceipt: (receipt: TransactionReceipt) => {},
})
