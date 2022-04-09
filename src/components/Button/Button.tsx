import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import styled, { ThemeContext } from 'styled-components'

interface ButtonProps {
	children?: React.ReactNode
	disabled?: boolean
	href?: string
	onClick?: () => void
	size?: 'sm' | 'md' | 'lg'
	text?: any
	to?: string
	variant?: 'default' | 'secondary' | 'tertiary'
	inline?: boolean
	width?: string
	target?: string
	border?: boolean
}

export const Button: React.FC<ButtonProps> = ({
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
	border,
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
	let fontSize: string
	switch (size) {
		case 'sm':
			boxShadow = `4px 4px 8px ${color.primary.black},
        -8px -8px 16px ${color.primary.dark};`
			buttonPadding = spacing[4]
			buttonSize = 40
			fontSize = '0.75rem'
			break
		case 'lg':
			boxShadow = `6px 6px 12px ${color.primary.black},
        -12px -12px 24px ${color.primary.dark};`
			buttonPadding = spacing[4]
			buttonSize = 72
			fontSize = '1rem'
			break
		case 'md':
		default:
			boxShadow = `6px 6px 12px ${color.primary.black},
        -12px -12px 24px -2px ${color.primary.dark};`
			buttonPadding = spacing[4]
			buttonSize = 50
			fontSize = '1rem'
	}

	const ButtonChild = useMemo(() => {
		if (to != '' && to != null) {
			return <StyledLink to={to}>{text}</StyledLink>
		} else if (href) {
			return (
				<ButtonLink href={href} target="__blank">
					{text}
				</ButtonLink>
			)
		} else {
			return text
		}
	}, [href, text, to])

	const ButtonComp = !border ? StyledButton : StyledBorderButton
	return (
		<ButtonComp
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
		</ButtonComp>
	)
}

interface StyledButtonProps {
	boxShadow: string
	color: string
	disabled?: boolean
	fontSize: string
	padding: number
	size: number
	inline: boolean
	width: string
	target?: string
}

const StyledButton = styled.button.attrs((attrs: StyledButtonProps) => ({
	target: attrs.target || '',
}))<StyledButtonProps>`
	align-items: center;
	background: ${(props) => props.theme.color.primary[200]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: none;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[400]};
	box-shadow: ${(props) => props.theme.boxShadow.default};
	padding: ${(props) => -props.theme.spacing[3]}px;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
	display: ${(props) => (props.inline ? 'inline-block' : 'flex')};
	font-size: ${(props) => props.fontSize};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	height: ${(props) => props.size}px;
	justify-content: center;
	outline: none;
	padding-left: ${(props) => props.padding}px;
	padding-right: ${(props) => props.padding}px;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	width: ${(props) => (props.width ? props.width : '100%')};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	position: relative;
	transition: .6s;
	overflow: hidden;

	@media (max-width: 960px) {
		/* margin: 0 0.5rem 0 0.5rem; */
		text-align: center;
		text-decoration: none;
		padding: ${(props) => -props.theme.spacing[1]}px
			${(props) => -props.theme.spacing[3]}px;
	}
	@media (max-width: 640px) {
		width: 100%;
		padding: ${(props) => -props.theme.spacing[3]}px
			${(props) => -props.theme.spacing[3]}px;
	}

	&:focus {
		outline: 0;
	}

	&:before{
		content: '';
		display: block;
		position: absolute;
		background: ${(props) => props.theme.color.transparent[300]};
		width: 60px;
		height: 100%;
		left: 0;
		top: 0;
		opacity: .5;
		filter: blur(30px);
		transform: translateX(-100px)  skewX(-15deg);
	  }
	  &:after{
		content: '';
		display: block;
		position: absolute;
		background: ${(props) => props.theme.color.transparent[200]};
		width: 30px;
		height: 100%;
		left: 30px;
		top: 0;
		opacity: 0;
		filter: blur(5px);
		transform: translateX(-100px) skewX(-15deg);
	  }
	  &:hover{
		background: ${(props) => props.theme.color.primary[100]};
		cursor: pointer;
		&:before{
		  transform: translateX(500px)  skewX(-15deg);  
		  opacity: 0.6;
		  transition: .7s;
		}
		&:after{
		  transform: translateX(500px) skewX(-15deg);  
		  opacity: 1;
		  transition: .7s;
		}
	  }
	}

	&:hover,
	&:focus,
	&:active {
		color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')} !important;
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 50px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.text[100]};
	}
`

const ButtonLink = styled.a`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 50px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;

	&:hover,
	&:focus {
		color: ${(props) => props.theme.color.text[100]};
	}
`

export const MaxButton = styled.button`
	padding: ${(props) => props.theme.spacing[2]}px;
	color: ${(props) => props.theme.color.text[100]};
	background: ${(props) => props.theme.color.primary[200]};
	vertical-align: middle;
	margin-right: ${(props) => props.theme.spacing[2]}px;
	transition: 200ms;
	user-select: none;
	text-decoration: none;
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: none;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[400]};
	box-shadow: ${(props) => props.theme.boxShadow.default};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	font-size: ${(props) => props.theme.fontSize.sm};

	  &:hover{
		background: ${(props) => props.theme.color.primary[100]};
		cursor: pointer;
	  }
	}
`

export const StyledBorderButton = styled(StyledButton)`
	background: ${(props) => props.theme.buttonGradient.a};
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: 1.75px solid transparent;
	padding: ${(props) => -props.theme.spacing[3]}px;

	&:hover,
	&:focus,
	&:active {
		background: ${(props) => props.theme.buttonGradient.hover};
		border: 1.75px solid transparent;
	}
`

type NavButtonProps = {
	onClick: (s: any) => void
	active: string
	options: string[]
}

export const NavButtons = ({ options, active, onClick }: NavButtonProps) => (
	<NavButtonWrapper>
		{options.map((option: string) => (
			<NavButton
				key={option}
				className={option === active ? 'buttonActive' : 'buttonInactive'}
				onClick={() => onClick(option)}
			>
				{option}
			</NavButton>
		))}
	</NavButtonWrapper>
)

const NavButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	cursor: pointer;
	padding: 12px;
`

const NavButton = styled.button`
	display: flex;
	justify-content: center;
	width: 100%;
	padding: 0.5rem;
	margin: 0.25rem;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	font-size: ${(props) => props.theme.fontSize.default};
	transition: 200ms;
	height: 48px;
	align-items: center;
	vertical-align: middle;
	line-height: 1;
	transition-property: all;
	min-width: 2.5rem;
	padding-inline-start: 1rem;
	padding-inline-end: 1rem;
	border-radius: 8px;
	overflow: hidden;
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: none;
	border-bottom: none;
	box-shadow: ${(props) => props.theme.boxShadow.default};
	background: ${(props) => props.theme.color.transparent[100]};

	&:focus {
		outline: 0;
	}

	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.color.text[100]};
	}

	&:hover,
	&:focus,
	&:active {
		cursor: ${(props) =>
			props.disabled ? 'not-allowed' : 'pointer'} !important;
		color: ${(props) => props.theme.color.text[100]};
		background: ${(props) => props.theme.color.primary[100]};
	}
`

type CloseButtonProps = {
	onClick: (s: any) => void
	onHide: () => void
}

export const CloseButton = ({ onHide }: CloseButtonProps) => (
	<StyledCloseButton onClick={onHide}>
		<FontAwesomeIcon icon="times" />
	</StyledCloseButton>
)

export const CloseButtonLeft = ({ onHide }: CloseButtonProps) => (
	<StyledCloseButtonLeft onClick={onHide}>
		<FontAwesomeIcon icon="times" />
	</StyledCloseButtonLeft>
)

export const StyledCloseButton = styled.a`
	float: right;
	top: ${(props) => props.theme.spacing[3]}px;
	right: ${(props) => props.theme.spacing[4]}px;
	font-size: 1.5rem;
	position: absolute;
	color: ${(props) => props.theme.color.text[100]};

	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.color.text[100]};
	}
`

export const StyledCloseButtonLeft = styled.a`
	float: left;
	top: ${(props) => props.theme.spacing[3]}px;
	left: ${(props) => props.theme.spacing[4]}px;
	font-size: 1.5rem;
	position: absolute;
	color: ${(props) => props.theme.color.text[100]};

	&:hover {
		cursor: pointer;
		color: ${(props) => props.theme.color.text[100]};
	}
`

export const SubmitButton = styled.button`
	display: inline-flex;
	appearance: none;
	align-items: center;
	justify-content: center;
	user-select: none;
	position: relative;
	white-space: nowrap;
	vertical-align: middle;
	outline-offset: 2px;
	width: 100%;
	line-height: 1.2;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	transition-property: all;
	height: 50px;
	min-width: 2.5rem;
	font-size: ${(props) => props.theme.fontSize.default};
	padding-inline-start: 1rem;
	padding-inline-end: 1rem;
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: none;
	border-bottom: 1px solid ${(props) => props.theme.color.primary[400]};
	box-shadow: ${(props) => props.theme.boxShadow.default};
	background-color: ${(props) => props.theme.color.primary[200]};
	outline: transparent solid 2px;
	color: ${(props) => props.theme.color.text[100]};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	transition: 200ms;
	overflow: hidden;

	&:focus {
		outline: 0;
	}

	&:before{
		content: '';
		display: block;
		position: absolute;
		background: ${(props) => props.theme.color.transparent[300]};
		width: 60px;
		height: 100%;
		left: 0;
		top: 0;
		opacity: .5;
		filter: blur(30px);
		transform: translateX(-100px)  skewX(-15deg);
	  }
	  &:after{
		content: '';
		display: block;
		position: absolute;
		background: ${(props) => props.theme.color.transparent[200]};
		width: 30px;
		height: 100%;
		left: 30px;
		top: 0;
		opacity: 0;
		filter: blur(5px);
		transform: translateX(-100px) skewX(-15deg);
	  }
	  &:hover{
		background: ${(props) => props.theme.color.primary[100]};
		cursor: pointer;
		&:before{
		  transform: translateX(500px)  skewX(-15deg);  
		  opacity: 0.6;
		  transition: .7s;
		}
		&:after{
		  transform: translateX(500px) skewX(-15deg);  
		  opacity: 1;
		  transition: .7s;
		}
	  }
	}
	
	&:hover,
	&:focus,
	&:active {
		color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')} !important;
	}
`

export const WalletButton = styled.button`
	display: inline-flex;
	appearance: none;
	align-items: center;
	justify-content: center;
	user-select: none;
	position: relative;
	white-space: nowrap;
	vertical-align: middle;
	outline-offset: 2px;
	width: 100%;
	line-height: 1.2;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	transition-property: all;
	height: 50px;
	min-width: 2.5rem;
	font-size: ${(props) => props.theme.fontSize.default};
	padding-inline-start: 1rem;
	padding-inline-end: 1rem;
	border-radius: ${(props) => props.theme.borderRadius}px;
	border: none;
	background-color: ${(props) => props.theme.color.transparent[100]};
	outline: transparent solid 2px;
	color: ${(props) => props.theme.color.text[100]};
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	transition: 200ms;
	overflow: hidden;
	margin-bottom: 10px;

	&:focus {
		outline: 0;
	}

	  &:hover{
		background: ${(props) => props.theme.color.transparent[200]};
		cursor: pointer;
		&:before{
		  transform: translateX(500px)  skewX(-15deg);  
		  opacity: 0.6;
		  transition: .7s;
		}
		&:after{
		  transform: translateX(500px) skewX(-15deg);  
		  opacity: 1;
		  transition: .7s;
		}
	  }
	}
	
	&:hover,
	&:focus,
	&:active {
		color: ${(props) => (!props.disabled ? props.color : `${props.color}`)};
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')} !important;
	}
`

export const ButtonStack = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

export const CornerButtons = styled.a`
  float: right;
  top: ${(props) => props.theme.spacing[3]}px;
  right: ${(props) => props.theme.spacing[4]}px;
  font-size: 1.5rem;
  position: absolute;
  color: ${(props) => props.theme.color.text[100]};

  &:hover {
    cursor: pointer;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    right: 10%;
  }
`

export const CornerButton = styled.a`
  float: right;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  margin-right: ${(props) => props.theme.spacing[3]}px;
  font-size: 1.5rem;
  vertical-align: middle;
  color: ${(props) => props.theme.color.text[100]};

  &:hover {
    cursor: pointer;
  }
`

export const PrefButtons = styled.div`
  margin: auto;

  > button {
    float: left;
    margin-left: ${(props) => props.theme.spacing[2]}px;
    margin-top: ${(props) => props.theme.spacing[4]}px;
    color: ${(props) => props.theme.color.text[100]};
    border-radius: ${(props) => props.theme.borderRadius}px;
    width: 48px;
    background: ${(props) => props.theme.color.transparent[100]};

    &:hover,
    &.active,
    &:active,
    &:focus {
      color: ${(props) => props.theme.color.text[100]};
      background: ${(props) => props.theme.color.transparent[200]};
      box-shadow: none !important;
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    display: none;
  }
`

