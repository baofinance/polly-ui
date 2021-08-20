import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pollyIcon from 'assets/img/logo.svg'
import { getPollyAddress } from 'bao/utils'
import useBao from 'hooks/useBao'
import useTokenBalance from 'hooks/useTokenBalance'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getBalanceNumber } from 'utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
	const { account, reset } = useWallet()

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const bao = useBao()
	const baoBalance = useTokenBalance(getPollyAddress(bao))

	return (
		<Modal>
			<CloseButton onClick={onDismiss}>
				<FontAwesomeIcon icon="window-close" />
			</CloseButton>
			<ModalTitle text="My Account" />
			<ModalContent>
				<Spacer />

				<div style={{ display: 'flex' }}>
					<StyledBalanceWrapper>
						<CardIcon>
							<span>
								<img src={pollyIcon} height={50} />
							</span>
						</CardIcon>
						<StyledBalance>
							<Value value={getBalanceNumber(baoBalance)} />
							<Label text="POLLY Balance" />
						</StyledBalance>
					</StyledBalanceWrapper>
				</div>

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
