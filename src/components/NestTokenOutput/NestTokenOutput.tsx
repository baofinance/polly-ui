import React from 'react'
import styled from 'styled-components'

import NestInput, { InputProps } from '../NestInput'
import NestOutput from '../NestOutput'

interface NestTokenOutputProps extends InputProps {
	symbol: string
	_inputToken?: string
	_outputToken?: string
	value: string
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	addInput: (n: number) => void
}

const NestTokenOutput: React.FC<NestTokenOutputProps> = ({
	symbol,
	onChange,
	value,
	_outputToken,
	addInput
}) => {
	return (
		<StyledTokenInput>
			<NestOutput
				startAdornment={
					<StyledTokenAdornmentWrapper>
						<StyledTokenSymbol>MINT</StyledTokenSymbol>
						<StyledSpacer />
					</StyledTokenAdornmentWrapper>
				}
				endAdornment={
					<>
						<MaxButton onClick={() => addInput(1)}>↟</MaxButton>
						<MaxButton onClick={() => addInput(-1)}>↡</MaxButton>
						<StyledTokenAdornmentWrapper>
							<StyledTokenSymbol>{symbol}</StyledTokenSymbol>
						</StyledTokenAdornmentWrapper>
					</>
				}
				onChange={onChange}
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

const MaxButton = styled.a`
	padding: 5px;
	border: 1px solid ${(props) => props.theme.color.grey[500]};
	color: ${(props) => props.theme.color.grey[500]};
	border-radius: 5px;
	vertical-align: middle;
	margin-right: 10px;
	transition: 100ms;
	user-select: none;
	
	&:hover {
		background-color: ${(props) => props.theme.color.grey[300]};
		color: #524d4d;
		cursor: pointer;
	}
`

const StyledTokenInput = styled.div``

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

export default NestTokenOutput
