import Button from 'components/Button'
import Container from 'components/Container'
import Page from 'components/Page'
import Spacer from 'components/Spacer'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { HeroHeader } from 'views/Home/components/styles'
import Farm from '../Farm'
import Balances from './components/Balances'
import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
	const { path } = useRouteMatch()
	const { account, ethereum }: any = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account && ethereum.chainId === '0x89' ? (
					<>
						<Route exact path={path}>
							<HeroHeader>FARMS</HeroHeader>
							<Spacer size="lg" />
							<Container>
								<Balances />
							</Container>
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
	color: ${(props) => props.theme.color.grey[100]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;

	> b {
		color: ${(props) => props.theme.color.grey[100]};
	}
`

export default Farms
