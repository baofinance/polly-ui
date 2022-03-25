import { Context } from 'contexts/Transactions'
import { useContext } from 'react'

const useTransactionAdder = () => {
  const { onAddTransaction } = useContext(Context)
  return { onAddTransaction }
}

export default useTransactionAdder
