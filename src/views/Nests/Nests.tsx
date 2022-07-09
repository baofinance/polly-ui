import pollyNests from 'assets/img/polly-nests.png'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import { NestList } from './components/NestList'

const Nests: React.FC = () => {
	return (
		<Page>
			<Container>
				<PageHeader
					icon={pollyNests}
					title="Nests"
					subtitle="Tokenized baskets with autonomous yield bearing strategies!"
				/>
				<NestList />
			</Container>
		</Page>
	)
}

export default Nests
