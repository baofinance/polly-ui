import React from 'react'
import styled from 'styled-components'
import Nav from './components/Nav'
import Branding from './components/Branding'

const Footer: React.FC = () => (
	<StyledFooter>
		<StyledFooterInner>
			<StyledNavWrapper>
				<Nav />
			</StyledNavWrapper>
		</StyledFooterInner>
		<Branding />
	</StyledFooter>
)

const StyledFooter = styled.footer`
	margin-top: 25px;
	margin: auto;
	padding: 25px;
`
const StyledFooterInner = styled.div`
	margin: auto;
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	max-width: ${(props) => props.theme.siteWidth}px;
	width: 100%;
	margin-bottom: -1em;
`

const StyledNavWrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
`

export default Footer
