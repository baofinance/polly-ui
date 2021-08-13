import React, { useEffect, useRef } from 'react'
import Page from '../../components/Page'
import { Container } from 'react-bootstrap'
import { BubbleWrap, BubbleContainer } from './components/styles'

import SectionTwo from './components/SectionTwo'
import SectionOne from './components/SectionOne'
import SectionThree from './components/SectionThree'
import Bubbles from './components/Bubbles'
import { bubbleSpecs } from './components/Bubbles'
import Spacer from '../../components/Spacer'

const Home: React.FC = () => {
	const bubbleRef = useRef()

	useEffect(() => {
		new Bubbles(bubbleSpecs, bubbleRef)
	}, [])

	return (
		<Page>
			<Container>
				<SectionOne />
				<Spacer size="md" />
				<BubbleWrap>
					<BubbleContainer ref={bubbleRef} />
				</BubbleWrap>
				<SectionTwo />
				<Spacer size="md" />
				<SectionThree />
			</Container>
		</Page>
	)
}

export default Home
