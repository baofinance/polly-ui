import pollyNests from 'assets/img/polly-nests.png'
import { Button } from 'components/Button'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/base/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import Nest from '../Nest'
import NestList from './components/NestList'

const Nests: React.FC = () => {
	const { path } = useRouteMatch()
	const { account, ethereum }: any = useWeb3React()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
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
			</Page>
		</Switch>
	)
}

export default Nests
