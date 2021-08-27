import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baoLogo from 'assets/img/bao-logo.png'
import { Row, Col } from 'react-bootstrap'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink target="_blank" href="https://discord.gg/BW3P62vJXT">
				<FontAwesomeIcon icon={['fab', 'discord']} />
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com/thebaoman">
				<FontAwesomeIcon icon={['fab', 'twitter']} />
			</StyledLink>
			<StyledLink target="_blank" href="https://thebaoman.medium.com/">
				<FontAwesomeIcon icon={['fab', 'medium']} />
			</StyledLink>
			<StyledLink target="_blank" href="https://gov.bao.finance/">
				<FontAwesomeIcon icon="comments" />
			</StyledLink>
			<StyledLink target="_blank" href="https://snapshot.page/#/baovotes.eth">
				<FontAwesomeIcon icon="bolt" />
			</StyledLink>
			<StyledLink target="_blank" href="https://docs.bao.finance/">
				<FontAwesomeIcon icon="book" />
			</StyledLink>
			<StyledLink target="_blank" href="https://github.com/baofinance">
				<FontAwesomeIcon icon={['fab', 'github']} />
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
	font-size: 24px;
	margin-bottom: 25px;

	@media (max-width: 414px) {
		flex-direction: column;
	}
`

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.grey[100]};
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;

	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
`

export default Nav
