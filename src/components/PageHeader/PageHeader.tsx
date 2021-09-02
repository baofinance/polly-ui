import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

interface PageHeaderProps {
	icon: any
	subtitle?: string
	title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
	const titletext = title.toString()
	if (titletext.toString() === 'PollyChef is Ready') {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledTitle>{title}</StyledTitle>
					{/* <StyledSubtitle>{subtitle}</StyledSubtitle> */}
				</StyledPageHeader>
			</Container>
		)
	} else if (titletext.toString() === 'Select Your Fav Dim Sum Entrees!') {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledTitle>{title}</StyledTitle>
					{/* <StyledSubtitle>{subtitle}</StyledSubtitle> */}
				</StyledPageHeader>
			</Container>
		)
	} else {
		return (
			<Container size="sm">
				<StyledPageHeader>
					<StyledTitle>{title}</StyledTitle>
					{/* <StyledSubtitle>{subtitle}</StyledSubtitle> */}
				</StyledPageHeader>
			</Container>
		)
	}
}

const StyledPageHeader = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: ${(props) => props.theme.spacing[6]}px;
	margin: 56px auto 0;
`

export const StyledTitle = styled.h1`
	font-family: 'Rubik', sans-serif;
	font-size: 4rem !important;
	letter-spacing: -0.1rem;
	text-align: center;
	font-weight: 700 !important;
	color: #f35626;
	background: linear-gradient(
		to left,
		#6b9aef 25%,
		#53c7e4 50%,
		#4ba9e3 75%,
		#6b9aef 100%
	);
	background-size: 200% auto;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: bounce 25s ease-in-out infinite alternate;

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		font-size: 2.5rem !important;
	}

	@keyframes bounce {
		to {
			background-position: 300%;
		}
	}
`

const StyledSubtitle = styled.h3`
	color: ${(props) => props.theme.color.grey[100]};
	font-size: 18px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	opacity: 0.8;
`

export default PageHeader
