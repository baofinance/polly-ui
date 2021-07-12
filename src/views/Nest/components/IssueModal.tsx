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

interface IssueModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	nestName?: string
	inputTokenName?: string
}

const IssueModal: React.FC<IssueModalProps> = ({
	max,
	onConfirm,
	onDismiss,
	nestName = '',
	inputTokenName = '',
}) => {
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	return (
		<Modal>
			<ModalTitle text={`Issue ${nestName} Tokens`} />
			<ModalContent>
				{
					"Use WETH to mint your nest! Polly buys the underlying assets for you from Sushiswap, beacuse of that slippage might apply. Minting transactions send 5% more WETH to avoid unexpected errors, any unused WETH is returned."
				}
			</ModalContent>
			<NestTokenOutput
				value={val}
				onSelectMax={handleSelectMax}
				onChange={handleChange}
				max={fullBalance}
				symbol={nestName}
			/>
			<NestTokenInput
				value={val}
				onSelectMax={handleSelectMax}
				onChange={handleChange}
				max={fullBalance}
				symbol={inputTokenName}
			/>
			<ModalActions>
				<Button text="Cancel" variant="secondary" onClick={onDismiss} />
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
			</ModalActions>
		</Modal>
	)
}

export default IssueModal
