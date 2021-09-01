import useModal from 'hooks/useModal'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { addressMap } from '../../../bao/lib/constants'
import { getDisplayBalance } from '../../../utils/formatBalance'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
	const [onPresentAccountModal] = useModal(<AccountModal />)
	const [onPresentWalletProviderModal] = useModal(
		<WalletProviderModal />,
		'provider',
	)

	const { account } = useWallet()
	const wethBalance = useTokenBalance(addressMap.WETH)

	const handleUnlockClick = useCallback(() => {
		onPresentWalletProviderModal()
	}, [onPresentWalletProviderModal])

	return (
		<>
			<StyledAccountButton>
				{!account ? (
					<Button
						onClick={handleUnlockClick}
						size="sm"
						text={
							<>
								Connect Wallet{' '}
								<FontAwesomeIcon icon="link" style={{ marginLeft: '5px' }} />
							</>
						}
						border={true}
					/>
				) : (
					<Button
						onClick={onPresentAccountModal}
						size="sm"
						text={
							<>
								{account.slice(0, 6)}...
								{account.slice(account.length - 4, account.length)}
								<FontAwesomeIcon
									icon="angle-double-right"
									style={{ margin: '0 5px', color: '  color: ${(props) => props.theme.color.grey[100]};' }}
								/>
								{getDisplayBalance(wethBalance)}
								<FontAwesomeIcon
									icon={['fab', 'ethereum']}
									style={{ marginLeft: '5px' }}
								/>
							</>
						}
						border={true}
					/>
				)}
			</StyledAccountButton>

			<MobileAccountButton>
				{!account ? (
					<Button
						onClick={handleUnlockClick}
						size="sm"
						text={
							<>
								Connect Wallet{' '}
								<FontAwesomeIcon icon="link" style={{ marginLeft: '5px' }} />
							</>
						}
						border={true}
					/>
				) : (
					<Button
						onClick={onPresentAccountModal}
						size="sm"
						text={
							<>
								{account.slice(0, 6)}...
								{account.slice(account.length - 4, account.length)}
							</>
						}
						border={true}
					/>
				)}
			</MobileAccountButton>
		</>
	)
}

const StyledAccountButton = styled.div`
	@media (max-width: 576px) {
		display: none;
	}
`

const MobileAccountButton = styled.div`
	@media (min-width: 576px) {
		display: none;
	}
`

export default AccountButton
