import React from 'react'
import styled from 'styled-components'

export interface InputProps {
	endAdornment?: React.ReactNode
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	placeholder?: string
	startAdornment?: React.ReactNode
	value: string
}

const Input: React.FC<InputProps> = ({
	endAdornment,
	onChange,
	placeholder,
	startAdornment,
	value,
}) => {
	return (
		<StyledInputWrapper>
			{!!startAdornment && startAdornment}
			<StyledInput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{!!endAdornment && endAdornment}
		</StyledInputWrapper>
	)
}

const StyledInputWrapper = styled.div`
	align-items: center;
    background: rgba(0,0,0,0.4);
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	height: 72px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
	background: none;
	width: 60%;
	border: 0;
	color: ${(props) => props.theme.color.grey[100]};
	font-size: 18px;
	flex: 1;
	height: 56px;
	margin: 0;
	padding: 0;
	outline: none;
`

export default Input
