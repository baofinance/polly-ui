import { parseAndCheckHttpResponse } from '@apollo/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import wethIcon from 'assets/img/assets/WETH.png'
import baoIcon from 'assets/img/logo.svg'
import Config from 'bao/lib/config'
import { BigNumber } from 'bignumber.js'
import { MaxLabel } from 'components/Label/Label'
import { SpinnerLoader } from 'components/Loader'
import { StatText, StatWrapper } from 'components/Stats'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import _ from 'lodash'
import React, { useCallback } from 'react'
import { Col, Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/numberFormat'
import { Button, CloseButton } from '../../Button'
import Spacer from '../../Spacer'

const AccountModal = ({ onHide, show }: ModalProps) => {
	const { account, deactivate } = useWeb3React()

	const handleSignOutClick = useCallback(() => {
		onHide!()
		deactivate()
	}, [onHide, deactivate])

	const { transactions } = useTransactionProvider()
	const pollyBalance = useTokenBalance(Config.addressMap.POLLY)
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onHide={hideModal} onClick={onHide} />
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<p>My Account</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<WalletBalances>
					<WalletBalancesInner>
						<WalletBalance>
							<InnerWalletBalance>
								<InnerInnerWalletBalance>
									<WalletBalanceImage>
										<img src={wethIcon} alt="wETH" />
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
										<img src={baoIcon} alt="BAO" />
									</WalletBalanceImage>
									<WalletBalanceSpace />
									<WalletBalanceText>
										<WalletBalanceValue>
											{getDisplayBalance(pollyBalance)}
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
										<ClearButton
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
										</ClearButton>
									</span>
								</small>
							)}
						</span>
						<Spacer size="md" />
						{Object.keys(transactions).length > 0 ? (
							<>
								{_.reverse(Object.keys(transactions))
									.slice(0, 5)
									.map((txHash) => (
										<StatText key={txHash}>
											<MaxLabel>
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
											</MaxLabel>
											<MaxLabel style={{ textAlign: 'end' }}>
												{transactions[txHash].description}
											</MaxLabel>
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

const ClearButton = styled.button`
	float: right;
	vertical-align: middle;
	background-color: ${(props) => props.theme.color.transparent[200]} !important;
	border-radius: 8px;
	border: none;
	color: ${(props) => props.theme.color.text[100]};
`

export default AccountModal
