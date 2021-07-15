import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalContent from '../../../components/ModalContent'
import ModalTitle from '../../../components/ModalTitle'
import NestTokenOutput from '../../../components/NestTokenOutput'
import NestTokenInput from '../../../components/NestTokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import { fetchCalcToNest } from '../../../bao/utils'
import debounce from 'debounce'
import { ethers } from "ethers";
import useBao from '../../../hooks/useBao'
import { getRecipeContract } from '../../../bao/utils'
import { Contract } from 'web3-eth-contract'

interface IssueModalProps extends ModalProps {
	onConfirm: (amount: string) => void
	nestName?: string
	inputTokenName?: string
	nestAddress?: string
	_inputToken?: string
	_outputToken?: string
}

const IssueModal: React.FC<IssueModalProps> = ({
	onConfirm,
	onDismiss,
	nestName = '',
	nestAddress = '',
	inputTokenName = '',
	_inputToken = '',
	_outputToken = '',
}) => {
	const [nestAmount, setNestAmount] = useState('')
	const [wethNeeded, setWethNeeded] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

	const handleOutputChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setNestAmount(e.currentTarget.value)
		},
		[setNestAmount],
	)

	const handleInputChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setWethNeeded(e.currentTarget.value)
		},
		[setWethNeeded],
	)


	const bao = useBao()
	const recipeContract = getRecipeContract(bao)
  
	return (
		<Modal>
			<ModalTitle text={`Issue ${nestName} Tokens`} />
			<ModalContent>
				{
					"Use WETH to mint your nest! Polly buys the underlying assets for you from Sushiswap, beacuse of that slippage might apply. Minting transactions send 5% more WETH to avoid unexpected errors, any unused WETH is returned."
				}
			</ModalContent>
			<NestTokenOutput
				value={nestAmount}
				onChange={handleOutputChange}
				symbol={nestName}
				_outputToken={_outputToken}
			/>
			<ModalContent>
			</ModalContent>
			<NestTokenInput
				value={wethNeeded}
				onChange={handleInputChange}
				symbol={inputTokenName}
				_inputToken={_inputToken}
			/>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				<Button
					disabled={pendingTx}
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(nestAmount)
						setPendingTx(false)
						onDismiss()
					}}
				/>
			</ModalActions>
		</Modal>
	)
}

export default IssueModal
