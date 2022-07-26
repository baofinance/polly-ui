import { Icon } from 'components/Icon'
import React from 'react'
import { Container } from 'react-bootstrap'
import styled from 'styled-components'

interface PageHeaderProps {
	icon?: any
	subtitle?: any
	title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon }) => {
	return (
		<Container>
			<StyledPageHeader>
				<Icon src={icon} />
				<StyledTitle>{title}</StyledTitle>
			</StyledPageHeader>
		</Container>
	)
}

const StyledPageHeader = styled.div`
	align-items: center;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	padding-bottom: ${(props) => props.theme.spacing[6]}px;
	margin: ${(props) => props.theme.spacing[6]}px auto 0;
`

export const StyledTitle = styled.h1`
	font-family: 'Rubik', sans-serif;
	font-size: 4rem !important;
	letter-spacing: -0.1rem;
	text-align: center;
	font-weight: ${(props) => props.theme.fontWeight.strong} !important;
	color: ${(props) => props.theme.color.text[100]};
	background: linear-gradient(
		to left,
		${(props) => props.theme.color.accent[300]} 0%,
		${(props) => props.theme.color.accent[100]} 33%,
		${(props) => props.theme.color.accent[200]} 66%,
		${(props) => props.theme.color.accent[300]} 100%
	);
	background-size: 200% auto;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	animation: bounce 25s ease-in-out infinite alternate;

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		font-size: 2.5rem !important;
	}

	@keyframes bounce {
		to {
			background-position: 300%;
		}
	}
`

export default PageHeader
