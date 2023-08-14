import { useContext, useState, useRef, useEffect } from 'react'

import { Context as TransactionsContext } from '@/contexts/Transactions'

const useTransactionProvider = () => useContext(TransactionsContext)

export const useTxReceiptUpdater = (callback: (() => void) | (() => Promise<void>)) => {
	const [firstRender, setFirstRender] = useState<boolean>(true)
	const { transactions, loaded } = useTransactionProvider()
	const txNumberRef = useRef<number>(Object.keys(transactions).filter(tx => transactions[tx].receipt).length)
	useEffect(() => {
		if (loaded) {
			setFirstRender(false)
		}
	}, [setFirstRender, loaded])
	const txNumber = Object.keys(transactions).filter(tx => transactions[tx].receipt)
	if (txNumber.length !== txNumberRef.current) {
		txNumberRef.current = txNumber.length
		if (loaded && !firstRender) {
			callback()
		}
	}

	//useEffect(() => {
	//}, [loaded, firstRender, txNumber.length, callback])
}

export default useTransactionProvider
