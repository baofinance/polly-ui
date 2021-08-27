import pollyLogo from 'assets/img/logo.svg'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Tooltipped from '../Tooltipped'

const Logo: React.FC = () => {
	return (
		<StyledLogo to="/">
			<img src={pollyLogo} height="36" style={{ verticalAlign: 'middle' }} />
			<StyledText>
				<TitleText>
					<Tooltipped content="by Bao.Finance">
						<span>Polly</span>
					</Tooltipped>
				</TitleText>
			</StyledText>
		</StyledLogo>
	)
}

const TitleText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${(props) => props.theme.color.grey[100]};
	font-family: 'Rubik', sans-serif;
	font-size: 36px;
	letter-spacing: 0.03rem;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`

const StyledLogo = styled(Link)`
	align-items: center;
	display: flex;
	justify-content: center;
	margin: 0;
	min-height: 60px;
	min-width: 60px;
	padding: 0;
	text-decoration: none;
`

const StyledText = styled.span`
	color: ${(props) => props.theme.color.grey[600]};
	font-family: 'Rubik', sans-serif;
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0.03em;
	margin-left: ${(props) => props.theme.spacing[2]}px;
	@media (max-width: 400px) {
		display: none;
	}
`

export default Logo
