import React, { useMemo } from 'react'
import Button from '../../Button'
import WalletModalCard from '../../WalletModalCard'
import CardContent from '../../CardContent'
import CardIcon from '../../CardIcon'
import CardTitle from '../../CardTitle'
import Spacer from '../../Spacer'
import { useWallet } from 'use-wallet'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface WalletCardProps {
	icon: React.ReactNode
	onConnect: () => void
	title: string
}

const WalletCard: React.FC<WalletCardProps> = ({
	icon,
	onConnect,
	title,
}) => {
	const wallet = useWallet()
	const status = useMemo(() => wallet.status, [wallet, wallet.account])

	return (
		<WalletModalCard>
			<CardContent>
				<CardIcon>{icon}</CardIcon>
				<CardTitle text={title}/>
				<Spacer/>
				<Button onClick={onConnect} text={_buttonText(status)}/>
			</CardContent>
		</WalletModalCard>
	)
}

const _buttonText = (status: string): any =>
	status === 'error'
		? (
			<span>
				<FontAwesomeIcon icon='wifi' /> Wrong Network
			</span>
		)
		: status === 'connecting'
			? 'Connecting...'
			: 'Connect'

export default WalletCard
