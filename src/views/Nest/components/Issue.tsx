import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { PoolType } from '../../../contexts/Farms/types'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useNestIssue from '../../../hooks/useNestIssue'
import useNestBalance from '../../../hooks/useNestBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import IssueModal from './IssueModal'

interface IssueProps {
	nestContract: Contract
	nid: number
	nestName: string
}

const Issue: React.FC<IssueProps> = ({
	nestContract,
	nid,
	nestName,
}) => {
	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(nestContract)
	const { onApprove } = useApprove(nestContract)

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const nestBalance = useNestBalance(nid)

	const { onIssue } = useNestIssue(nid)

	const [onPresentDeposit] = useModal(
		<IssueModal
			max={tokenBalance}
			onConfirm={onIssue}
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
						<Value value={getBalanceNumber(tokenBalance)} />
						<Label text={`Issue ${nestName} with WETH`} />
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
									<IconButton onClick={onPresentDeposit}>
										<AddIcon />
									</IconButton>
								) : (
									''
								)
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

const StyledActionSpacer = styled.div`
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

export default Issue
