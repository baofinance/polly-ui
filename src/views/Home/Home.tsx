import React from 'react'
import { Container } from 'react-neu'
import Page from '../../components/Page'
import FullPage from './components/FullPage'

const Home: React.FC = () => {
	return (
		<Page>
			<Container size="lg">
				<FullPage />
			</Container>
		</Page>
	)
}

export default Home
