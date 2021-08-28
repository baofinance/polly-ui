import React from 'react'
import styled from 'styled-components'
import baoLogo from '../../../assets/img/bao-logo.png'

const Branding: React.FC = () => {
	return (
		<StyledLogo href="https://bao.finance">
			<TitleText>by Bao.Finance</TitleText>
			<BaoLogo />
		</StyledLogo>
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

const StyledLogo = styled.a`
	align-items: center;
	display: flex;
	justify-content: center;
	min-height: 60px;
	min-width: 60px;
	padding: 0;
	text-decoration: none;
	margin: 0 0 25px;
`

const BaoLogo = styled.img.attrs(() => ({
	src: baoLogo,
}))`
	margin-left: 10px;
	height: 24px;
`

export default Branding
