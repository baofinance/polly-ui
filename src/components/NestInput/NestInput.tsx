import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'

export interface InputProps {
	endAdornment?: React.ReactNode
	placeholder?: string
	startAdornment?: React.ReactNode
	value: any
	setValue?: Function
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	wethBalance?: BigNumber
}

const NestInput: React.FC<InputProps> = ({
	endAdornment,
	placeholder,
	startAdornment,
	value,
	setValue,
	onChange,
	wethBalance,
}) => {
	return (
		<StyledInputWrapper>
			{!!startAdornment && startAdornment}
			<StyledInput
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{wethBalance && setValue && (
				<>
					<MaxButton onClick={() => { setValue(wethBalance.div(10 ** 18).div(2).toFixed(18)) }}>
						½
					</MaxButton>
					<MaxButton onClick={() => { setValue(wethBalance.div(10 ** 18).toFixed(18)) }}>MAX</MaxButton>
				</>
			)}
			{!!endAdornment && endAdornment}
		</StyledInputWrapper>
	)
}

const MaxButton = styled.a`
	padding: 5px;
	border: 1px solid ${(props) => props.theme.color.grey[500]};
	color: ${(props) => props.theme.color.grey[500]};
	border-radius: 5px;
	vertical-align: middle;
	margin-right: 10px;
	transition: 100ms;

	&:hover {
		background-color: ${(props) => props.theme.color.grey[300]};
		color: #524d4d;
		cursor: pointer;
	}
`

const StyledInputWrapper = styled.div`
	align-items: center;
	background-color: ${(props) => props.theme.color.grey[200]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	box-shadow: inset 4px 4px 8px ${(props) => props.theme.color.grey[300]},
		inset -6px -6px 12px ${(props) => props.theme.color.grey[100]};
	display: flex;
	height: 72px;
	padding: 0 ${(props) => props.theme.spacing[3]}px;
`

const StyledInput = styled.input`
	background: none;
	border: 0;
	color: ${(props) => props.theme.color.grey[600]};
	font-size: 18px;
	flex: 1;
	height: 56px;
	margin: 0;
	padding: 0;
	outline: none;
`

export default NestInput
