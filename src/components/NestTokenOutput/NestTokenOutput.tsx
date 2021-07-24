import React from 'react'
import styled from 'styled-components'

import Button from '../Button'
import NestInput, { InputProps } from '../NestInput'
import NestOutput from '../NestOutput'

interface NestTokenOutputProps extends InputProps {
	symbol: string
	_inputToken?: string
	_outputToken?: string
	value: string
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const NestTokenOutput: React.FC<NestTokenOutputProps> = ({
	symbol,
	onChange,
	value,
	_outputToken
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
					<StyledTokenAdornmentWrapper>
						<StyledTokenSymbol>{symbol}</StyledTokenSymbol>
					</StyledTokenAdornmentWrapper>
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
