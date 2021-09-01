import React from 'react'
import styled from 'styled-components'
import baoLogo from '../../../assets/img/bao-logo.png'

const Branding: React.FC = () => {
	return (
		<StyledLink target="_blank" href="https://bao.finance">
			<StyledText>
				<TitleText>
						<span>by Bao.Finance</span>
				</TitleText>
			</StyledText>
		</StyledLink>
	)
}

const TitleText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${(props) => props.theme.color.grey[100]};
	font-family: 'Kaushan Script', sans-serif;
	font-size: 24px;
	letter-spacing: 0.03rem;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`

const StyledLink = styled.a`
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: 60px;
	min-width: 60px;
	padding: 0;
	text-decoration: none;

	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
`

const StyledText = styled.span`
	color: ${(props) => props.theme.color.grey[600]};
	font-family: 'Rubik', sans-serif;
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0.03em;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`

export default Branding
