import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { MaxButton } from '../Button'
import { InputProps } from '../NestInput'
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
	addInput,
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
						<MaxButton onClick={() => addInput(1)}>
							<FontAwesomeIcon icon="arrow-up" />
						</MaxButton>
						<MaxButton onClick={() => addInput(-1)}>
							<FontAwesomeIcon icon="arrow-down" />
						</MaxButton>
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

const StyledTokenInput = styled.div``

const StyledSpacer = styled.div`
	width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
	align-items: center;
	display: flex;
`

const StyledTokenSymbol = styled.span`
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};
`

export default NestTokenOutput
