import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addressMap } from 'bao/lib/constants'
import { fetchCalcToNest, getRecipeContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import { SpinnerLoader } from 'components/Loader'
import Modal, { ModalProps } from 'components/Modal'
import ModalActions from 'components/ModalActions'
import ModalContent from 'components/ModalContent'
import ModalTitle from 'components/ModalTitle'
import NestTokenInput from 'components/NestTokenInput'
import NestTokenOutput from 'components/NestTokenOutput'
import Spacer from 'components/Spacer'
import useBao from 'hooks/useBao'
import useInputAllowance from 'hooks/useInputAllowance'
import useInputApprove from 'hooks/useInputApprove'
import useNestIssue from 'hooks/useNestIssue'
import useNestRate from 'hooks/useNestRate'
import useTokenBalance from 'hooks/useTokenBalance'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/formatBalance'
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
	const { wethPerIndex } = useNestRate(nestAddress)

	const fetchRate = async () => {
		return fetchCalcToNest(recipeContract, _outputToken, 1)
	}

	const handleOutputChange = useCallback(
		(e) => {
			const updateInput = (inputAmount: string) => {
				fetchRate().then((val) =>
					setWethNeeded(val.times(inputAmount).times(1.05).toFixed(18)),
				)
			}

			if (typeof e === 'string') {
				return updateInput(e)
			}

			const inputAmount = e.currentTarget.value

			if (inputAmount.length === 0) {
				setNestAmount('')
				setWethNeeded('')
				return
			}
			if (
				isNaN(parseFloat(inputAmount)) ||
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return

			setNestAmount(inputAmount)
			updateInput(inputAmount)
		},
		[setNestAmount],
	)

	const handleInputChange = useCallback(
		(e) => {
			const updateInput = (inputAmount: string) => {
				fetchRate().then((val: BigNumber) =>
					setNestAmount(new BigNumber(inputAmount).div(val).toFixed(18)),
				)
			}

			if (typeof e === 'string') {
				return updateInput(e)
			}

			const inputAmount = e.currentTarget.value

			if (e.currentTarget.value.length === 0) {
				setNestAmount('')
				setWethNeeded('')
				return
			}
			if (
				isNaN(parseFloat(inputAmount)) ||
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return

			setWethNeeded(inputAmount)
			updateInput(inputAmount)
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
	const wethBalance = useTokenBalance(addressMap.WETH)

	return (
		<Modal>
			<CloseButton onClick={onDismiss}>
				<FontAwesomeIcon icon="window-close" />
			</CloseButton>
			<ModalTitle text={`Issue ${nestName}`} />
			<ModalContent>
				{
					'Polly uses your wETH to buy the underlying assets for you from Sushiswap. Minting transactions send 5% more wETH to avoid unexpected errors like slippage, any unused WETH is returned.'
				}
				<br />
				<br />
				<b>
					Your wETH Balance:{' '}
					{(wethBalance && getDisplayBalance(wethBalance)) || <SpinnerLoader />}{' '}
					<FontAwesomeIcon icon={['fab', 'ethereum']} />
				</b>
				<br />
				<b>
					1 {nestName} ={' '}
					<>
						{(wethPerIndex && getDisplayBalance(wethPerIndex, 0)) || (
							<SpinnerLoader />
						)}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} />
					</>
				</b>
			</ModalContent>
			<NestTokenOutput
				value={nestAmount}
				onChange={handleOutputChange}
				symbol={nestName}
				_outputToken={_outputToken}
				addInput={(n: number) => {
					const result = new BigNumber(nestAmount === '' ? 0 : nestAmount).plus(
						n,
					)
					if (result.toNumber() >= 0) {
						setNestAmount(result.toString())
						handleOutputChange(result.toString())
					}
				}}
			/>
			<Spacer />
			<NestTokenInput
				setValue={(num: string) => {
					setWethNeeded(num)
					handleInputChange(num)
				}}
				value={wethNeeded}
				onChange={handleInputChange}
				symbol={inputTokenName}
				_inputToken={_inputToken}
				wethBalance={wethBalance}
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
						disabled={
							pendingTx ||
							wethNeeded.slice(-1) === '.' ||
							nestAmount.slice(-1) === '.' ||
							isNaN(parseFloat(wethNeeded)) ||
							parseFloat(wethNeeded) === 0 ||
							parseFloat(wethNeeded) < 0 ||
							parseFloat(wethNeeded) > wethBalance.div(10 ** 18).toNumber()
						}
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

export const CloseButton = styled.a`
	float: right;
	top: 15px;
	right: 25px;
	font-size: 24px;
	position: absolute;
	color: ${(props) => props.theme.color.grey[100]};

	&:hover {
		cursor: pointer;
	}
`

export default IssueModal
