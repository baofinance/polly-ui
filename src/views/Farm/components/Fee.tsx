import React from 'react'
import styled from 'styled-components'
import useFees from 'hooks/useFees'
import useFirstDepositBlock from 'hooks/useFirstDepositBlock'
import useLastWithdrawBlock from 'hooks/useLastWithdrawBlock'
import useLastDepositBlock from 'hooks/useLastDepositBlock'
import useBlockDiff from 'hooks/useBlockDiff'
import Tooltipped from 'components/Tooltipped'

interface FeeProps {
	pid: number
}

const Fee: React.FC<FeeProps> = ({ pid }) => {
	const firstDepositBlock = useFirstDepositBlock(pid)
	const lastWithdrawBlock = useLastWithdrawBlock(pid)
	const lastDepositBlock = useLastDepositBlock(pid)
	const fees = useFees(pid)
	const blockDiff = useBlockDiff(pid)
	const lastInteraction = new Date(
		new Date().getTime() - 1000 * (blockDiff * 3),
	).toLocaleString()

	return (
		<StyledDocsWarning>
			<Warning>
				<b>❗BE AWARE OF WITHDRAWAL FEES❗</b>
			</Warning>
			<p>
				<b>Disclaimer</b> - The first deposit activates and each withdraw resets
				the timer for penalities and fees, this is pool based.
			</p>

			<p>Current Fee: {(fees * 100).toFixed(2)}%</p>
			<p>Blocks passed: {blockDiff}</p>
			<p>
				Last interaction: {lastInteraction.toString()} {''}
				<Tooltipped
					content="This date is an estimation, it grows more innaccurate as time passes due to block times being inconsistent. For best results please manually keep track of when you stake and unstake."
					placement="right"
				/>
			</p>
			<p>Last withdraw block: {lastWithdrawBlock}</p>

			<p>
				Please{' '}
				<StyledExternalLink
					href="https://docs.bao.finance/franchises/polly/polly-fees-penalties"
					target="blank"
				>
					{' '}
					read the docs
				</StyledExternalLink>{' '}
				to familiarize yourself with fees and penalties.
			</p>
		</StyledDocsWarning>
	)
}

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

const StyledDocsWarning = styled.span`
	color: #bbb;
	font-size: 16px;
	margin: 1rem;
	padding: 0.5rem;
	text-align: center;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;
`

const Warning = styled.h3`
	color: red;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 750px;
`

export default Fee
