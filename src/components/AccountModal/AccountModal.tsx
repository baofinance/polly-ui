import Config from '@/bao/lib/config'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import useTokenBalance from '@/hooks/base/useTokenBalance'
import useTransactionProvider from '@/hooks/base/useTransactionProvider'
import { getDisplayBalance } from '@/utils/numberFormat'
import { faCircleCheck, faCircleXmark, faExternalLinkAlt, faReceipt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import _ from 'lodash'
import Image from 'next/future/image'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import { PendingTransaction } from '../Loader/Loader'
import Tooltipped from '../Tooltipped'

interface AccountModalProps {
	show: boolean
	onHide: () => void
}

const AccountModal: FC<AccountModalProps> = ({ show, onHide }) => {
	const { account, chainId, deactivate } = useWeb3React()

	const handleSignOutClick = useCallback(() => {
		onHide()
		deactivate()
	}, [onHide, deactivate])

	const { transactions, onClearTransactions } = useTransactionProvider()
	const baoBalance = useTokenBalance(Config.contracts.polly[chainId].address)
	const [tx, setTx] = useState({})

	useEffect(() => {
		const _tx = localStorage.getItem('transactions')
		if (tx) {
			setTx(_tx)
		}
	}, [transactions, tx])

	return (
		<Modal isOpen={show} onDismiss={onHide}>
			<Modal.Header header={'Account'} onClose={onHide} />
			<Modal.Body>
				<div className='grid grid-flow-col gap-4 p-4'>
					<div className='flex items-center justify-center'>
						<div className='flex min-h-[36px] min-w-[36px] items-center rounded-full bg-transparent-100 lg:min-h-[48px] lg:min-w-[48px]'>
							<Image src='/images/tokens/BAO.png' alt='ETH' width={isDesktop ? 32 : 24} height={isDesktop ? 32 : 24} className='m-auto' />
						</div>
						<div className='ml-2'>
							<Typography variant='lg' className='font-bakbak'>
								{getDisplayBalance(baoBalance)}
							</Typography>
							<Typography variant='sm' className='font-bakbak text-pollyGreen'>
								BAO {isDesktop && 'Balance'}
							</Typography>
						</div>
					</div>
				</div>
				<>
					<div className='mt-4 flex-1 rounded-3xl border border-pollyWhite border-opacity-20 bg-pollyBlack bg-opacity-5 pb-3 text-pollyWhite'>
						<Typography variant='lg' className='float-left mt-2 px-3 py-2 font-bakbak'>
							Recent Transactions <FontAwesomeIcon icon={faReceipt} className='mx-1 text-pollyGreen' size='sm' />
						</Typography>

						{Object.keys(transactions).length > 0 && (
							<Button
								size='sm'
								className='float-right m-3 h-auto !px-2 !py-1'
								onClick={() => {
									onClearTransactions()
								}}
							>
								<Typography variant='sm'>Clear</Typography>
							</Button>
						)}

						{Object.keys(transactions).length > 0 ? (
							<>
								{_.reverse(Object.keys(transactions))
									.slice(0, 5)
									.map(txHash => (
										<div key={txHash} className=' flex w-full items-center justify-between px-3 py-1'>
											{transactions[txHash].receipt ? (
												transactions[txHash].receipt.status === 1 ? (
													<FontAwesomeIcon icon={faCircleCheck} className='text-pollyGreen' size={isDesktop ? 'lg' : 'sm'} />
												) : (
													<FontAwesomeIcon icon={faCircleXmark} className='text-pollyGreen' size={isDesktop ? 'lg' : 'sm'} />
												)
											) : (
												<PendingTransaction />
											)}
											<Link href={`${Config.defaultRpc.blockExplorerUrls}/tx/${txHash}`} target='_blank'>
												<a>
													<Typography className='text-end text-sm text-pollyWhite hover:text-pollyGreen lg:text-base'>
														{transactions[txHash].description}
														<Tooltipped content='View on Etherscan'>
															<FontAwesomeIcon icon={faExternalLinkAlt} className='ml-1 text-pollyGreen' size='sm' />
														</Tooltipped>
													</Typography>
												</a>
											</Link>
										</div>
									))}
							</>
						) : (
							<div className='flex w-full items-center px-3 py-1'>
								<Typography variant='sm' className='text-end font-normal text-pollyWhite/60'>
									Completed transactions will show here...
								</Typography>
							</div>
						)}
					</div>
				</>
			</Modal.Body>
			<Modal.Actions>
				<Button
					fullWidth
					className='w-full'
					href={`${Config.defaultRpc.blockExplorerUrls[0]}/address/${account}`}
					text='View on Explorer'
				/>
				<Button fullWidth onClick={handleSignOutClick} text='Sign out' />
			</Modal.Actions>
		</Modal>
	)
}

export default AccountModal
