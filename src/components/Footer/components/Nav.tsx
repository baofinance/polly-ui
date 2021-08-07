import React from 'react'
import styled from 'styled-components'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink
				target="_blank"
				href="https://polygonscan.com/address/0xd683Cb11005EfC90A1c3995251821a20c7860f7A/"
			>
				NestBuilder Contract
			</StyledLink>
			<StyledLink
				target="_blank"
				href="https://polygonscan.com/address/0xc847a016ed0a023196eeb641cf13a93ce3c82b6b/"
			>
				PollyChef Contract
			</StyledLink>
			<StyledLink
				target="_blank"
				href="https://analytics-polygon.sushi.com/pairs/0xe62ec2e799305e0d367b0cc3ee2cda135bf89816"
			>
				SushiSwap POLLY-ETH
			</StyledLink>
			<StyledLink target="_blank" href="https://discord.gg/BW3P62vJXT">
				Discord
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com/thebaoman">
				Twitter
			</StyledLink>
			<StyledLink target="_blank" href="https://thebaoman.medium.com/">
				Medium
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
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
