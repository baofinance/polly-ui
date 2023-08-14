import Config from '@/bao/lib/config'
import useTokenBalance, { useEthBalance } from '@/hooks/base/useTokenBalance'
import useTransactionProvider from '@/hooks/base/useTransactionProvider'
import { getDisplayBalance } from '@/utils/numberFormat'
import { faAngleDoubleRight, faLink, faReceipt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Listbox, Transition } from '@headlessui/react'
import { default as UDResolution } from '@unstoppabledomains/resolution'
import { useWeb3React } from '@web3-react/core'
import classNames from 'classnames'
import { ethers } from 'ethers'
import Image from 'next/future/image'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import AccountModal from '../AccountModal'
import Button from '../Button'
import Loader from '../Loader'
import Typography from '../Typography'
import WalletProviderModal from '../WalletProviderModal'

const udResolution = new UDResolution()
async function udReverseAddress(address: string): Promise<string> {
	const domain = await udResolution.reverse(address)
	return domain
}

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = () => {
	const { account, chainId } = useWeb3React()
	const { transactions } = useTransactionProvider()
	const [showAccountModal, setShowAccountModal] = useState(false)
	const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
	const [ens, setEns] = useState<string | undefined>()
	const [ud, setUd] = useState<string | undefined>()

	const [selectedAsset, setSelectedAsset] = useState('WETH')
	const wethBalance = useTokenBalance(Config.contracts.weth[chainId].address)
	const pollyBalance = useTokenBalance(Config.contracts.polly[chainId].address)
	const assets = [
		['0', 'WETH', wethBalance.toString()],
		['1', 'POLLY', pollyBalance.toString()],
	]
	const asset = assets.length ? assets.find(asset => asset[1] === selectedAsset) : assets.find(asset => asset[1] === 'WETH')

	useEffect(() => {
		const ensResolver = new ethers.providers.JsonRpcProvider(`${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_URL}`)
		if (!account) return
		ensResolver.lookupAddress(account).then(_ens => {
			if (_ens) setEns(_ens)
		})
	}, [account])

	useEffect(() => {
		if (!account) return
		udReverseAddress(account).then(_ud => {
			if (_ud) setUd(_ud)
		})
	}, [account])

	const pendingTxs = useMemo(() => Object.keys(transactions).filter(txHash => !transactions[txHash].receipt).length, [transactions])

	const vanityId = ens || ud
	const vanityAddress = account ? `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}` : '0x0000...abcd'
	const displayId = vanityId || vanityAddress

	return (
		<>
			{!account ? (
				<Button onClick={() => setShowWalletProviderModal(true)} size='sm'>
					Connect <FontAwesomeIcon icon={faLink} className='ml-1' />
				</Button>
			) : (
				<>
					<Button onClick={() => setShowAccountModal(true)} size='sm'>
						<div className='items-center'>
							{displayId}
							{pendingTxs > 0 && (
								<>
									<FontAwesomeIcon icon={faAngleDoubleRight} className='mx-2 mt-1 text-pollyRed' />
									<Loader />
									<span className='ml-2'>{pendingTxs}</span>
									<FontAwesomeIcon icon={faReceipt} className='mx-2 mt-1 text-pollyRed' />
								</>
							)}
						</div>
					</Button>
					<div className='hidden lg:block'>
						<Listbox value={selectedAsset} onChange={setSelectedAsset}>
							{({ open }) => (
								<>
									<div>
										<Listbox.Button className={(classNames(open ? 'text-pollyRed' : 'text-pollyWhite'), 'inline-flex')}>
											<div className='m-1 flex w-fit rounded-full border border-pollyWhite border-opacity-20 bg-pollyWhite bg-opacity-5 px-4 py-2 duration-300 hover:border-pollyRed hover:bg-transparent-300'>
												<div className='w-full text-pollyWhite'>
													<div className='h-full items-start'>
														<span className='inline-block text-left align-middle'>
															<Typography variant='xl' className='font-bakbak'>
																{getDisplayBalance(asset[2])}
															</Typography>
														</span>
														<div className='ml-2 inline-block'>
															<Image
																className='z-10 inline-block select-none'
																src={`/images/tokens/${asset[1]}.png`}
																alt={asset[1]}
																width={24}
																height={24}
															/>
														</div>
													</div>
												</div>
											</div>
										</Listbox.Button>
										<Transition
											show={open}
											as={Fragment}
											leave='transition ease-in duration-100'
											leaveFrom='opacity-100'
											leaveTo='opacity-0'
										>
											<Listbox.Options className='absolute z-10 origin-bottom-left overflow-hidden rounded-3xl border border-pollyWhite/20 bg-pollyBlack p-2 shadow-lg shadow-pollyBlack ring-1 ring-black ring-opacity-5 focus:outline-none'>
												{assets.map(([index, symbol, balance]) => (
													<Listbox.Option
														key={index}
														className={({ active }) =>
															classNames(
																active ? 'border !border-pollyRed bg-pollyWhite bg-opacity-5 text-pollyRed' : 'text-pollyWhite',
																'cursor-pointer select-none rounded-3xl border border-pollyBlack border-opacity-0 p-2',
															)
														}
														value={symbol}
													>
														{({ selected, active }) => (
															<div className='mx-0 my-auto items-end gap-4 text-right'>
																<span className='inline-block text-right align-middle'>
																	<Typography variant='xl' className='font-bakbak'>
																		{getDisplayBalance(balance)}
																	</Typography>
																</span>
																<div className='ml-2 inline-block'>
																	<Image
																		className='z-10 inline-block select-none'
																		src={`/images/tokens/${symbol}.png`}
																		alt={symbol}
																		width={24}
																		height={24}
																	/>
																</div>
															</div>
														)}
													</Listbox.Option>
												))}
											</Listbox.Options>
										</Transition>
									</div>
								</>
							)}
						</Listbox>
					</div>
				</>
			)}
			<AccountModal show={showAccountModal} onHide={() => setShowAccountModal(false)} />
			<WalletProviderModal show={showWalletProviderModal} onHide={() => setShowWalletProviderModal(false)} />
		</>
	)
}

export default AccountButton
