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
	margin-top: ${(props) => props.theme.spacing[4]}px;
	margin: auto;
	padding: ${(props) => props.theme.spacing[4]}px;
`
const StyledFooterInner = styled.div`
	margin: auto;
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	max-width: ${(props) => props.theme.siteWidth}px;
	width: 100%;
	margin-bottom: -${(props) => props.theme.spacing[3]}px;
`

const StyledNavWrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
`

export default Footer
