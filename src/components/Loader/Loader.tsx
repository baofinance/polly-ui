import React from 'react'
import { Spinner } from 'react-bootstrap'
import styled, { keyframes } from 'styled-components'

interface LoaderProps {
	text?: string
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
	return (
		<StyledLoader>
			<SpinnerLoader />
			{!!text && <StyledText>{text}</StyledText>}
		</StyledLoader>
	)
}

const StyledLoader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const StyledText = styled.div`
	color: ${(props) => props.theme.color.text[200]};
`

interface SpinnerProps {
	block?: boolean
}

export const SpinnerLoader: React.FC<SpinnerProps> = ({ block }) => {
	let style: any = {
		color: `${(props: any) => props.theme.color.text[100]}`,
	}
	if (block)
		style = {
			...style,
			display: 'block',
			margin: 'auto',
		}

	return <Spinner animation="grow" size="sm" style={style} />
}

export const PageLoader: React.FC<SpinnerProps> = ({ block }) => {
	let style: any = {
		color: `${(props: any) => props.theme.color.text[100]}`,
	}
	if (block)
		style = {
			...style,
			display: 'block',
			margin: 'auto',
		}

	return (
		<StyledLoadingWrapper>
			<Spinner animation="grow" size="sm" style={style} />
		</StyledLoadingWrapper>
	)
}

export const StyledLoadingWrapper = styled.div`
	align-items: center;
	justify-content: center;
	text-align: center;
	color: ${(props) => props.theme.color.text[200]};
`

export default Loader
