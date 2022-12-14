import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import Balances from './components/Balances'
import { FarmList } from './components/FarmList'
import Unlock from './components/Unlock'

const Farms: React.FC = () => {
	return (
		<Page>
			<PageHeader
				icon=""
				title="Farms"
				subtitle="Earn POLLY by staking Sushiswap LP Tokens!"
			/>
			<Container>
				<Unlock />
				<Balances />
				<FarmList />
			</Container>
		</Page>
	)
}

export default Farms
