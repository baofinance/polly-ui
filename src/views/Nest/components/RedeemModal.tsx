import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Modal, { ModalProps } from 'components/Modal'
import ModalActions from 'components/ModalActions'
import ModalTitle from 'components/ModalTitle'
import TokenInput from 'components/TokenInput'
import React, { useCallback, useMemo, useState } from 'react'
import { getFullDisplayBalance } from 'utils/numberFormat'
import { Contract } from 'web3-eth-contract'
import { CloseButton } from './styles'
import { Form, FloatingLabel } from 'react-bootstrap'
import useNestRedeem from '../../../hooks/useNestRedeem'
import styled from 'styled-components'
import useAllowancev2 from '../../../hooks/useAllowancev2'
import useBao from '../../../hooks/useBao'
import useApprovev2 from '../../../hooks/useApprovev2'

interface WithdrawModalProps extends ModalProps {
	max: BigNumber
	nestName: string
	nestContract: Contract
	nid: number
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
	onDismiss,
	max,
	nid,
	nestName,
	nestContract,
}) => {
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)
	const [redeemToWeth, setRedeemToWeth] = useState(true)
	const [confNo, setConfNo] = useState<number | undefined>()

	const bao = useBao()
	const { onNestRedeem } = useNestRedeem(nid, redeemToWeth)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const [requestedApproval, setRequestedApproval] = useState(false)

	// TODO: per-nest redeem contracts in config, or just make one contract that can redeem all nests
	const redeemAllowance = useAllowancev2(
		nestContract.options.address,
		bao.getContract('nDefiRedeem').options.address,
	)
	const { onApprove: onApproveRedeem } = useApprovev2(
		nestContract,
		bao.getContract('nDefiRedeem'),
	)

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const inputAmount = e.currentTarget.value
			if (inputAmount.length === 0) setVal('')
			if (
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return
			setVal(inputAmount)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	const handleSelectHalf = useCallback(() => {
		setVal(
			max
				.div(10 ** 18)
				.div(2)
				.toString(),
		)
	}, [fullBalance, setVal])

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApproveRedeem()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApproveRedeem, setRequestedApproval])

	return (
		<Modal>
			<CloseButton onClick={onDismiss}>
				<FontAwesomeIcon icon="window-close" />
			</CloseButton>
			<ModalTitle text={`Redeem ${nestName}`} />
			<TokenInput
				onSelectMax={handleSelectMax}
				onSelectHalf={handleSelectHalf}
				onChange={handleChange}
				value={val}
				max={fullBalance}
				symbol={nestName}
			/>
			<br />
			{/* TODO: Add approval for weth redeem contract */}
			<FloatingLabel controlId="floatingSelect" label="Redeem To">
				<RedeemToChoice
					aria-label="Redeem To"
					onChange={(e: any) =>
						setRedeemToWeth(e.currentTarget.value === 'wETH')
					}
				>
					<option>wETH</option>
					<option>Underlying Tokens</option>
				</RedeemToChoice>
			</FloatingLabel>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				{redeemToWeth && redeemAllowance && !redeemAllowance.gt(0) ? (
					<Button
						disabled={requestedApproval}
						onClick={handleApprove}
						text={`Approve ${nestName}`}
					/>
				) : (
					<Button
						disabled={
							pendingTx ||
							val.slice(-1) === '.' ||
							isNaN(parseFloat(val)) ||
							parseFloat(val) === 0 ||
							parseFloat(val) < 0 ||
							parseFloat(val) > max.div(10 ** 18).toNumber()
						}
						text={
							confNo
								? `Confirmations: ${confNo}/15`
								: pendingTx
								? 'Pending Confirmation'
								: 'Confirm'
						}
						onClick={async () => {
							setPendingTx(true)
							onNestRedeem(val)
								.on('confirmation', (_confNo: any) => {
									setConfNo(_confNo)
									if (_confNo >= 15) {
										setConfNo(undefined)
										setPendingTx(false)
										onDismiss()
										window.location.reload()
									}
								})
								.on('error', () => {
									setConfNo(undefined)
									setPendingTx(false)
								})
						}}
					/>
				)}
			</ModalActions>
		</Modal>
	)
}

const RedeemToChoice = styled(Form.Select)`
	background-color: ${(props) => props.theme.color.transparent[100]};
	color: ${(props) => props.theme.color.text[100]};
	border: none;
	border-radius: ${(props) => props.theme.borderRadius}px;
	height: 72px;

	&:active,
	&:focus {
		outline: none;
		box-shadow: none;
	}

	option {
		background-color: ${(props) => props.theme.color.secondary[400]};
	}
`

export default WithdrawModal
