import React from 'react'
import {
	BubbleOverlayText,
	HeroHeader,
	HeroSubHeader,
	HeroText,
} from './styles'

const SectionOne: React.FC = () => (
	<>
		<BubbleOverlayText>
			<HeroHeader>
				DIVERSE YIELD
				<br />
				BEARING INDEXES
			</HeroHeader>
			<HeroSubHeader>ON POLYGON</HeroSubHeader>
			<HeroText>
				Polly simplifies decentralized finance for users of all experience
				levels. Easily diversify your portfolio while maximizing your returns,
				thanks to our advanced yield bearing startegies.
			</HeroText>
		</BubbleOverlayText>
	</>
)

export default SectionOne
