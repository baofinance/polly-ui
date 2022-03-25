import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { Button } from '../../Button'
import Spacer from '../../Spacer'
import WalletModalCard from '../../WalletModalCard'
import { Card } from 'react-bootstrap'
import styled from 'styled-components'

interface WalletCardProps {
	icon: React.ReactNode
	onConnect: () => void
	title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => {
	const wallet: any = useWeb3React()

	const [buttonText, setButtonText] = useState<any>()
	useEffect(() => {
		_getButtonText(wallet.ethereum, wallet.status).then((res: any) =>
			setButtonText(res),
		)
	}, [wallet])

	return (
		<WalletModalCard>
			<Card.Body>
				<WalletIcon>{icon}</WalletIcon>
				<WalletTitle>{title}</WalletTitle>
				<Button
					onClick={onConnect}
					text={
						buttonText || (
							<span>
								<FontAwesomeIcon icon="wifi" /> Wrong Network
							</span>
						)
					}
				/>
			</Card.Body>
		</WalletModalCard>
	)
}

const _getButtonText = async (ethereum: any, status: string): Promise<any> => {
	if (ethereum && ethereum.chainId !== Config.defaultRpc.chainId) {
		try {
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: Config.defaultRpc.chainId }],
			})
		} catch (error) {
			if (error.code === 4902) {
				await ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [Config.defaultRpc],
				})
			}
		}
	} else {
		return status === 'connecting' ? 'Connecting...' : 'Connect'
	}
}

export default WalletCard

const WalletIcon = styled.div`
	background-color: ${(props) => props.theme.color.primary[200]};
	font-size: 36px;
	height: 80px;
	width: 80px;
	border-radius: 40px;
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0 auto ${(props) => props.theme.spacing[3]}px;
`

const WalletTitle = styled.div`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 18px;
	font-weight: 700;
	padding: ${(props) => props.theme.spacing[4]}px;
	text-align: center;
`
