import { useWeb3React } from '@web3-react/core'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import useFarms from 'hooks/farms/useFarms'
import React from 'react'
import { Container } from 'react-bootstrap'
import Balances from './components/Balances'
import { FarmList } from './components/FarmList'

const Farms: React.FC = () => {

	return (
		<Page>
			<PageHeader
				icon=""
				title="Farms"
				subtitle="Earn POLLY by staking Sushiswap LP Tokens!"
			/>
			<Container>
				<Balances />
				<FarmList />
			</Container>
		</Page>
	)
}

export default Farms
