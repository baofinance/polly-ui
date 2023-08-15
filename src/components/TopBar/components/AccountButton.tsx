import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { BigNumber } from 'bignumber.js'
import { ethers } from 'ethers'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/numberFormat'
import { Button } from '../../Button'
import { SpinnerLoader } from '../../Loader'
import WalletProviderModal from '../../WalletProviderModal'
import AccountModal from './AccountModal'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
	const [showAccountModal, setShowAccountModal] = useState(false)
	const [showWalletProviderModal, setShowWalletProviderModal] = useState(false)
	const [ens, setEns] = useState<string | undefined>()

	const { transactions } = useTransactionProvider()
	const { account } = useWeb3React()
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

	const ensResolver = new ethers.providers.JsonRpcProvider(
		'https://eth.public-rpc.com',
	)
	useEffect(() => {
		if (!account) return

		ensResolver.lookupAddress(account).then((_ens) => {
			if (_ens) setEns(_ens)
		})
	}, [account])

	const pendingTxs = useMemo(
		() =>
			Object.keys(transactions).filter(
				(txHash) => !transactions[txHash].receipt,
			).length,
		[transactions],
	)

	return (
		<>
			<StyledAccountButton>
				{!account ? (
					<Button
						onClick={() => setShowWalletProviderModal(true)}
						size="sm"
						text={
							<>
								Connect{' '}
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
						onClick={() => setShowAccountModal(true)}
						size="sm"
						text={
							<>
								{ens ? (
									ens
								) : (
									<>
										{account.slice(0, 6)}...
										{account.slice(account.length - 4, account.length)}{' '}
									</>
								)}
								<FontAwesomeIcon
									icon="angle-double-right"
									style={{
										margin: '0 4px',
										color: '#fff',
									}}
								/>{' '}
								{new BigNumber(getDisplayBalance(wethBalance)).toFixed(4)}
								<FontAwesomeIcon
									icon={['fab', 'ethereum']}
									style={{
										marginLeft: '4px',
									}}
								/>
								{pendingTxs > 0 && (
									<>
										{' '}
										<FontAwesomeIcon
											icon="angle-double-right"
											style={{
												margin: '0 4px',
												color: '#f8f8ff',
											}}
										/>{' '}
										<SpinnerLoader />
										<span style={{ marginLeft: '5px' }}>{pendingTxs}</span>
									</>
								)}
							</>
						}
						border={true}
					/>
				)}
			</StyledAccountButton>

			<MobileAccountButton>
				{!account ? (
					<Button
						onClick={() => setShowAccountModal(true)}
						size="sm"
						text={
							<>
								Connect{' '}
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
						onClick={() => setShowAccountModal(true)}
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

			<AccountModal
				show={showAccountModal}
				onHide={() => setShowAccountModal(false)}
			/>

			<WalletProviderModal
				show={showWalletProviderModal}
				onHide={() => setShowWalletProviderModal(false)}
			/>
		</>
	)
}

const StyledAccountButton = styled.div`
	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		display: none;
	}
`

const MobileAccountButton = styled.div`
	@media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
		display: none;
	}
`

export default AccountButton
