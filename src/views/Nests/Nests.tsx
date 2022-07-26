import React from 'react'
import useNests from '../../hooks/baskets/useNests'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import NestList from './components/NestList'
import { Container } from 'react-bootstrap'
import Spacer from 'components/Spacer'
import { StyledInfo } from './components/styles'

const Nests: React.FC = () => {
	const nests = useNests()

	return (
		<Page>
			<PageHeader icon="" title="Nests" />
			<Container>
				<StyledInfo>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						Bao Baskets allow users to get balanced exposure to digital assets
						on the Ethereum Network. Baskets are designed to be truly
						set-and-forget, maximizing your returns at a fraction of the cost
						and effort. Baskets leverage automated strategies utilizing staking,
						lending, and yield farming- No management or constant monitoring
						necessary!
					</div>
				</StyledInfo>
				<Spacer size="md" />
				<NestList nests={nests} />
			</Container>
		</Page>
	)
}

export default Nests
