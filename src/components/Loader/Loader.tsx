import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'
import CardIcon from '../CardIcon'

interface LoaderProps {
	text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
	return (
		<StyledLoader>
			<CardIcon>
				<StyledBao>🥟</StyledBao>
			</CardIcon>
			{!!text && <StyledText>{text}</StyledText>}
		</StyledLoader>
	)
}

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const StyledLoader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const StyledBao = styled.div`
	font-size: 32px;
	position: relative;
	animation: 1s ${spin} infinite;
`

const StyledText = styled.div`
	color: ${(props) => props.theme.color.grey[400]};
`

interface SpinnerProps {
	block?: boolean
}

export const SpinnerLoader: React.FC<SpinnerProps> = ({ block }) => {
	let style: any = {
		color: `${(props: any) => props.theme.color.grey[100]}`,
	}
	if (block)
		style = {
			...style,
			display: 'block',
			margin: 'auto'
		}

	return (
		<Spinner
			animation="border"
			size="sm"
			style={style}
		/>
	)
}

export default Loader
