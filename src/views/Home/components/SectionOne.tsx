import React from 'react'
import { HeroHeader, HeroHeaderGradient, HeroText } from './styles'

const SectionOne: React.FC = () => (
	<>
		<HeroHeader>
			<HeroHeaderGradient>Build Your Nest</HeroHeaderGradient>
		</HeroHeader>
		<HeroText>
			With Polly Nests you can diversify your crypto portfolio & earn passive
			yield in just a few clicks! Nests utilize autonomous strategies that will
			minimize the effort needed to maximize your returns.
		</HeroText>
	</>
)

export default SectionOne
