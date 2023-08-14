import React, { useEffect, useRef } from 'react'
import Bubbles, { bubbleSpecs } from './home/components/Bubbles'
import HomeAnalytics from './home/components/HomeAnalytics'
import SectionOne from './home/components/SectionOne'
import SectionTwo from './home/components/SectionTwo'
import SecuritySection from './home/components/SecuritySection'

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
