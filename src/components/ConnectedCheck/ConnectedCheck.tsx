import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Config from 'bao/lib/config'
import { Button } from 'components/Button'
import WalletProviderModal from 'components/WalletProviderModal'
import React, { useState } from 'react'
import { useWallet } from 'use-wallet'

const ConnectedCheck: React.FC = ({ children }) => {
	const { account, ethereum }: any = useWallet()
	const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)

	return account && ethereum.chainId === Config.defaultRpc.chainId ? (
		<>{children}</>
	) : (
		<>
			<div style={{ width: '350px', margin: 'auto', padding: '12px' }}>
				<Button onClick={() => setShowWalletProviderModal(true)}>
					<FontAwesomeIcon icon="wallet" style={{ marginRight: '5px' }} />{' '}
					Connect Wallet to Enter App
				</Button>
			</div>

			<WalletProviderModal
				show={showWalletProviderModal}
				onHide={() => setShowWalletProviderModal(false)}
			/>
		</>
	)
}

export default ConnectedCheck
