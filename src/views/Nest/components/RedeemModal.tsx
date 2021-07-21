import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import Button from '../../../components/Button'
import Modal, { ModalProps } from '../../../components/Modal'
import ModalActions from '../../../components/ModalActions'
import ModalTitle from '../../../components/ModalTitle'
import ModalContent from '../../../components/ModalContent'
import TokenInput from '../../../components/TokenInput'
import { getFullDisplayBalance } from '../../../utils/formatBalance'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useTokenBalance from '../../../hooks/useTokenBalance'
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
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
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
				onChange={handleChange}
				value={val}
				max={fullBalance}
				symbol={nestName}
			/>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
				{!allowance.toNumber() ? (
					<Button
						disabled={requestedApproval}
						onClick={handleApprove}
						text={`Approve ${nestName}`}
					/>
				) : (
					<Button
						disabled={pendingTx}
						text={pendingTx ? 'Pending Confirmation' : 'Confirm'}
						onClick={async () => {
							setPendingTx(true)
							await onConfirm(val)
							setPendingTx(false)
							onDismiss()
						}}
					/>
				)}
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
