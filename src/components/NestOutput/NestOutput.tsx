import React from 'react'
import styled from 'styled-components'

export interface OutputProps {
	endAdornment?: React.ReactNode
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	placeholder?: string
	startAdornment?: React.ReactNode
	value: string
	_inputToken?: string
	_outputToken?: string
	onKeyUp?: React.ReactNode
}

const NestOutput: React.FC<OutputProps> = ({
	endAdornment,
	onChange,
	placeholder = '0',
	startAdornment,
	value,
	_inputToken,
	_outputToken,
}) => {
	return (
		<StyledOutputWrapper>
			{!!startAdornment && startAdornment}
			<StyledOutput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{!!endAdornment && endAdornment}
		</StyledOutputWrapper>
	)
}

const StyledOutputWrapper = styled.div`
	align-items: center;
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	height: 72px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledOutput = styled.input`
	width: 100%;
	min-width: 0px;
	outline-offset: 2px;
	position: relative;
	appearance: none;
	transition-property: all;
	transition-duration: 200ms;
	font-size: 1rem;
	padding-inline-start: 1rem;
	padding-inline-end: 1rem;
	height: 50px;
	text-align: start;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	padding-right: 0.5rem;
	outline: transparent solid 2px;
	border-radius: 8px;
	border-style: solid;
	border-image: initial;
	border-color: inherit;
	color: ${(props) => props.theme.color.text[100]};
	background: none;
	background-color: transparent;
	border-width: 0px;

	&:disabled {
		color: ${(props) => props.theme.color.text[200]};
	}

	@media (max-width: ${(props) => props.theme.breakpoints.md}px) {
		font-size: 0.875rem;
	}
`

export default NestOutput
