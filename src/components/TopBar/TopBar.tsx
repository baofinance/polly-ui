import MenuIcon from 'components/icons/MenuIcon'
import React from 'react'
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import Logo from 'components/Logo'
import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
	onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
	return (
		<StyledTopBar>
			<StyledTopBarInner>
				<StyledLogoWrapper>
					<Logo />
				</StyledLogoWrapper>
				<StyledNavWrapper>
					<Nav />
				</StyledNavWrapper>
				<StyledAccountButtonWrapper>
					<AccountButton />
					<StyledMenuButton onClick={onPresentMobileMenu}>
						<MenuIcon />
					</StyledMenuButton>
				</StyledAccountButtonWrapper>
			</StyledTopBarInner>
		</StyledTopBar>
	)
}

const StyledLogoWrapper = styled.div`
	width: 200px;
	@media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
		width: auto;
	}
`
const StyledTopBar = styled(Container)`
	margin: auto;
`

const StyledNavWrapper = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	@media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
		display: none;
	}
`

const StyledTopBarInner = styled.div`
	margin: auto;
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
	width: 200px;
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		justify-content: center;
		width: auto;
	}
`

const StyledMenuButton = styled.button`
	background: none;
	border: 0;
	margin: 0;
	outline: 0;
	padding: 0;
	display: none;

	@media (max-width: ${(props) => props.theme.breakpoints.tablet}px) {
		align-items: center;
		display: flex;
		height: 44px;
		justify-content: center;
		width: 44px;
		margin-left: ${(props) => props.theme.spacing[2]}px;
	}
`

export default TopBar
