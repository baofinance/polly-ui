import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink exact activeClassName="active" to={{ pathname: '/' }}>
				Home
			</StyledLink>
			<StyledLink exact activeClassName="active" to={{ pathname: '/nests' }}>
				Nests
			</StyledLink>
			{/* <StyledLink
				exact
				activeClassName="active"
				to={{ pathname: '/' }}
			>
				Markets
			</StyledLink>
			<StyledLink
				exact
				activeClassName="active"
				to={{ pathname: '/ballast' }}
			>
				Ballast
			</StyledLink> */}
			<StyledLink exact activeClassName="active" to={{ pathname: '/farms' }}>
				Farms
			</StyledLink>
			<StyledAbsoluteLink
				href="https://snapshot.org/#/pollyfinance.eth"
				target="_blank"
			>
				Vote
			</StyledAbsoluteLink>
			<StyledAbsoluteLink
				href="https://gov.bao.finance/c/polly/"
				target="_blank"
			>
				Forum
			</StyledAbsoluteLink>
			<StyledAbsoluteLink
				href="https://docs.bao.finance/franchises/polly"
				target="_blank"
			>
				Docs
			</StyledAbsoluteLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
`

const StyledLink = styled(NavLink)`
	transition-property: all;
	transition-duration: 200ms;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	font-family: 'Rubik', sans-serif;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.text[300]};
	}
	&.active {
		color: ${(props) => props.theme.color.text[400]};
	}
	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

const StyledAbsoluteLink = styled.a`
	transition-property: all;
	transition-duration: 200ms;
	transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
	font-family: 'Rubik', sans-serif;
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.text[300]};
	}
	&.active {
		color: ${(props) => props.theme.color.text[400]};
	}
	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

export default Nav
