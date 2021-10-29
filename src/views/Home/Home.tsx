import Page from 'components/Page'
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Bubbles, { bubbleSpecs } from './components/Bubbles'
import HomeAnalytics from './components/HomeAnalytics'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SecuritySection from './components/SecuritySection'
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
				<SecuritySection />
			</Container>
		</Page>
	)
}

export default Home
