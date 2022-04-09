import { StyledExternalLink, StyledLink } from 'components/Link'
import React from 'react'
import styled, { keyframes } from 'styled-components'

interface MobileMenuProps {
	onDismiss: () => void
	visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
	if (visible) {
		return (
			<StyledMobileMenuWrapper>
				<StyledBackdrop onClick={onDismiss} />
				<StyledMobileMenu>
					<StyledLink exact activeClassName="active" to="/" onClick={onDismiss}>
						Home
					</StyledLink>
					<StyledLink
						exact
						activeClassName="active"
						to="/nests"
						onClick={onDismiss}
					>
						Nests
					</StyledLink>
					<StyledLink
						exact
						activeClassName="active"
						to="/Farms"
						onClick={onDismiss}
					>
						Farms
					</StyledLink>
					<StyledExternalLink
						href="https://snapshot.page/#/baovotes.eth"
						target="_blank"
					>
						Vote
					</StyledExternalLink>
					<StyledExternalLink href="https://gov.bao.finance" target="_blank">
						Forum
					</StyledExternalLink>
					<StyledExternalLink href="https://docs.bao.finance" target="_blank">
						Docs
					</StyledExternalLink>
				</StyledMobileMenu>
			</StyledMobileMenuWrapper>
		)
	}
	return null
}

const StyledBackdrop = styled.div`
	background: ${(props) => props.theme.color.transparent[100]};
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
`

const StyledMobileMenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledMobileMenu = styled.div`
	animation: ${slideIn} 0.3s forwards ease-out;
	background: radial-gradient(circle at center top, #202231, #161522);
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 100%;
	bottom: 0;
	width: calc(100% - 48px);
	padding-top: 100px;
	padding-bottom: 100px;
	overflow-y: scroll;
`

export default MobileMenu
