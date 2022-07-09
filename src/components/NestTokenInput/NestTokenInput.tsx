import wethIcon from 'assets/img/assets/WETH.png'
import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import NestInput, { InputProps } from '../NestInput'

interface NestTokenInputProps extends InputProps {
	symbol: string
	_inputToken?: string
	value: string
	setValue?: any
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
	wethBalance?: BigNumber
}

const NestTokenInput: React.FC<NestTokenInputProps> = ({
	onChange,
	value,
	setValue,
	wethBalance,
}) => {
	return (
		<StyledTokenInput>
			<NestInput
				endAdornment={
					<StyledTokenAdornmentWrapper>
						<StyledTokenSymbol>
							<img src={wethIcon} />
						</StyledTokenSymbol>
					</StyledTokenAdornmentWrapper>
				}
				value={value}
				setValue={setValue}
				onChange={onChange}
				wethBalance={wethBalance}
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

export default NestTokenInput
