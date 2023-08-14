import Config from '@/bao/lib/config'
import { coinbaseWallet, injected, walletConnect } from '@/bao/lib/connectors'
import Button from '@/components/Button'
import { MetaMaskInpageProvider } from '@metamask/providers'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/future/image'
import { FC, useEffect, useState } from 'react'
import Modal from '../Modal'
import Typography from '../Typography'

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider
	}
}

const connectorsByName: { [name: string]: AbstractConnector } = {
	Metamask: injected,
	'Coinbase Wallet': coinbaseWallet,
	WalletConnect: walletConnect,
}

interface WalletProviderModalProps {
	show: boolean
	onHide: () => void
}

const WalletProviderModal: FC<WalletProviderModalProps> = ({ show, onHide }) => {
	const { connector, chainId, account, activate, active, error } = useWeb3React()

	const [activatingConnector, setActivatingConnector] = useState<AbstractConnector>()

	useEffect(() => {
		// FIXME: need to change this when the frontend is multichain like sushi
		if (account && chainId === Config.networkId && show) {
			onHide()
		}
	}, [account, chainId, onHide, show])

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
			setActivatingConnector(undefined)
		}
	}, [activatingConnector, connector])

	useEffect(() => {
		if (account && active && show) {
			onHide()
		}
	}, [account, active, onHide, show])

	if (window.ethereum && window.ethereum.chainId !== Config.defaultRpc.chainId) {
		window.ethereum
			.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: Config.defaultRpc.chainId }],
			})
			.catch((error: any) => {
				if (error.code === 4902) {
					window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [Config.defaultRpc],
					})
				}
			})
	}

	return (
		<Modal isOpen={show} onDismiss={onHide}>
			<Modal.Header header='Select a wallet provider' onClose={onHide} />
			<Modal.Actions>
				{Object.keys(connectorsByName).map(name => {
					const currentConnector = connectorsByName[name]
					const activating = currentConnector === activatingConnector
					const connected = currentConnector === connector
					const disabled = connected || !!error

					return (
						<Button
							fullWidth
							size='md'
							disabled={disabled}
							key={name}
							onClick={() => {
								setActivatingConnector(currentConnector)
								activate(connectorsByName[name], error => {
									if (error) {
										setActivatingConnector(undefined)
									}
								})
							}}
						>
							<div className='flex h-full items-center'>
								<Image className='inline-block' src={`/images/wallets/${name}.png`} alt={name} width={32} height={32} />
								<Typography variant='lg' className='ml-2 inline-block'>
									{activating ? 'Connecting...' : `${name}`}
								</Typography>
							</div>
						</Button>
					)
				})}
			</Modal.Actions>
		</Modal>
	)
}

export default WalletProviderModal
