import React from 'react'
import { HeroHeader, HeroHeaderGradient, HeroText } from './styles'
import Spacer from 'components/Spacer'

import immunefi from 'assets/img/immunefi.png'

const SecuritySection: React.FC = () => (
	<>
		<HeroText>
			<a href="https://www.immunefi.com/bounty/baofinance" target="_blank">
				<img src={immunefi} height="250px" />
			</a>
		</HeroText>
		<Spacer size="lg" />
	</>
)

export default SecuritySection
