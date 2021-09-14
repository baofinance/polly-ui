import { lighten } from 'polished'
import React from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

interface IconButtonProps {
	children?: React.ReactNode
	disabled?: boolean
	onClick?: () => void
	to?: string
}

const IconButton: React.FC<IconButtonProps> = ({
	children,
	disabled,
	onClick,
	to,
}) => {
	return (
		<StyledButton disabled={disabled} onClick={onClick}>
			{to ? <StyledLink to={to}>{children}</StyledLink> : children}
		</StyledButton>
	)
}

interface StyledButtonProps {
	disabled?: boolean
}

const AnimateGradient = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}`

const StyledButton = styled.button<StyledButtonProps>`
	align-items: center;
	background-color: ${(props) => props.theme.color.secondary[300]};
	background-image: linear-gradient(
		to right,
		${(props) => props.theme.color.secondary[400]} 0%,
		${(props) => props.theme.color.secondary[300]} 51%,
		${(props) => props.theme.color.secondary[500]} 100%);
	);
	background-size: 200% 200%;
	border: 1px solid ${(props) => props.theme.color.primary[500]};
	border-radius: 28px;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	border: 0;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
	cursor: pointer;
	display: flex;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	height: 56px;
	justify-content: center;
	letter-spacing: 1px;
	outline: none;
	padding: 0;
	margin: 0;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	text-transform: uppercase;
	width: 56px;

	:hover {
		transform: scale(1);
	}

	&:hover:before {
		transform: scale(1.2);
	}

	&:hover,
	&:focus {
		background-position: right center;
		transform: translate(1px, 1px);
		-webkit-animation: ${AnimateGradient} 3s ease-in-out infinite;
		-moz-animation: ${AnimateGradient} 3s ease-in-out infinite;
		animation: ${AnimateGradient} 3s ease-in-out infinite;
		border-color: ${lighten(0.025, '#090130')};
		color: ${(props) => props.theme.color.primary[100]};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')} !important;
		box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
			rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
			rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: ${(props) => props.theme.color.primary[100]};
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;
`

export default IconButton
