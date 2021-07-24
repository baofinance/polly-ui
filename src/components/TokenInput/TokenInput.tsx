import React from 'react'
import styled from 'styled-components'

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
						<div>
							<MaxButton onClick={onSelectHalf}>½</MaxButton>
							<MaxButton onClick={onSelectMax}>MAX</MaxButton>
						</div>
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

/*
            <div>
              <Button size="sm" text="Max" />
            </div>
*/

const StyledTokenInput = styled.div``

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
`;

const StyledSpacer = styled.div`
	width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
	align-items: center;
	display: flex;
`

const StyledMaxText = styled.div`
	align-items: center;
	color: ${(props) => props.theme.color.grey[400]};
	display: flex;
	font-size: 14px;
	font-weight: 700;
	height: 44px;
	justify-content: flex-end;
`

const StyledTokenSymbol = styled.span`
	color: ${(props) => props.theme.color.grey[600]};
	font-weight: 700;
`

export default TokenInput
