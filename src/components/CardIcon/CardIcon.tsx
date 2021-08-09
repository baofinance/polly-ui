import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

interface CardIconProps {
	children?: React.ReactNode
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
	<StyledCardIcon>{children}</StyledCardIcon>
)

const StyledCardIcon = styled.div`
	background-color: ${(props) => darken(0.05, props.theme.color.darkGrey[100])};
	font-size: 36px;
	height: 80px;
	width: 80px;
	border-radius: 40px;
	align-items: center;
	display: flex;
	justify-content: center;
	box-shadow: inset 4px 4px 8px ${(props) => props.theme.color.darkGrey[200]},
		inset -6px -6px 12px ${(props) => props.theme.color.darkGrey[100]};
	margin: 0 auto ${(props) => props.theme.spacing[3]}px;
`

export default CardIcon
