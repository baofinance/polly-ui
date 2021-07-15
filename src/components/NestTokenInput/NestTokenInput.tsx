import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import Button from '../Button'
import NestInput, { InputProps } from '../NestInput'
import NestOutput from '../NestOutput'
import { fetchCalcToNest } from '../../bao/utils'
import Web3 from 'web3'
import { ethers } from 'ethers'

interface NestTokenInputProps extends InputProps {
	symbol: string
	_inputToken?: string
	value: string
	onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const NestTokenInput: React.FC<NestTokenInputProps> = ({
	symbol,
	onChange,
	value,
	_inputToken,
}) => {
	const recipeAbi = require('../../bao/lib/abi/recipe.json')

	const rpcUrl = 'https://rpc-mainnet.maticvigil.com'
	const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl))

	const contracts = {
		recipe: '0xF6bCa56DE573380d5424F950367d257B73E40280',
	}

	const decimate = (num: BigNumber.Value, dec = 18) =>
		new BigNumber(num).div(new BigNumber(10).pow(dec))

	const callContractWeb3 = async () => {
		const recipe = new web3.eth.Contract(recipeAbi, contracts.recipe)

		const ethNecessary = await recipe.methods
			.calcToPie(_inputToken, value)
			.call()
		console.log(`${decimate(ethNecessary)}`)
	}

	callContractWeb3()

	return (
		<StyledTokenInput>
			<NestInput
				startAdornment={
					<StyledTokenAdornmentWrapper>
						<StyledTokenSymbol>WITH</StyledTokenSymbol>
						<StyledSpacer />
					</StyledTokenAdornmentWrapper>
				}
				endAdornment={
					<StyledTokenAdornmentWrapper>
						<StyledTokenSymbol>{symbol}</StyledTokenSymbol>
					</StyledTokenAdornmentWrapper>
				}
				value={callContractWeb3}
				onChange={onChange}
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

export default NestTokenInput
