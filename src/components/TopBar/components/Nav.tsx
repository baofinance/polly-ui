import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const queryString = window.location.search

const urlParams = new URLSearchParams(queryString)

const refer: any = urlParams.get('ref')

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink
				exact
				activeClassName="active"
				to={{ pathname: '/', search: '?ref=' + refer }}
			>
				Home
			</StyledLink>
			<StyledLink
				exact
				activeClassName="active"
				to={{ pathname: '/nests', search: '?ref=' + refer }}
			>
				Nests
			</StyledLink>
			<StyledLink
				exact
				activeClassName="active"
				to={{ pathname: '/farms', search: '?ref=' + refer }}
			>
				Farms
			</StyledLink>
			<StyledAbsoluteLink
				href="https://snapshot.page/#/pollyfinance.eth"
				target="_blank"
			>
				Vote
			</StyledAbsoluteLink>
			<StyledAbsoluteLink href="https://gov.bao.finance" target="_blank">
				Forum
			</StyledAbsoluteLink>
			<StyledAbsoluteLink
				href="https://docs.bao.finance/franchises/polly-finance"
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
		color: ${(props) => props.theme.color.text[300]};
	}
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

const StyledAbsoluteLink = styled.a`
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
		color: ${(props) => props.theme.color.text[300]};
	}
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

export default Nav
