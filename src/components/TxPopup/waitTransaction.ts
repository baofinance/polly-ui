// INFO: from https://ethereum.stackexchange.com/a/80694
/**
 * Wait transactions to be mined.
 *
 * Based on https://raw.githubusercontent.com/Kaisle/await-transaction-mined/master/index.js
 */
import { ethers } from 'ethers'

const DEFAULT_INTERVAL = 1500

const DEFAULT_BLOCKS_TO_WAIT = 1

interface Options {
	interval: number
	blocksToWait: number
}

/**
 * Wait for one or multiple transactions to confirm.
 *
 * @param library A web3 library
 * @param txnHash A transaction hash or list of those
 * @param options Wait timers
 * @return Transaction receipt
 */
export async function waitTransaction(library: any, txnHash: string | string[], options: Options = null): Promise<any> {
	const interval = options && options.interval ? options.interval : DEFAULT_INTERVAL
	const blocksToWait = options && options.blocksToWait ? options.blocksToWait : DEFAULT_BLOCKS_TO_WAIT
	const transactionReceiptAsync = async function (txnHash: any, resolve: any, reject: any) {
		try {
			const receipt = library.getTransactionReceipt(txnHash)
			if (!receipt) {
				setTimeout(function () {
					transactionReceiptAsync(txnHash, resolve, reject)
				}, interval)
			} else {
				if (blocksToWait > 0) {
					const resolvedReceipt = await receipt
					if (!resolvedReceipt || !resolvedReceipt.blockNumber) {
						setTimeout(function () {
							transactionReceiptAsync(txnHash, resolve, reject)
						}, interval)
					} else {
						try {
							const block = await library.getBlock(resolvedReceipt.blockNumber)
							const current = await ethers.getDefaultProvider().getBlock('latest')
							// FIXME: this || <part> might have a bug.
							//if (current.number - block.number >= blocksToWait || current.hash === block.hash) {
							if (current.number - block.number >= blocksToWait) {
								const txn = await library.getTransaction(txnHash)
								if (txn.blockNumber != null) resolve(resolvedReceipt)
								else reject(new Error('Transaction with hash: ' + txnHash + ' ended up in an uncle block.'))
							} else
								setTimeout(function () {
									transactionReceiptAsync(txnHash, resolve, reject)
								}, interval)
						} catch (e) {
							setTimeout(function () {
								transactionReceiptAsync(txnHash, resolve, reject)
							}, interval)
						}
					}
				} else {
					resolve(receipt)
				}
			}
		} catch (e) {
			reject(e)
		}
	}

	// Resolve multiple transactions once
	if (Array.isArray(txnHash)) {
		const promises: any[] = []
		txnHash.forEach(function (oneTxHash) {
			promises.push(waitTransaction(library, oneTxHash, options))
		})
		return Promise.all(promises)
	} else {
		return new Promise(function (resolve, reject) {
			transactionReceiptAsync(txnHash, resolve, reject)
		})
	}
}

/**
 * Check if the transaction was success based on the receipt.
 *
 * https://ethereum.stackexchange.com/a/45967/620
 *
 * @param receipt Transaction receipt
 */
export function isSuccessfulTransaction(receipt: any): boolean {
	if (receipt.status === '0x1' || receipt.status == 1) {
		return true
	} else {
		return false
	}
}
