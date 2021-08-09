import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Button from '../../components/Button'
import Page from '../../components/Page'
import WalletProviderModal from '../../components/WalletProviderModal'
import Nest from '../Nest'
import NestList from './components/ListView/NestList'
import PageHeader from '../../components/PageHeader'
import { useWallet } from 'use-wallet'
import useModal from '../../hooks/useModal'
import pollyNests from '../../assets/img/polly-nests.png'

const Nests: React.FC = () => {
	const { path } = useRouteMatch()
	const { account } = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account ? (
					<>
						<PageHeader
							icon={pollyNests}
							title="Build Your Nest"
							subtitle="Tokenized Portfolios with Automated Strategies!"
						/>
						<Route exact path={path}>
							<NestList />
						</Route>
						<Route path={`${path}/:nestId`}>
							<Nest />
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

export default Nests
