import { Web3Provider } from '@ethersproject/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import {
	NoEthereumProviderError,
	UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import { injected, network } from 'bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from 'bao/lib/hooks'
import { Button, CloseButton } from 'components/Button'
import Loader from 'components/Loader'
import React, { useCallback, useEffect, useState } from 'react'
import { Modal, ModalProps } from 'react-bootstrap'
import styled from 'styled-components'

const connectorsByName: { [name: string]: AbstractConnector } = {
	Injected: injected,
	Network: network
}

function getErrorMessage(error: Error) {
	if (error instanceof NoEthereumProviderError) {
		return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network."
	} else if (error instanceof UserRejectedRequestErrorInjected) {
		return 'Please authorize this website to access your Ethereum account.'
	} else {
		console.error(error)
		return 'An unknown error occurred. Check the console for more details.'
	}
}

const WalletProviderModal = ({ onHide, show }: ModalProps) => {
	const context = useWeb3React<Web3Provider>()
	const {
		connector,
		library,
		chainId,
		account,
		activate,
		deactivate,
		active,
		error,
	} = context

	// handle logic to recognize the connector currently being activated
	const [activatingConnector, setActivatingConnector] = useState<any>()
	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	// handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
	useInactiveListener(!triedEager || !!activatingConnector)

	useEffect(() => {
		if (account && active) {
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
						<Button
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
							<div
								style={{
									position: 'absolute',
									top: '0',
									left: '0',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									color: 'black',
									margin: '0 0 0 1rem',
								}}
							>
								{activating && ('Connecting...')}
								{connected && (
									<span role="img" aria-label="check">
										✅
									</span>
								)}
							</div>
							{name}
						</Button>
					)
				})}
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
