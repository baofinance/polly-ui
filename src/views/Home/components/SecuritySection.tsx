import React from 'react'
import { HeroHeader, HeroHeaderGradient, HeroText } from './styles'

import immunefi from 'assets/img/immunefi.png'

const SecuritySection: React.FC = () => (
	<>
		<HeroText>
			<a href="https://www.immunefi.com/bounty/baofinance" target="_blank">
				<img src={immunefi} />
			</a>
		</HeroText>
	</>
)

export default SecuritySection
