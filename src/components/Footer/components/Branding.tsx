import React from 'react'
import styled from 'styled-components'
import baoLogo from 'assets/img/bao-logo.png'

const Branding: React.FC = () => {
	return (
		<ByBao>
			<p>
				<img src={baoLogo} height="25" /> By
				<FooterLink target="_blank" href="https://bao.finance">
				Bao.Finance
				</FooterLink>
			</p>
		</ByBao>
	)
}

const ByBao = styled.div`
	display: flex;
	position: absolute;
	float: right;
	right: 0;
	display: flex;
	font-size: 1rem;
	margin-bottom: 25px;
`

const FooterLink = styled.a`
	color: ${(props) => props.theme.color.grey[100]};
    padding-right: ${(props) => props.theme.spacing[3]}px;
	padding-left: ${(props) => props.theme.spacing[1]}px;
	text-decoration: none;

	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
`

export default Branding
