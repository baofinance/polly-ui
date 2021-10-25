import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber } from 'bignumber.js'
import useModal from 'hooks/useModal'
import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Config from '../../../bao/lib/config'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getDisplayBalance } from '../../../utils/numberFormat'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
	const [onPresentAccountModal] = useModal(<AccountModal />)
	const [onPresentWalletProviderModal] = useModal(
		<WalletProviderModal />,
		'provider',
	)

	const { account } = useWallet()
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

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
								<FontAwesomeIcon
									icon="link"
									style={{
										marginLeft: '4px',
									}}
								/>
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
								{' '}
								<FontAwesomeIcon
									icon="angle-double-right"
									style={{
										margin: '0 4px',
										color: 'white',
									}}
								/>{' '}
								{new BigNumber(getDisplayBalance(wethBalance)).toFixed(4)}
								<FontAwesomeIcon
									icon={['fab', 'ethereum']}
									style={{
										marginLeft: '4px',
									}}
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
								<FontAwesomeIcon
									icon="link"
									style={{
										marginLeft: '4px',
									}}
								/>
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
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		display: none;
	}
`

const MobileAccountButton = styled.div`
	@media (min-width: ${(props) => props.theme.breakpoints.mobile}px) {
		display: none;
	}
`

export default AccountButton
