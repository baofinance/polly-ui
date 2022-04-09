import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styled from 'styled-components'
import { MaxButton } from '../Button'
import { InputProps } from '../NestInput'
import NestOutput from '../NestOutput'

interface NestTokenOutputProps extends InputProps {
	icon: string
	symbol: string
	_inputToken?: string
	_outputToken?: string
	value: string
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	addInput: (n: number) => void
}

const NestTokenOutput: React.FC<NestTokenOutputProps> = ({
	icon,
	symbol,
	onChange,
	value,
	_outputToken,
	addInput,
}) => {
	return (
		<StyledTokenInput>
			<NestOutput
				endAdornment={
					<>
						<MaxButton onClick={() => addInput(1)}>
							<FontAwesomeIcon icon="arrow-up" />
						</MaxButton>
						<MaxButton onClick={() => addInput(-1)}>
							<FontAwesomeIcon icon="arrow-down" />
						</MaxButton>
						<StyledTokenAdornmentWrapper>
							<StyledTokenSymbol>
								<img src={icon} />
							</StyledTokenSymbol>
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

const StyledTokenAdornmentWrapper = styled.div`
	align-items: center;
	display: flex;
`

const StyledTokenSymbol = styled.span`
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.medium};

	img {
		height: 40px;
	}
`

export default NestTokenOutput
