import { EthersError, getParsedEthersError } from '@enzoferey/ethers-error-parser'
import { TransactionReceipt } from '@ethersproject/providers'
import { ContractTransaction } from 'ethers'
import { useState } from 'react'
import { Store as NotifStore } from 'react-notifications-component'
import useTransactionProvider from './useTransactionProvider'

const useTransactionHandler = () => {
	const { onAddTransaction, onTxReceipt } = useTransactionProvider()
	const [pendingTx, setPendingTx] = useState<string | boolean>(false)
	const [txSuccess, setTxSuccess] = useState<boolean>(false)
	const [txHash, setTxHash] = useState<string>('')
	const [txDescription, setTxDescription] = useState<string>('')

	const clearPendingTx = () => {
		setPendingTx(false)
	}

	const handlePendingTx = (hash: string, description: string) => {
		onAddTransaction({
			hash,
			description,
		})
		setPendingTx(hash)
	}

	const handleReceipt = (receipt: TransactionReceipt) => {
		onTxReceipt(receipt)
		setPendingTx(false)
	}

	const handleTx = async (_tx: Promise<ContractTransaction>, description: string, cb?: () => void) => {
		try {
			const tx = await _tx
			handlePendingTx(tx.hash, description)
			setPendingTx(true)
			setTxHash(tx.hash)
			setTxDescription(description)
			const receipt = await tx.wait()
			handleReceipt(receipt)
			if (cb) cb()
			setTxSuccess(receipt.status === 1)
		} catch (e) {
			const error = getParsedEthersError(e as EthersError)
			const context = error.context.toString()

			if (context.includes('rejected')) {
				NotifStore.addNotification({
					title: `Transaction Failed`,
					message: `User rejected transaction`,
					type: 'danger',
					insert: 'top',
					container: 'bottom-right',
					animationIn: ['animate__animated', 'animate__fadeIn'],
					animationOut: ['animate__animated', 'animate__fadeOut'],
					dismiss: {
						pauseOnHover: true,
						duration: 7000,
						onScreen: true,
						click: false, // so one can click the polygonscan link
						touch: false, // so one can click the polygonscan link
					},
				})
			} else {
				NotifStore.addNotification({
					title: `Transaction Reverted`,
					message: `${error.context}`,
					type: 'danger',
					insert: 'top',
					container: 'bottom-right',
					animationIn: ['animate__animated', 'animate__fadeIn'],
					animationOut: ['animate__animated', 'animate__fadeOut'],
					dismiss: {
						pauseOnHover: true,
						duration: 7000,
						onScreen: true,
						click: false, // so one can click the polygonscan link
						touch: false, // so one can click the polygonscan link
					},
				})
			}
		}
	}

	return {
		clearPendingTx,
		pendingTx,
		handleTx,
		txSuccess,
		txHash,
		txDescription,
	}
}

export default useTransactionHandler
