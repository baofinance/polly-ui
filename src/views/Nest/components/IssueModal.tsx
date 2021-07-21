import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalContent from '../../../components/ModalContent'
import ModalTitle from '../../../components/ModalTitle'
import NestTokenOutput from '../../../components/NestTokenOutput'
import NestTokenInput from '../../../components/NestTokenInput'
import { fetchCalcToNest } from '../../../bao/utils'
import useBao from '../../../hooks/useBao'
import { getRecipeContract } from '../../../bao/utils'
import useNestIssue from '../../../hooks/useNestIssue'
import useInputAllowance from '../../../hooks/useInputAllowance'
import useInputApprove from '../../../hooks/useInputApprove'
import { Contract } from 'web3-eth-contract'


interface IssueModalProps extends ModalProps {
	nestAddress: string
	nestContract: Contract
	nestName: string
	inputTokenContract: Contract
	inputTokenName: string
	outputTokenContract: Contract
	_inputToken?: string
	_outputToken?: string
}

const IssueModal: React.FC<IssueModalProps> = ({
	onDismiss,
	nestName,
	nestAddress,
	inputTokenName,
	_inputToken,
	_outputToken,
	inputTokenContract,
}) => {
	const [nestAmount, setNestAmount] = useState('')
	const [wethNeeded, setWethNeeded] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useInputAllowance(inputTokenContract)
	const { onApprove } = useInputApprove(inputTokenContract)

	const handleOutputChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			if (e.currentTarget.value.length === 0) {
				setNestAmount('')
				setWethNeeded('')
			}

			setNestAmount(e.currentTarget.value)

			const inputAmount = parseFloat(e.currentTarget.value)
			if (isNaN(inputAmount)) return

			fetchCalcToNest(recipeContract, _outputToken, 1)
				.then((val) => setWethNeeded(val.times(inputAmount).toFixed(18)))
		},
		[setNestAmount],
	)

	const handleInputChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			if (e.currentTarget.value.length === 0) {
				setNestAmount('')
				setWethNeeded('')
			}

			setWethNeeded(e.currentTarget.value)

			const inputAmount = parseFloat(e.currentTarget.value)
			if (isNaN(inputAmount)) return

			fetchCalcToNest(recipeContract, _outputToken, 1)
				.then((val: BigNumber) => setNestAmount(new BigNumber(inputAmount).div(val).toFixed(18)))
		},
		[setWethNeeded],
	)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	const bao = useBao()
	const recipeContract = getRecipeContract(bao)
	const { onIssue } = useNestIssue(nestAddress)

	return (
		<Modal>
			<ModalTitle text={`Issue ${nestName}`} />
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
				{!allowance.toNumber() ? (
							<Button
								disabled={requestedApproval}
								onClick={handleApprove}
								text={`Approve ${inputTokenName}`}
							/>
						) : (
				<Button
					disabled={pendingTx}
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onIssue(wethNeeded, nestAmount)
						setPendingTx(false)
						onDismiss()
					}}
				/>
				)}
			</ModalActions>
		</Modal>
	)
}

export default IssueModal
