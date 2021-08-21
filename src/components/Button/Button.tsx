import { lighten } from 'polished'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled, { keyframes, ThemeContext } from 'styled-components'

interface ButtonProps {
	children?: React.ReactNode
	disabled?: boolean
	href?: string
	onClick?: () => void
	size?: 'sm' | 'md' | 'lg'
	text?: string
	to?: string
	variant?: 'default' | 'secondary' | 'tertiary'
	inline?: boolean
	width?: string
	target?: string
}

const Button: React.FC<ButtonProps> = ({
	children,
	disabled,
	href,
	onClick,
	size,
	text,
	to,
	variant,
	inline,
	width,
	target,
}) => {
	const { color, spacing } = useContext(ThemeContext)

	let buttonColor: string
	switch (variant) {
		case 'secondary':
			buttonColor = '#a1a0a0'
			break
		case 'default':
		default:
			buttonColor = '#f7f4f2'
	}

	let boxShadow: string
	let buttonSize: number
	let buttonPadding: number
	let fontSize: number
	switch (size) {
		case 'sm':
			boxShadow = `4px 4px 8px ${color.grey[600]},
        -8px -8px 16px ${color.grey[500]}FF;`
			buttonPadding = spacing[4]
			buttonSize = 40
			fontSize = 14
			break
		case 'lg':
			boxShadow = `6px 6px 12px ${color.grey[600]},
        -12px -12px 24px ${color.grey[500]};`
			buttonPadding = spacing[4]
			buttonSize = 72
			fontSize = 16
			break
		case 'md':
		default:
			boxShadow = `6px 6px 12px ${color.grey[600]},
        -12px -12px 24px -2px ${color.grey[500]};`
			buttonPadding = spacing[4]
			buttonSize = 56
			fontSize = 16
	}

	const ButtonChild = useMemo(() => {
		if (to != '' && to != null) {
			return <StyledLink to={to}>{text}</StyledLink>
		} else if (href) {
			return (
				<StyledExternalLink href={href} target="__blank">
					{text}
				</StyledExternalLink>
			)
		} else {
			return text
		}
	}, [href, text, to])

	return (
		<>
			<StyledButton
				boxShadow={boxShadow}
				color={buttonColor}
				disabled={disabled}
				fontSize={fontSize}
				onClick={onClick}
				padding={buttonPadding}
				size={buttonSize}
				inline={inline}
				width={width}
				target={target}
			>
				{children}
				{ButtonChild}
			</StyledButton>
		</>
	)
}

interface StyledButtonProps {
	boxShadow: string
	color: string
	disabled?: boolean
	fontSize: number
	padding: number
	size: number
	inline: boolean
	width: string
	target?: string
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

const StyledButton = styled.button.attrs((attrs: StyledButtonProps) => ({
	target: attrs.target || '',
}))<StyledButtonProps>`
	padding: 0.7rem 1.7rem;
	align-items: center;
	background-color: #3c32f5;
	background-image: linear-gradient(to right,
	#2E1D5B 0%,
	#3c32f5 51%,
	#220f68 100%);
	background-size: 200% 200%;
	border: 1px solid ${(props) => props.theme.color.grey[500]};
	border-radius: 10px;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
	display: ${(props) => (props.inline ? 'inline-block' : 'flex')};
	font-size: ${(props) => props.fontSize}px;
	font-weight: 700;
	height: ${(props) => props.size}px;
	justify-content: center;
	outline: none;
	padding-left: ${(props) => props.padding}px;
	padding-right: ${(props) => props.padding}px;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	width: ${(props) => (props.width ? props.width : '100%')};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};

	@media (max-width: 960px) {
		/* margin: 0 0.5rem 0 0.5rem; */
		text-align: center;
		text-decoration: none;
		padding: 0.25rem 1rem;
	}
	@media (max-width: 640px) {
		width: 100%;
		padding: 0.85rem 0.85rem;
	}

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
		color: ${(props) => props.theme.color.grey[100]};
		cursor: ${(props) =>
			props.disabled ? 'not-allowed' : 'pointer'} !important;
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.grey[100]};
	}
`

const StyledExternalLink = styled.a`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.grey[100]};
	}
`

export const MaxButton = styled.a`
	padding: 5px;
	border: 1px solid ${(props) => props.theme.color.grey[100]};
	color: ${(props) => props.theme.color.grey[100]};
	border-radius: 5px;
	vertical-align: middle;
	margin-right: 10px;
	transition: 100ms;
	user-select: none;
	font-weight: bold;
	text-decoration: none;

	&:hover {
		background-color: ${(props) =>
			lighten(0.1, props.theme.color.darkGrey[100])};
		color: ${(props) => props.theme.color.blue[400]};
		cursor: pointer;
	}
`

export default Button
