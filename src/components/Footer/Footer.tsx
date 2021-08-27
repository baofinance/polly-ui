import React from 'react'
import styled from 'styled-components'
import Nav from './components/Nav'
import Branding from './components/Branding'

const Footer: React.FC = () => (
	<StyledFooter>
		<StyledFooterInner>
			<Nav />
			<Branding />
		</StyledFooterInner>
	</StyledFooter>
)

const StyledFooter = styled.footer`
	align-items: center;
	display: flex;
	justify-content: center;
	margin-top: 72px;
`
const StyledFooterInner = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	height: ${(props) => props.theme.topBarSize}px;
	max-width: ${(props) => props.theme.siteWidth}px;
	width: 100%;

	@media (max-width: 414px) {
	}
`

export default Footer
