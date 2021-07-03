import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import baoLogo from '../../assets/img/polly.svg'

const Logo: React.FC = () => {
	return (
		<StyledLogo to="/">
			<img src={baoLogo} height="50" style={{ marginTop: -4 }} />
			<StyledText>
				<TitleText>
					Polly
					<TitleSubText>by Bao.Finance</TitleSubText>
				</TitleText>
			</StyledText>
		</StyledLogo>
	)
}

const TitleText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${(props) => props.theme.color.red[200]};
	font-family: 'VT323 Script', sans-serif;
	font-weight: 600;
	font-size: 24px;
	letter-spacing: 0.03rem;
	margin-top: -1rem;
	margin-left: ${(props) => props.theme.spacing[2]}px;
`
const TitleSubText = styled.div`
	width: fit-content;
	white-space: nowrap;
	color: ${(props) => props.theme.color.red[200]};
	font-family: 'Reem Kufi', sans-serif;
	font-weight: 600;
	font-size: 12px;
	line-height: 0.5rem;
	letter-spacing: 0.03rem;
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
	font-family: 'Reem Kufi', sans-serif;
	font-size: 20px;
	font-weight: 700;
	letter-spacing: 0.03em;
	margin-left: ${(props) => props.theme.spacing[2]}px;
	@media (max-width: 400px) {
		display: none;
	}
`

const MasterChefText = styled.span`
	font-family: 'Kaushan Script', sans-serif;
`

export default Logo
