import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Modal, { ModalProps } from 'components/Modal'
import ModalActions from 'components/ModalActions'
import ModalContent from 'components/ModalContent'
import ModalTitle from 'components/ModalTitle'
import TokenInput from 'components/TokenInput'
import useAllowance from 'hooks/useAllowance'
import useApprove from 'hooks/useApprove'
import useTokenBalance from 'hooks/useTokenBalance'
import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Contract } from 'web3-eth-contract'

interface WithdrawModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => any
	nestName: string
	nestContract: Contract
	nid: number
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
	onConfirm,
	onDismiss,
	max,
	nestName,
	nestContract,
}) => {
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)
	const [confNo, setConfNo] = useState<number | undefined>()

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(nestContract)
	const { onApprove } = useApprove(nestContract)

	const tokenBalance = useTokenBalance(nestContract.options.address)

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
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

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
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				{/* {!allowance.toNumber() ? (
					<Button
						disabled={requestedApproval}
						onClick={handleApprove}
						text={`Approve ${nestName}`}
					/>
				) : ( */}
				<Button
					disabled={
						pendingTx ||
						val.slice(-1) === '.' ||
						isNaN(parseFloat(val)) ||
						parseFloat(val) === 0 ||
						parseFloat(val) < 0 ||
						parseFloat(val) > max.div(10 ** 18).toNumber()
					}
					text={confNo ? `Confirmations: ${confNo}/10` : pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						onConfirm(val).on('confirmation', (_confNo: any) => {
							setConfNo(_confNo)
							if (_confNo >= 10) {
								setConfNo(undefined)
								setPendingTx(false)
								onDismiss()
								window.location.reload()
							}
						})
					}}
				/>
				{/* })} */}
			</ModalActions>
			<ModalContent>
				{
					'Currently Polly only supports multi-asset withdrawals. When redeeming your nest tokens you will receive the underlying assets.'
				}
			</ModalContent>
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

export default WithdrawModal
