import { SpinnerLoader } from 'components/Loader'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import useFarms from 'hooks/farms/useFarms'
import React from 'react'
import { Container } from 'react-bootstrap'
import ConnectedCheck from 'components/ConnectedCheck'
import Balances from './components/Balances'
import { FarmList } from './components/FarmList'

const Farms: React.FC = () => {
	const farms = useFarms()

	return (
		<Page>
			<PageHeader
				icon=""
				title="Farms"
				subtitle="Earn BAO by staking Sushiswap & Uniswap LP Tokens!"
			/>
			<ConnectedCheck>
				<Container>
					<Balances />
					{farms ? <FarmList /> : <SpinnerLoader block />}
				</Container>
			</ConnectedCheck>
		</Page>
	)
}

export default Farms
