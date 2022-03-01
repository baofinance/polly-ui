import pollyNests from 'assets/img/polly-nests.png'
import { Button } from 'components/Button'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/base/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import Config from 'bao/lib/config'
import Nest from '../Nest'
import NestList from './components/NestList'

const Nests: React.FC = () => {
	const { path } = useRouteMatch()
	const { account, ethereum }: any = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account && ethereum.chainId === Config.defaultRpc.chainId ? (
					<>
						<Route exact path={path}>
							<PageHeader
								icon={pollyNests}
								title="Nests"
								subtitle="Tokenized baskets with autonomous yield bearing strategies!"
							/>
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
