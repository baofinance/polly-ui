import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'bignumber.js'
import React, { useMemo, useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import Config from '../../../../bao/lib/config'
import { ActiveSupportedNest } from '../../../../bao/lib/types'
import { StyledBadge } from '../../../../components/Badge'
import { BalanceWrapper } from '../../../../components/Balance'
import { Button } from '../../../../components/Button'
import { BalanceInput } from '../../../../components/Input'
import { LabelEnd, LabelStart } from '../../../../components/Label'
import { ExternalLink } from '../../../../components/Link'
import useBao from '../../../../hooks/base/useBao'
import useTokenBalance from '../../../../hooks/base/useTokenBalance'
import useTransactionHandler from '../../../../hooks/base/useTransactionHandler'
import useNestRates from '../../../../hooks/baskets/useNestRate'
import {
	decimate,
	exponentiate,
	getDisplayBalance,
} from '../../../../utils/numberFormat'
import {
	AssetLabel,
	AssetStack,
	CloseButton,
	HeaderWrapper,
	IconFlex,
	LabelStack,
	MaxLabel,
	ModalStack,
} from '../styles'

type ModalProps = {
	nest: ActiveSupportedNest
	operation: string
	show: boolean
	hideModal: () => void
}

// TODO: Make the NestModal a modular component that can work with different recipes and different input tokens.
const NestModal: React.FC<ModalProps> = ({
	nest,
	operation,
	show,
	hideModal,
}) => {
	const [value, setValue] = useState<string | undefined>()
	const [secondaryValue, setSecondaryValue] = useState<string | undefined>()

	const bao = useBao()
	const { handleTx, pendingTx } = useTransactionHandler()
	const { account } = useWeb3React()
	const rates = useNestRates(nest && nest.nestAddress)

	// Get Nest balances
	const nestBalance = useTokenBalance(nest && nest.nestAddress)
	const ethBalance = useTokenBalance(Config.addressMap.WETH)

	const swapLink = nest && nest.swap

	const handleOperation = () => {
		let tx
		const recipe = bao.getContract('recipe')

		switch (operation) {
			case 'MINT':
				tx = recipe.methods
					.toNest(nest.address, exponentiate(secondaryValue).toFixed(0))
					.send({
						from: account,
						value: exponentiate(value).toFixed(0),
					})

				handleTx(
					tx,
					`Mint ${getDisplayBalance(secondaryValue, 0) || 0} ${nest.symbol}`,
					() => hide(),
				)
				break
			case 'REDEEM':
				tx = nest.nestContract.methods
					.exitPool(exponentiate(value).toFixed(0))
					.send({
						from: account,
					})

				handleTx(
					tx,
					`Redeem ${getDisplayBalance(new BigNumber(value), 0)} ${nest.symbol}`,
					() => hide(),
				)
		}
	}

	const isButtonDisabled = useMemo(
		() =>
			pendingTx !== false /* can be string | boolean */ ||
			!value ||
			!value.match(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/) ||
			new BigNumber(value).lte(0) ||
			new BigNumber(value).gt(
				decimate(operation === 'MINT' ? ethBalance : nestBalance),
			),
		[value, operation, pendingTx],
	)

	const hide = () => {
		hideModal()
		setValue(undefined)
		setSecondaryValue(undefined)
	}

	return nest ? (
		<>
			<Modal show={show} onHide={hide} centered>
				<CloseButton onClick={hide}>
					<FontAwesomeIcon icon="times" />
				</CloseButton>
				<Modal.Header>
					<Modal.Title id="contained-modal-title-vcenter">
						<HeaderWrapper>
							<p>
								{operation === 'MINT' ? 'Mint' : 'Redeem'} {nest.symbol}
							</p>
							<img src={nest.icon} />
						</HeaderWrapper>
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{operation === 'MINT' ? (
						<>
							<div style={{ display: 'flex' }}>
								<StyledBadge style={{ margin: 'auto' }}>
									1 {nest.symbol} ={' '}
									<FontAwesomeIcon icon={['fab', 'ethereum']} />{' '}
									{rates && getDisplayBalance(rates.wethPerIndex)}
								</StyledBadge>
							</div>
							<br />
							<div style={{ textAlign: 'center' }}>
								<b style={{ fontWeight: 'bold' }}>NOTE:</b> An extra 2% of the
								mint cost will be included to account for slippage. Any unused
								input tokens will be returned in the mint transaction.
							</div>
						</>
					) : (
						<div style={{ textAlign: 'center' }}>
							<b style={{ fontWeight: 'bold' }}>NOTE:</b> When you redeem{' '}
							{nest.name}, you will receive the underlying tokens. Otherwise,
							you can swap {nest.name}{' '}
							<a
								href={`${swapLink}`}
								target="blank"
								style={{ fontWeight: 700 }}
							>
								here
							</a>
							. (<b style={{ fontWeight: 'bold' }}>CAUTION:</b> Slippage may
							apply on swaps)
						</div>
					)}
					<ModalStack>
						<BalanceWrapper>
							<Col xs={4}>
								<LabelStart />
							</Col>
							<Col xs={8}>
								<LabelEnd>
									<LabelStack>
										<MaxLabel>{`Available:`}</MaxLabel>
										<AssetLabel>
											{operation === 'MINT'
												? `${ethBalance && decimate(ethBalance).toFixed(4)} ETH`
												: `${nestBalance && decimate(nestBalance).toFixed(4)} ${
														nest.symbol
												  }`}
										</AssetLabel>
									</LabelStack>
								</LabelEnd>
							</Col>
						</BalanceWrapper>
						<Row>
							<Col xs={12}>
								<BalanceInput
									value={value}
									onChange={(e) => setValue(e.currentTarget.value)}
									onMaxClick={() => setValue(decimate(nestBalance).toFixed(18))}
									disabled={operation === 'MINT'}
									label={
										<AssetStack>
											<IconFlex>
												{operation === 'MINT' ? (
													<img src={`/WETH.png`} />
												) : (
													<img src={nest.icon} />
												)}
											</IconFlex>
										</AssetStack>
									}
								/>
								{operation === 'MINT' && rates && (
									<>
										<br />
										<BalanceInput
											value={secondaryValue}
											onChange={(e) => {
												const inputVal = decimate(rates.wethPerIndex)
													.times(e.currentTarget.value)
													.times(1.02)
												setSecondaryValue(e.currentTarget.value)
												setValue(
													inputVal.isFinite() ? inputVal.toFixed(18) : '0', // Pad an extra 2% ETH. It will be returned to the user if it is not used.
												)
											}}
											onMaxClick={() => {
												// Seek to mint 98% of total value (use remaining 2% as slippage protection)
												const usedBal = decimate(ethBalance)
												const usedRate = rates.wethPerIndex

												const maxVal = usedBal.times(0.98)
												setSecondaryValue(
													maxVal.div(decimate(usedRate)).toFixed(18),
												)
												setValue(usedBal.toString())
											}}
											label={
												<AssetStack>
													<IconFlex>
														<img src={nest.icon} />
													</IconFlex>
												</AssetStack>
											}
										/>
									</>
								)}
							</Col>
						</Row>
					</ModalStack>
				</Modal.Body>
				<Modal.Footer>
					<Button disabled={isButtonDisabled} onClick={handleOperation}>
						{pendingTx ? (
							typeof pendingTx === 'string' ? (
								<ExternalLink
									href={`${Config.defaultRpc.blockExplorerUrls[0]}/tx/${pendingTx}`}
									target="_blank"
								>
									Pending Transaction{' '}
									<FontAwesomeIcon icon="external-link-alt" />
								</ExternalLink>
							) : (
								'Pending Transaction'
							)
						) : operation === 'MINT' ? (
							`Mint ${getDisplayBalance(secondaryValue, 0) || 0} ${nest.symbol}`
						) : (
							`Redeem ${getDisplayBalance(value, 0) || 0} ${nest.symbol}`
						)}
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	) : (
		<></>
	)
}

export default NestModal
