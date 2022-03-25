import React from 'react'
import styled from 'styled-components'
import { MaxButton } from '../Button'
import Input, { InputProps } from '../Input'

interface TokenInputProps extends InputProps {
	max: number | string
	symbol: string
	onSelectMax?: () => void
	onSelectHalf?: () => void
}

const TokenInput: React.FC<TokenInputProps> = ({
	max,
	symbol,
	onChange,
	onSelectMax,
	onSelectHalf,
	value,
}) => {
	return (
			<Input
				endAdornment={
					<StyledTokenAdornmentWrapper>
						<MaxButton onClick={onSelectHalf}>½</MaxButton>
						<MaxButton onClick={onSelectMax}>MAX</MaxButton>
					</StyledTokenAdornmentWrapper>
				}
				onChange={onChange}
				placeholder="0"
				value={value}
			/>
	)
}


const StyledTokenAdornmentWrapper = styled.div`
	align-items: center;
	display: flex;
`

const StyledTokenSymbol = styled.span`
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		display: none;
	}
`

export default TokenInput
