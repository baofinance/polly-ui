import React from 'react'
import styled from 'styled-components'
import useFees from 'hooks/useFees'
import useBlockDiff from 'hooks/useBlockDiff'
import { useUserFarmInfo } from '../../../hooks/useUserFarmInfo'
import Tooltipped from 'components/Tooltipped'
import { SpinnerLoader } from '../../../components/Loader'

interface FeeProps {
	pid: number
}

const Fee: React.FC<FeeProps> = ({ pid }) => {
	const userInfo = useUserFarmInfo(pid)
	const blockDiff = useBlockDiff(userInfo)
	const fees = useFees(blockDiff)
	const lastInteraction =
		blockDiff &&
		new Date(new Date().getTime() - 1000 * (blockDiff * 3)).toLocaleString()

	return (
		<StyledDocsWarning>
			<p>
				<Warning>
					<b>❗BE AWARE OF WITHDRAWAL FEES❗</b>
				</Warning>
			</p>
			<p>
				<b>Disclaimer</b> - The first deposit activates and each withdraw resets
				the timer for penalities and fees, this is pool based.
			</p>

			<p>
				<b>Current Fee:</b>{' '}
				{fees ? `${(fees * 100).toFixed(2)}%` : <SpinnerLoader />}
					<br />
				<b>Last interaction:</b>{' '}
				{lastInteraction ? lastInteraction.toString() : <SpinnerLoader />} {''}
				<Tooltipped
					content="This date is an estimation, it grows more innaccurate as time passes due to block times being inconsistent. Please use blocks as a metric in order to correctly determine your current withdraw fee."
					placement="right"
				/>
					<br />
				<b>Blocks passed:</b> {blockDiff ? blockDiff : <SpinnerLoader />}
				<br />
				<b>Last withdraw block:</b>{' '}
				{userInfo ? (
					userInfo.lastWithdrawBlock === '0' ? (
						'Never Withdrawn'
					) : (
						userInfo.lastWithdrawBlock
					)
				) : (
					<SpinnerLoader />
				)}
			</p>

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
	color: ${(props) => props.theme.color.grey[100]};
	font-weight: 700;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
	&.active {
		color: ${(props) => props.theme.color.blue[400]};
	}
`

const StyledDocsWarning = styled.span`
	color: ${(props) => props.theme.color.grey[100]};
	font-size: 1rem;
	margin: 1rem;
	padding: 0.5rem;
	text-align: left;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		font-size: 0.75rem;
		padding: 0px;
		width: 100%;
		margin: 0;
	}
`

const Warning = styled.h3`
	color: #ff3333;
	font-size: 1rem;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 100%;

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		font-size: 1rem;
	}
`

export default Fee
