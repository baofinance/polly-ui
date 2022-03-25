import { Context } from 'contexts/Transactions'
import { useContext } from 'react'

const useTransactionProvider = () => useContext(Context)

export default useTransactionProvider
