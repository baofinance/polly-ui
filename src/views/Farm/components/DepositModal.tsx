import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Modal, { ModalProps } from 'components/Modal'
import ModalActions from 'components/ModalActions'
import ModalContent from 'components/ModalContent'
import ModalTitle from 'components/ModalTitle'
import TokenInput from 'components/TokenInput'
import React, { useCallback, useMemo, useState } from 'react'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'

interface DepositModalProps extends ModalProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
}

const DepositModal: React.FC<DepositModalProps> = ({
	max,
	onConfirm,
	onDismiss,
	tokenName = '',
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

	const handleSelectHalf = useCallback(() => {
		setVal(new BigNumber(fullBalance).div(2).toString())
	}, [fullBalance, setVal])

	return (
		<Modal>
			<ModalTitle text={`Deposit ${tokenName} Tokens`} />
			<StyledInfo>
				❗️ Remember a 0.75% fee will be added to the treasury when depositing.
				75% of POLLY rewards will be locked and vested for 6 years. For more
				information, please{' '}
				<StyledExternalLink
					href="https://docs.bao.finance/franchises/polly/polly-fees-penalties"
					target="blank"
				>
					{' '}
					read the docs.
				</StyledExternalLink>
			</StyledInfo>
			<TokenInput
				value={val}
				onSelectMax={handleSelectMax}
				onSelectHalf={handleSelectHalf}
				onChange={handleChange}
				max={fullBalance}
				symbol={tokenName}
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
			<ModalContent>
				{
					"Remember a 0.75% fee will be added to the treasury when depositing but you'll earn the APY to offset it."
				}
			</ModalContent>
		</Modal>
	)
}

const StyledInfo = styled.h3`
	color: #bbb;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

const StyledExternalLink = styled.a`
	color: white;
	font-weight: 700;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
	&.active {
		color: ${(props) => props.theme.color.blue[400]};
	}
	@media (max-width: 400px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

export default DepositModal
