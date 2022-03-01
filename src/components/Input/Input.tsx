import { MaxButton } from 'components/Button'
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
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	height: 72px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
	background: none;
	width: 60%;
	border: 0;
	color: ${(props) => props.theme.color.text[100]};
	font-size: 1rem;
	flex: 1;
	height: 56px;
	margin: 0;
	padding: 0;
	outline: none;
`

export default Input

export interface BalanceInputProps extends InputProps {
	label?: React.ReactNode
	onMaxClick: (e: any) => void
	disabled?: boolean
}

export const BalanceInput = ({
	value,
	label,
	onChange,
	onMaxClick,
	disabled,
}: BalanceInputProps) => (
	<BalanceInputContainer>
		<BalanceInputWrapper>
			<StyledInput
				value={value}
				onChange={onChange}
				placeholder="0"
				disabled={disabled}
			/>
			{!disabled && <MaxButton onClick={onMaxClick}>MAX</MaxButton>}
		</BalanceInputWrapper>
		{typeof label === 'string' ? <p>{label}</p> : label}
	</BalanceInputContainer>
)

const BalanceInputContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	background-color: ${(props) => props.theme.color.primary[200]};
	border-radius: 8px;
	height: 50px;
	border: none;
`

const BalanceInputWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	position: relative;
`

