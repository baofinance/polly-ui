import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
	onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
	return (
		<StyledTopBar>
			<Container size="lg">
				<StyledTopBarInner>
					<StyledLogoWrapper>
						<Logo />
					</StyledLogoWrapper>
					<Nav />
					<StyledAccountButtonWrapper>
						<AccountButton />
					</StyledAccountButtonWrapper>
				</StyledTopBarInner>
			</Container>
		</StyledTopBar>
	)
}

const StyledLogoWrapper = styled.div`
	width: 260px;
	@media (max-width: 400px) {
		width: auto;
	}
`

const StyledTopBar = styled.div`
	overflow: hidden;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 1 !important;
	background: linear-gradient(to bottom, #1a053d 5%, #1c0745 5%);
`

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	max-width: ${(props) => props.theme.siteWidth}px;
	width: 100%;
`

const StyledAccountButtonWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-end;
	width: 156px;
	@media (max-width: 400px) {
		justify-content: center;
		width: auto;
	}
`

export default TopBar
