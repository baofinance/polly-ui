import React, { useEffect, useRef } from 'react'
import Bubbles, { bubbleSpecs } from './components/Bubbles'
import HomeAnalytics from './components/HomeAnalytics'
import SectionOne from './components/SectionOne'
import SectionTwo from './components/SectionTwo'
import SecuritySection from './components/SecuritySection'

const Home: React.FC = () => {
	const bubbleRef = useRef()

	useEffect(() => {
		new Bubbles(bubbleSpecs, bubbleRef)
	}, [])

	return (
		<>
			<SectionOne />
			<HomeAnalytics />
			<div className='bubble-wrap'>
				<div className='bubble-container' ref={bubbleRef} />
			</div>
			<SectionTwo />
			{/* <PriceGraphs /> */}
			<SecuritySection />
		</>
	)
}

export default Home
