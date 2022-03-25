import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import wethIcon from 'assets/img/assets/WETH.png'
import baoIcon from 'assets/img/logo.svg'
import Config from 'bao/lib/config'
import { BigNumber } from 'bignumber.js'
import { SpinnerLoader } from 'components/Loader'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import _ from 'lodash'
import React, { useCallback } from 'react'
import { Col, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/numberFormat'
import { MaxLabel } from 'views/Farms/components/Actions'
import { Button } from '../../Button'
import Spacer from '../../Spacer'

const AccountModal = ({ onHide, show }: ModalProps) => {
	const { account, deactivate } = useWeb3React()

	const handleSignOutClick = useCallback(() => {
		onHide!()
		deactivate()
	}, [onHide, deactivate])

	const { transactions } = useTransactionProvider()
	const bao = useBao()
	const pollyBalance = useTokenBalance(Config.addressMap.POLLY)
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide}>
				<FontAwesomeIcon icon="times" />
			</CloseButton>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<HeaderWrapper>
						<p>My Account</p>
					</HeaderWrapper>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<WalletBalances>
					<WalletBalancesInner>
						<WalletBalance>
							<InnerWalletBalance>
								<InnerInnerWalletBalance>
									<WalletBalanceImage>
										<img src={wethIcon} />
									</WalletBalanceImage>
									<WalletBalanceSpace />
									<WalletBalanceText>
										<WalletBalanceValue>
											{new BigNumber(getDisplayBalance(wethBalance)).toFixed(4)}
										</WalletBalanceValue>
										<WalletBalanceTicker>wETH Balance</WalletBalanceTicker>
									</WalletBalanceText>
								</InnerInnerWalletBalance>
							</InnerWalletBalance>
						</WalletBalance>
						<WalletBalanceSpacerBig />
						<WalletBalance>
							<InnerWalletBalance>
								<InnerInnerWalletBalance>
									<WalletBalanceImage>
										<img src={baoIcon} />
									</WalletBalanceImage>
									<WalletBalanceSpace />
									<WalletBalanceText>
										<WalletBalanceValue>
											{new BigNumber(getDisplayBalance(pollyBalance)).toFixed(
												4,
											)}
										</WalletBalanceValue>
										<WalletBalanceTicker>POLLY Balance</WalletBalanceTicker>
									</WalletBalanceText>
								</InnerInnerWalletBalance>
							</InnerWalletBalance>
						</WalletBalance>
					</WalletBalancesInner>
				</WalletBalances>
				<>
					<Spacer size="sm" />
					<StatWrapper>
						<span>
							<span style={{ float: 'left', fontSize: '0.875rem' }}>
								Recent Transactions
							</span>
							{Object.keys(transactions).length > 0 && (
								<small>
									<span>
										<a
											href="#"
											style={{ float: 'right', verticalAlign: 'middle' }}
											onClick={() => {
												localStorage.setItem('transactions', '{}')
												window.location.reload()
											}}
										>
											<FontAwesomeIcon
												icon="times"
												style={{ verticalAlign: 'middle' }}
											/>{' '}
											Clear
										</a>
									</span>
								</small>
							)}
						</span>
						<Spacer size="sm" />
						{Object.keys(transactions).length > 0 ? (
							<>
								{_.reverse(Object.keys(transactions))
									.slice(0, 5)
									.map((txHash) => (
										<StatText>
											<p>
												{transactions[txHash].receipt ? (
													<FontAwesomeIcon
														icon="check"
														style={{
															color: 'green',
														}}
													/>
												) : (
													<SpinnerLoader />
												)}
											</p>
											<p style={{ textAlign: 'end' }}>
												{transactions[txHash].description}
											</p>
										</StatText>
									))}
							</>
						) : (
							<StatText>
								<MaxLabel>
									Your completed transactions will show here...
								</MaxLabel>
							</StatText>
						)}
					</StatWrapper>
				</>
			</Modal.Body>
			<Modal.Footer>
				<Button
					href={`${Config.defaultRpc.blockExplorerUrls[0]}/address/${account}`}
					text="View on Explorer"
				/>
				<Button onClick={handleSignOutClick} text="Sign out" />
			</Modal.Footer>
		</Modal>
	)
}

const WalletBalances = styled(Col)`
	display: flex;
	padding: 24px;
`

const WalletBalancesInner = styled.div`
	display: flex;
	width: 100%;
`

const WalletBalance = styled.div`
	flex: 1 1 0%;
	display: block;
`

const InnerWalletBalance = styled.div`
	display: flex;
	justify-content: center;
`

const InnerInnerWalletBalance = styled.div`
	-webkit-box-align: center;
	align-items: center;
	display: flex;
`

const WalletBalanceImage = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	min-width: 48px;
	min-height: 48px;
	border-radius: 40px;
	background-color: ${(props) => props.theme.color.primary[200]};

	img {
		height: 34px;
		text-align: center;
		min-width: 34px;
		margin: auto;
	}
`

const WalletBalanceSpace = styled.div`
	height: 8px;
	min-height: 8px;
	min-width: 8px;
	width: 8px;
`

const WalletBalanceSpacerBig = styled.div`
	height: 24px;
	min-height: 24px;
	min-width: 24px;
	width: 24px;
`

const WalletBalanceText = styled.div`
	display: block;
	flex: 1 1 0%;
`

const WalletBalanceValue = styled.div`
	font-size: 24px;
	font-weight: 700;
`

const WalletBalanceTicker = styled.div`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 0.875rem;
`

const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	min-width: 6rem;
	font-size: ${(props) => props.theme.fontSize.large};

	img {
		vertical-align: middle;
		height: 2rem;
		width: 2rem;
	}

	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin: 0px;
		margin-top: 0px;
		margin-inline: 0.5rem 0.5rem;
		margin-bottom: 0px;
		color: ${(props) => props.theme.color.text[100]};
		font-weight: ${(props) => props.theme.fontWeight.medium};
	}
`

export const CloseButton = styled.a`
	float: right;
	top: ${(props) => props.theme.spacing[3]}px;
	right: ${(props) => props.theme.spacing[4]}px;
	font-size: 1.5rem;
	position: absolute;
	color: ${(props) => props.theme.color.text[100]};
	&:hover {
		cursor: pointer;
	}
`

const StatWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: ${(props) => props.theme.spacing[2]};
	margin-inline: 0px;
	margin-bottom: 0px;
	background: ${(props) => props.theme.color.transparent[100]};
	padding: 16px;
	border-radius: 8px;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		padding: 15px 30px;
	}
`

const StatText = styled.div`
	transition-property: all;
	transition-duration: 200ms;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	font-size: ${(props) => props.theme.fontSize.sm};
	padding-top: ${(props) => props.theme.spacing[1]}px;
	padding-bottom: ${(props) => props.theme.spacing[1]}px;
	padding-left: ${(props) => props.theme.spacing[2]}px;
	padding-right: ${(props) => props.theme.spacing[2]}px;
	border-radius: 8px;

	p {
		color: ${(props) => props.theme.color.text[100]};
		font-size: ${(props) => props.theme.fontSize.sm};
		font-weight: ${(props) => props.theme.fontWeight.medium};
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin: 0px;
		margin-top: 0px;
		margin-inline: 0.5rem 0px;
		margin-bottom: 0px;
	}
`

export default AccountModal
