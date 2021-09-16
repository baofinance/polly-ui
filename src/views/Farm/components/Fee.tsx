import React from 'react'
import styled from 'styled-components'
import useFees from 'hooks/useFees'
import useBlockDiff from 'hooks/useBlockDiff'
import { useUserFarmInfo } from '../../../hooks/useUserFarmInfo'
import Tooltipped from 'components/Tooltipped'
import { SpinnerLoader } from '../../../components/Loader'
import { StyledDocsWarning, StyledExternalLink, Warning } from './styles'

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
					href="https://docs.bao.finance/franchises/polly-finance"
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

export default Fee
