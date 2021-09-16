import { lighten } from 'polished'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const StyledButton = styled.button<StyledButtonProps>`
	align-items: center;
	background-color: ${(props) => props.theme.color.secondary[300]};
	background-image: linear-gradient(
		to right,
		${(props) => props.theme.color.secondary[200]} 0%,
		${(props) => props.theme.color.secondary[100]} 51%,
		${(props) => props.theme.color.secondary[300]} 100%);
	);
	background-size: 200% 200%;
	border: 1px solid ${(props) => props.theme.color.primary[400]};
	border-radius: 32px;
	box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
		rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	border: 0;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
	cursor: pointer;
	display: flex;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	height: 50px;
	justify-content: center;
	letter-spacing: 1px;
	outline: none;
	padding: 0;
	margin: 0;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	text-transform: uppercase;
	width: 50px;

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
		border-color: ${lighten(0.025, '#090130')};
		color: ${(props) => props.theme.color.text[100]};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')} !important;
		box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
			rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
			rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: ${(props) => props.theme.color.text[100]};
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;
`

export default IconButton
