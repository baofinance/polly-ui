import pollyNests from 'assets/img/polly-nests.png'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Nest from './Nest'
import { NestList } from './components/NestList'

const Nests: React.FC = () => {
	const { path } = useRouteMatch()

	return (
		<Switch>
			<Page>
				<Container>
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
				</Container>
			</Page>
		</Switch>
	)
}

export default Nests
