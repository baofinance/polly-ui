import Page from 'components/Page'
import Spacer from 'components/Spacer'
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Bubbles, { bubbleSpecs } from './components/Bubbles'
import SectionOne from './components/SectionOne'
import PriceGraphs from './components/PriceGraphs'
import SectionTwo from './components/SectionTwo'
import HomeAnalytics from './components/HomeAnalytics'
import { BubbleContainer, BubbleWrap } from './components/styles'

const Home: React.FC = () => {
	const bubbleRef = useRef()

	useEffect(() => {
		new Bubbles(bubbleSpecs, bubbleRef)
	}, [])

	return (
		<Page>
			<Container>
				<SectionOne />
				<HomeAnalytics />
				<BubbleWrap>
					<BubbleContainer ref={bubbleRef} />
				</BubbleWrap>
				<SectionTwo />
				{/* <Spacer size="lg" />
				<PriceGraphs /> */}
			</Container>
		</Page>
	)
}

export default Home
