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
		<StyledTokenInput>
			<StyledMaxText>
				{max.toLocaleString()} {symbol} Available
			</StyledMaxText>
			<Input
				endAdornment={
					<StyledTokenAdornmentWrapper>
							<MaxButton onClick={onSelectHalf}>½</MaxButton>
							<MaxButton onClick={onSelectMax}>MAX</MaxButton>
						<StyledTokenSymbol>{symbol}</StyledTokenSymbol>
					</StyledTokenAdornmentWrapper>
				}
				onChange={onChange}
				placeholder="0"
				value={value}
			/>
		</StyledTokenInput>
	)
}

const StyledTokenInput = styled.div``

const StyledTokenAdornmentWrapper = styled.div`
	align-items: center;
	display: flex;
`

const StyledMaxText = styled.div`
	align-items: center;
	color: ${(props) => props.theme.color.grey[100]};
	display: flex;
	font-size: 1rem;
	font-weight: 700;
	height: 44px;
	justify-content: flex-end;

	@media (max-width: 576px){
		font-size: 0.75rem;
	}
`

const StyledTokenSymbol = styled.span`
	color: ${(props) => props.theme.color.grey[100]};
	font-weight: 700;
`

export default TokenInput
