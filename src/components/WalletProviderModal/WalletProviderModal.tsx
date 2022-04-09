import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { coinbaseWallet, injected, walletConnect } from 'bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from 'bao/lib/hooks'
import { Button, CloseButton } from 'components/Button'
import { WalletButton } from 'components/Button/Button'
import React, { useCallback, useEffect, useState } from 'react'
import { Col, Modal, ModalProps, Row } from 'react-bootstrap'
import styled from 'styled-components'

const connectorsByName: { [name: string]: AbstractConnector } = {
	Metamask: injected,
	CoinbaseWallet: coinbaseWallet,
	WalletConnect: walletConnect,
}

const WalletProviderModal = ({ onHide, show }: ModalProps) => {
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error,
	} = useWeb3React()

	useEffect(() => {
		if (account && chainId === Config.networkId) {
			onHide()
		}
	}, [account, onHide])

	const [activatingConnector, setActivatingConnector] = useState<any>()

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	const triedEager = useEagerConnect()

	useInactiveListener(!triedEager || !!activatingConnector)

	useEffect(() => {
		if (account && active) {
			onHide()
		}
	}, [account, onHide])

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	if (
		window.ethereum &&
		window.ethereum.chainId !== Config.defaultRpc.chainId
	) {
		try {
			window.ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: Config.defaultRpc.chainId }],
			})
		} catch (error) {
			if (error.code === 4902) {
				window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [Config.defaultRpc],
				})
			}
		}
	}

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide} onHide={hideModal} />
			<Modal.Header>
				<Modal.Title>Select a wallet provider.</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{Object.keys(connectorsByName).map((name) => {
					const currentConnector = connectorsByName[name]
					const activating = currentConnector === activatingConnector
					const connected = currentConnector === connector
					const disabled =
						!triedEager || !!activatingConnector || connected || !!error

					return (
						<WalletButton
							disabled={disabled}
							key={name}
							onClick={() => {
								setActivatingConnector(currentConnector)
								activate(connectorsByName[name], (error) => {
									if (error) {
										setActivatingConnector(undefined)
									}
								})
							}}
						>
							<Row>
								<Col>
									<ConnectorIconContainer>
										<img
											src={`${name}.png`}
											style={{
												height: '24px',
												marginRight: '0.75rem',
												verticalAlign: 'middle',
											}}
										/>
									</ConnectorIconContainer>
									{activating ? 'Connecting...' : `${name}`}
								</Col>
							</Row>
						</WalletButton>
					)
				})}
			</Modal.Body>

			<Modal.Footer>
				<Button text="Cancel" variant="secondary" onClick={onHide} />
			</Modal.Footer>
		</Modal>
	)
}

export const ConnectorIconContainer = styled.div`
	height: 100%;
	align-items: center;
	margin: 0 auto;
	display: inline-block;
	vertical-align: middle;
	color: ${(props) => props.theme.color.text[100]};

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		display: none;
	}
`

export default WalletProviderModal
