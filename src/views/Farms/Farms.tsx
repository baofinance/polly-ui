import { SpinnerLoader } from 'components/Loader'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import useFarms from 'hooks/farms/useFarms'
import React from 'react'
import { Container } from 'react-bootstrap'
import ConnectedCheck from 'components/ConnectedCheck'
import Balances from './components/Balances'
import { FarmList } from './components/FarmList'
import { NetworkFarmList } from './components/NetworkFarmList'
import { useWeb3React } from '@web3-react/core'

const Farms: React.FC = () => {
	const farms = useFarms()
	const { account, library } = useWeb3React()

	return (
		<Page>
			<PageHeader
				icon=""
				title="Farms"
				subtitle="Earn POLLY by staking Sushiswap LP Tokens!"
			/>
			<Container>
				<Balances />
				<>{account ? <FarmList /> : <NetworkFarmList />}</>
			</Container>
		</Page>
	)
}

export default Farms
