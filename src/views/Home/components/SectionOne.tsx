import React from 'react'
import {
	BubbleOverlayText,
	HeroHeader,
	HeroHeaderGradient,
	HeroText,
} from './styles'

const SectionOne: React.FC = () => (
	<>
		<HeroHeader>
			<HeroHeaderGradient>Build Your Nest</HeroHeaderGradient>
		</HeroHeader>
		<HeroText>
			Diversify your crypto portfoilio & earn passive yield in just a few
			clicks!
		</HeroText>
	</>
)

export default SectionOne
