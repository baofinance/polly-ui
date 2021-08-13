import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink target="_blank" href="https://discord.gg/BW3P62vJXT">
				Discord
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com/thebaoman">
				Twitter
			</StyledLink>
			<StyledLink target="_blank" href="https://thebaoman.medium.com/">
				Medium
			</StyledLink>
			<StyledLink target="_blank" href="https://gov.bao.finance/">
				Forum
			</StyledLink>
			<StyledLink target="_blank" href="https://snapshot.page/#/baovotes.eth">
				Vote
			</StyledLink>
			<StyledLink target="_blank" href="https://docs.bao.finance/">
				Documentation
			</StyledLink>
			<StyledLink target="_blank" href="https://github.com/baofinance">
				Github
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;

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
