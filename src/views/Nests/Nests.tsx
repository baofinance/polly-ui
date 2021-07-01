import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import baoBanner from '../../assets/img/bao-banner.png'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import Farm from '../Farm'
import FarmCards from './components/FarmCards'

const Indexes: React.FC = () => {
	const { path } = useRouteMatch()
	const { account } = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account ? (
					<>
						<Route exact path={path}>
							<PageHeader
								icon={baoBanner}
								subtitle="Earn BAO tokens by staking Sushi and Baoswap V2 LP Tokens. And soon generate synthetic assets!"
								title="Select Your Fav Dim Sum Entrees!"
							/>
							<StyledInfo>
								❗️<b>Important</b>: Bao.cx distribution has hit its soft cap of
								1T. Minting of new Bao.cx has ended, meaning farming rewards are
								no longer accumulating. We are currently evaluating all
								options. Please visit the Bao Finance{' '}
								<a href="https://gov.bao.finance/">forums</a>,{' '}
								<a href="https://snapshot.page/#/baovotes.eth">Snapshot </a>
								or our <a href="https://discord.gg/BW3P62vJXT">Discord</a> for
								more information.
								<br />
							</StyledInfo>
							<Spacer size="md" />
							<FarmCards />
						</Route>
						<Route path={`${path}/:farmId`}>
							<Farm />
						</Route>
					</>
				) : (
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<Button
							onClick={onPresentWalletProviderModal}
							text="🔓 Unlock Wallet"
						/>
					</div>
				)}
			</Page>
		</Switch>
	)
}

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;

	> b {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

export default Indexes
