import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import baoIcon from '../../../assets/img/bao.png'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import useBao from '../../../hooks/useBao'
import useEarnings from '../../../hooks/useEarnings'
import useLockedEarnings from '../../../hooks/useLockedEarnings'
import useReward from '../../../hooks/useReward'
import useSubValues from '../../../hooks/useSubValues'
import useValues from '../../../hooks/useValues'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { Contract } from 'web3-eth-contract'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useNestBalance from '../../../hooks/useNestBalance'
import useNestRedeem from '../../../hooks/useNestRedeem'
import RedeemModal from './RedeemModal'
import BigNumber from 'bignumber.js'

interface RedeemProps {
	nestContract: Contract
	nid: number
	nestName: string
}

const Redeem: React.FC<RedeemProps> = ({
	nestContract,
	nid,
	nestName,
}) => {
	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(nestContract)
	const { onApprove } = useApprove(nestContract)

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const nestBalance = useNestBalance(nid)

	const { onNestRedeem } = useNestRedeem(nid)
	const [onPresentRedeem] = useModal(
		<RedeemModal
			max={nestBalance}
			onConfirm={onNestRedeem}
			nestName={nestName}
		/>,
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

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>👨🏻‍🍳</CardIcon>
						<Value value={getBalanceNumber(nestBalance)} />
						<Label text={`Redeem ${nestName} for WETH`} />
					</StyledCardHeader>
					<StyledCardActions>
						{!allowance.toNumber() ? (
							<Button
								disabled={requestedApproval}
								onClick={handleApprove}
								text={`Approve ${nestName}`}
							/>
						) : (
							<>
								<Button
									disabled={nestBalance.eq(new BigNumber(0))}
									text="Redeem"
									onClick={onPresentRedeem}
								/>
							</>
						)}
					</StyledCardActions>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

const StyledCardHeader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`
const StyledCardActions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: ${(props) => props.theme.spacing[6]}px;
	width: 100%;
`

const StyledSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default Redeem
