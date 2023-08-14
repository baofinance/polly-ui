import Config from '@/bao/lib/config'
import { ActiveSupportedNest } from '@/bao/lib/types'
import Badge from '@/components/Badge'
import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import Input from '@/components/Input'
import { PendingTransaction } from '@/components/Loader/Loader'
import Modal from '@/components/Modal'
import Typography from '@/components/Typography'
import useAllowance from '@/hooks/base/useAllowance'
import useContract from '@/hooks/base/useContract'
import useTokenBalance from '@/hooks/base/useTokenBalance'
import useTransactionHandler from '@/hooks/base/useTransactionHandler'
import useNestRates from '@/hooks/nests/useNestRate'
import type { Weth, Recipe } from '@/typechain/index'
import { decimate, getDisplayBalance } from '@/utils/numberFormat'
import { faEthereum } from '@fortawesome/free-brands-svg-icons'
import { faExternalLink, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import { BigNumber, ethers } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import Image from 'next/future/image'
import React, { useMemo, useState } from 'react'

type ModalProps = {
	nest: ActiveSupportedNest
	operation: string
	show: boolean
	hideModal: () => void
}

// TODO: Make the NestModal a modular component that can work with different recipes and different input tokens.
const NestModal: React.FC<ModalProps> = ({ nest, operation, show, hideModal }) => {
	const { chainId } = useWeb3React()
	const [val, setVal] = useState<string | undefined>('')
	const [secondaryVal, setSecondaryVal] = useState<string | undefined>('')
	const { handleTx, pendingTx, txHash } = useTransactionHandler()
	const rates = useNestRates(nest)

	const recipe = useContract<Recipe>('Recipe', Config.contracts.recipe[chainId].address)
	const weth = useContract<Weth>('Weth', Config.contracts.weth[chainId].address)

	// Get DAI approval
	const wethAllowance = useAllowance(Config.addressMap.WETH, Config.contracts.recipe[chainId].address)

	// Get Nest & DAI balances
	const nestBalance = useTokenBalance(nest.address)
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

	const swapLink = nest && nest.swap

	const handleOperation = () => {
		let tx

		switch (operation) {
			case 'MINT':
				if (wethAllowance.eq(0) || wethAllowance.lt(parseUnits(val))) {
					// TODO: give the user a notice that we're approving max uint and instruct them how to change this val.
					tx = weth.approve(recipe.address, ethers.constants.MaxUint256)
					handleTx(tx, 'Nests Recipe: Approve DAI')
					break
				}

				tx = recipe.bake(nest.address, Config.addressMap.WETH, parseUnits(val), parseUnits(secondaryVal))

				handleTx(tx, `${nest.symbol} Nest: Mint ${getDisplayBalance(secondaryVal, 0) || 0} ${nest.symbol}`, () => hide())
				break
			case 'REDEEM':
				tx = nest.nestContract.exitPool(parseUnits(val))
				handleTx(tx, `${nest.symbol} Nest: Redeem ${getDisplayBalance(val, 0)} ${nest.symbol}`, () => hide())
		}
	}

	const isButtonDisabled = useMemo(() => {
		if (pendingTx !== false) {
			return true
		}
		if (operation === 'MINT') {
			const _val = val && parseUnits(val)
			const walletBallance = operation === 'MINT' ? wethBalance : nestBalance
			let canParseVal = true
			try {
				parseUnits(val)
			} catch {
				canParseVal = false
			}
			return (
				wethAllowance &&
				(wethAllowance.eq(0) || wethAllowance.lt(_val)) &&
				canParseVal &&
				(parseUnits(val).eq(0) || parseUnits(val).gt(walletBallance))
			)
		}
		return false
	}, [pendingTx, operation, val, wethBalance, nestBalance, wethAllowance])

	const hide = () => {
		hideModal()
		setVal('')
		setSecondaryVal('')
	}

	return nest ? (
		<>
			<Modal isOpen={show} onDismiss={hide}>
				<Modal.Header
					header={
						<div className='mx-0 my-auto flex h-full items-center gap-2 text-pollyWhite'>
							{operation === 'MINT' ? 'Mint' : 'Redeem'} {nest.symbol}
							<Image src={`/images/tokens/${nest.symbol}.png`} width={32} height={32} alt={nest.symbol} />
						</div>
					}
					onClose={hide}
				></Modal.Header>
				<Modal.Body>
					<div className='mb-4'>
						{operation === 'MINT' ? (
							<>
								<div className='mb-2 text-center'>
									<Badge>
										1 {nest.symbol} = <FontAwesomeIcon icon={faEthereum} /> {rates && getDisplayBalance(rates.eth)}
										{' = $'}
										{rates && getDisplayBalance(rates.dai)}
									</Badge>
								</div>
								<div className='mt-4 flex gap-2 rounded-3xl bg-pollyWhite/5 p-4'>
									<Icon icon='warning' className='m-0 h-6 w-6 flex-none' />
									<Typography variant='sm' className='m-0 pr-1'>
										There will be an extra 2% of the cost included to account for slippage. Any unused tokens will be returned as part of
										the mint transaction.
									</Typography>
								</div>
							</>
						) : (
							<div className='rounded-3xl bg-pollyWhite/5 p-4'>
								<div className='mt-4 flex gap-2'>
									<Icon icon='warning' className='m-0 h-6 w-6 flex-none' />
									<Typography variant='sm' className='m-0 pr-1'>
										When you redeem {nest.name}, you will receive the underlying tokens. Alternatively, you can swap {nest.name}{' '}
										<a href={`${swapLink}`} target='blank' className='font-bold hover:text-pollyGreen'>
											here <FontAwesomeIcon size='xs' icon={faExternalLinkAlt} />
										</a>
										.
									</Typography>
								</div>
								<div className='m-auto px-2 pt-2 text-center'>
									<Badge>Slippage may occur on swaps!</Badge>
								</div>
							</div>
						)}
					</div>
					<div className='flex w-full flex-col'>
						<div className='flex h-full flex-col items-center justify-center'>
							<div className='flex w-full flex-row'>
								<div className='float-right mb-1 flex w-full items-center justify-end gap-1'>
									<Typography variant='sm' className='font-semibold text-pollyGreen'>
										Balance:
									</Typography>
									<Typography variant='sm'>
										{operation === 'MINT'
											? `${wethBalance && getDisplayBalance(wethBalance)} WETH`
											: `${nestBalance && getDisplayBalance(nestBalance)} ${nest.symbol}`}
									</Typography>
								</div>
							</div>
							<Input
								value={val}
								onChange={e => setVal(e.currentTarget.value)}
								onSelectMax={() => setVal(formatUnits(nestBalance, 18))}
								disabled={operation === 'MINT'}
								label={
									<div className='flex flex-row items-center rounded-r-3xl bg-pollyBlack'>
										<div className='flex flex-row items-center rounded-r-3xl bg-pollyBlack pl-2 pr-4'>
											<div className='flex w-6 justify-center'>
												{operation === 'MINT' ? (
													<Image src={`/images/tokens/WETH.png`} width={32} height={32} alt='WETH' />
												) : (
													<Image src={`/images/tokens/${nest.symbol}.png`} width={32} height={32} alt={nest.symbol} />
												)}
											</div>
										</div>
									</div>
								}
							/>
							{operation === 'MINT' && rates && (
								<>
									<br />
									<Input
										value={secondaryVal}
										onChange={e => {
											try {
												parseUnits(e.currentTarget.value)
											} catch {
												setVal('')
												setSecondaryVal('')
												return
											}
											// Seek to mint 98% of total val (use remaining 2% as slippage protection)
											const inputVal = decimate(BigNumber.from(rates.eth).mul(parseUnits(e.currentTarget.value))).mul(parseUnits('1.02'))
											setSecondaryVal(e.currentTarget.value)
											setVal(formatUnits(decimate(inputVal)))
										}}
										onSelectMax={() => {
											// Seek to mint 98% of total val (use remaining 2% as slippage protection)
											const usedBal = wethBalance
											const usedRate = rates.eth
											// Seek to mint 98% of total val (use remaining 2% as slippage protection)
											const maxVal = usedBal.mul(parseUnits('0.98')).div(usedRate)
											setSecondaryVal(formatUnits(maxVal))
											setVal(formatUnits(usedBal))
										}}
										label={
											<div className='flex flex-row items-center rounded-r-3xl bg-pollyBlack pl-2 pr-4'>
												<div className='flex w-6 justify-center'>
													<Image
														src={`/images/tokens/${nest.symbol}.png`}
														width={32}
														height={32}
														alt={nest.symbol}
														className='block h-6 w-6 align-middle'
													/>
												</div>
											</div>
										}
									/>
								</>
							)}
						</div>
					</div>
				</Modal.Body>
				<Modal.Actions>
					{pendingTx ? (
						<a href={`https://polygonscan.io/tx/${txHash}`} target='_blank' aria-label='View Transaction on Etherscan' rel='noreferrer'>
							<Button fullWidth className='!rounded-full'>
								<PendingTransaction /> Pending Transaction
								<FontAwesomeIcon icon={faExternalLink} className='ml-2 text-pollyGreen' />
							</Button>
						</a>
					) : (
						<Button fullWidth disabled={isButtonDisabled || val === '0'} onClick={handleOperation}>
							{operation === 'MINT' && wethAllowance && (wethAllowance.eq(0) || wethAllowance.lt(parseUnits(val)))
								? 'Approve DAI'
								: !val
								? 'Enter a Value'
								: isButtonDisabled
								? 'Invalid Input'
								: operation === 'MINT'
								? `Mint ${(secondaryVal && getDisplayBalance(secondaryVal, 0)) || 0} ${nest.symbol}`
								: `Redeem ${(val && getDisplayBalance(val, 0)) || 0} ${nest.symbol}`}
						</Button>
					)}
				</Modal.Actions>
			</Modal>
		</>
	) : (
		<></>
	)
}

export default NestModal
