import metamaskLogo from 'assets/img/metamask-fox.svg'
import { CloseButton, Button } from 'components/Button'
import React, { useCallback, useEffect } from 'react'
import { Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Config from 'bao/lib/config'
import WalletCard from './components/WalletCard'

const WalletProviderModal = ({ onHide, show }: ModalProps) => {
	const { account, ethereum, connect }: any = useWallet()

	useEffect(() => {
		if (account && ethereum.chainId === Config.defaultRpc.chainId) {
			onHide()
		}
	}, [account, onHide])

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide} onHide={hideModal} />
			<Modal.Header>
				<Modal.Title>
						Select a wallet provider.
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<StyledWalletsWrapper>
					<StyledWalletCard>
						<WalletCard
							icon={<img src={metamaskLogo} style={{ height: 32 }} />}
							onConnect={() => connect('injected')}
							title="Metamask"
						/>
					</StyledWalletCard>
				</StyledWalletsWrapper>
			</Modal.Body>

			<Modal.Footer>
				<Button text="Cancel" variant="secondary" onClick={onHide} />
			</Modal.Footer>
		</Modal>
	)
}

const StyledWalletsWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		height: 100vh;
		overflow-y: scroll;
	}
	@media (max-width: ${(props) => props.theme.breakpoints.md}px) {
		flex-direction: column;
		flex-wrap: none;
	}
`

const StyledWalletCard = styled.div`
	flex-basis: calc(50% - ${(props) => props.theme.spacing[2]}px);
`

export default WalletProviderModal
