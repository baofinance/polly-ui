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
import useInputAllowance from '../../../hooks/useInputAllowance'
import useInputApprove from '../../../hooks/useInputApprove'
import useModal from '../../../hooks/useModal'
import useNestIssue from '../../../hooks/useNestIssue'
import useNestBalance from '../../../hooks/useNestBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { getBalanceNumber } from '../../../utils/formatBalance'
import IssueModal from './IssueModal'
import { getRecipeContract } from '../../../bao/utils'

interface IssueProps {
	nestTokenAddress: string
	nestContract: Contract
	nestName: string
	inputTokenContract: Contract
	inputTokenName: string
	outputTokenContract: Contract
}

const Issue: React.FC<IssueProps> = ({
	nestTokenAddress,
	nestContract,
	nestName,
	inputTokenContract,
	inputTokenName,
	outputTokenContract,
}) => {
	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useInputAllowance(inputTokenContract)
	const { onApprove } = useInputApprove(inputTokenContract)

	const inputTokenBalance = useTokenBalance(inputTokenContract.options.address)
	const nestTokenBalance = useTokenBalance(nestContract.options.address)

	const _inputToken = inputTokenContract.options.address
	const _outputToken = outputTokenContract.options.address

	const { onIssue } = useNestIssue(nestContract)

	const [onPresentDeposit] = useModal(
		<IssueModal
			onConfirm={onIssue}
			nestName={nestName}
			nestAddress={nestTokenAddress}
			inputTokenName={inputTokenName}
			_inputToken={_inputToken}
			_outputToken={_outputToken}
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
						<Label text={`Issue ${nestName} with WETH`} />
						<Value value={getBalanceNumber(inputTokenBalance)} />
						<Label text={`Your Total ${nestName}`} />
					</StyledCardHeader>
					<StyledCardActions>
						{!allowance.toNumber() ? (
							<Button
								disabled={requestedApproval}
								onClick={handleApprove}
								text={`Approve ${inputTokenName}`}
							/>
						) : (
							<Button
								text="Issue"
								onClick={onPresentDeposit}
							/>
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
