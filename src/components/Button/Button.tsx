import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'
import { darken, lighten } from 'polished';

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
}) => {
	const { color, spacing } = useContext(ThemeContext)

	let buttonColor: string
	switch (variant) {
		case 'secondary':
			buttonColor = color.grey[500]
			break
		case 'default':
		default:
			buttonColor = color.red[300]
	}

	let boxShadow: string
	let buttonSize: number
	let buttonPadding: number
	let fontSize: number
	switch (size) {
		case 'sm':
			boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
			buttonPadding = spacing[3]
			buttonSize = 36
			fontSize = 14
			break
		case 'lg':
			boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
			buttonPadding = spacing[4]
			buttonSize = 72
			fontSize = 16
			break
		case 'md':
		default:
			boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
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
		>
			{children}
			{ButtonChild}
		</StyledButton>
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
}

const StyledButton = styled.button<StyledButtonProps>`
	padding: 0.7rem 1.7rem;
	align-items: center;
	background-color: ${(props) => props.theme.color.grey[200]};
	border: 1px solid rgb(226, 214, 207);
	border-radius: 10px;
	box-shadow: rgb(255 252 245) -8px -8px 16px, rgb(181 176 174 / 50%) 4px 4px 8px, rgb(247 244 242) 1px 1px 0px inset; 
	color: ${(props) => (!props.disabled ? props.color : `${props.color}55`)};
	cursor: pointer;
	display: ${(props) => props.inline ? 'inline-block' : 'flex'};
	font-size: ${(props) => props.fontSize}px;
	font-weight: 700;
	height: ${(props) => props.size}px;
	justify-content: center;
	outline: none;
	padding-left: ${(props) => props.padding}px;
	padding-right: ${(props) => props.padding}px;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	width: ${(props) => props.width ? props.width : '100%'};
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
	
	&:hover, &:focus {
		transition: 0.2s;
		transform: translate(1px, 1px);
		background-color: ${(props) => lighten(0.025, props.theme.color.grey[200])};
	}
	
	&:focus {
		border-color: ${darken(0.05, 'rgb(226, 214, 207)')};
		background-color: ${(props) => darken(0.025, props.theme.color.grey[200])};
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
`

export default Button
