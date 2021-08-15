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
import { getFullDisplayBalance } from 'utils/formatBalance'
import { Contract } from 'web3-eth-contract'

interface WithdrawModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
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
					text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(val)
						setPendingTx(false)
						onDismiss()
					}}
				/>
				{/* })} */}
			</ModalActions>
			<ModalContent>
				{
					'Remember the longer you stay in a pool the lower your fee. Read the docs for details, but most users will want to stay in a pool 5 days or longer.'
				}
			</ModalContent>
		</Modal>
	)
}

export default WithdrawModal
