import Page from 'components/Page'
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Bubbles, { bubbleSpecs } from './components/Bubbles'
import HomeAnalytics from './components/HomeAnalytics'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SecuritySection from './components/SecuritySection'
import { BubbleContainer, BubbleWrap } from './components/styles'
import Spacer from 'components/Spacer'


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
				<SecuritySection />
				<Spacer size="lg" />
				<SectionTwo />
				{/* <PriceGraphs /> */}
			</Container>
		</Page>
	)
}

export default Home
