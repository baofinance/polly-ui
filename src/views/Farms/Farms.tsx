import pollyNests from 'assets/img/polly-nests.png'
import Button from 'components/Button'
import Container from 'components/Container'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
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
							<PageHeader
								icon={pollyNests}
								title="Farms"
								subtitle="Earn POLLY by staking Sushiswap LP and Nest Tokens!"
							/>
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

export default Farms
