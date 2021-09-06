import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pollyIcon from 'assets/img/logo.svg'
import wethIcon from 'assets/img/assets/WETH.png'
import { getPollyAddress } from 'bao/utils'
import useBao from 'hooks/useBao'
import useTokenBalance from 'hooks/useTokenBalance'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getBalanceNumber, getDisplayBalance } from 'utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import { Col, Row } from 'react-bootstrap'
import { addressMap } from '../../../bao/lib/constants'
import { BigNumber } from 'bignumber.js'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
	const { account, reset } = useWallet()

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const bao = useBao()
	const baoBalance = useTokenBalance(getPollyAddress(bao))
	const wethBalance = useTokenBalance(addressMap.WETH)

	return (
		<Modal>
			<CloseButton onClick={onDismiss}>
				<FontAwesomeIcon icon="window-close" />
			</CloseButton>
			<ModalTitle text="My Account" />
			<ModalContent>
				<Row lg={2}>
					<Col>
						<StyledBalanceWrapper>
							<CardIcon>
								<span>
									<img src={wethIcon} height={50} />
								</span>
							</CardIcon>
							<StyledBalance>
								<Value value={new BigNumber(getDisplayBalance(wethBalance)).toFixed(4)} />
								<Label text="WETH Balance" />
							</StyledBalance>
						</StyledBalanceWrapper>
					</Col>
					<Col>
						<StyledBalanceWrapper>
							<CardIcon>
								<span>
									<img src={pollyIcon} height={50} />
								</span>
							</CardIcon>
							<StyledBalance>
								<Value value={new BigNumber(getDisplayBalance(baoBalance)).toFixed(4)} />
								<Label text="POLLY Balance" />
							</StyledBalance>
						</StyledBalanceWrapper>
					</Col>
				</Row>

				<Spacer />
				<Button
					href={`https://polygonscan.com/address/${account}`}
					text="View on Polygonscan"
				/>
				<Spacer />
				<Button onClick={handleSignOutClick} text="Sign out" />
			</ModalContent>
		</Modal>
	)
}

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

const StyledBalanceWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;

	@media ( max-width: 576px ) {
		flex-direction: row;
	}
`

export const CloseButton = styled.a`
	float: right;
	top: 15px;
	right: 25px;
	font-size: 24px;
	position: absolute;
	color: ${(props) => props.theme.color.grey[100]};

	&:hover {
		cursor: pointer;
	}
`

export default AccountModal
