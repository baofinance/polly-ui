import React, { useEffect, useMemo, useCallback, useState } from 'react'
import { useParams, Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getMasterChefContract } from '../../bao/utils'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import { PoolType } from '../../contexts/Farms/types'
import useBao from '../../hooks/useBao'
import useNest from '../../hooks/useFarm'
import useRedeem from '../../hooks/useRedeem'
import { getContract } from '../../utils/erc20'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import IssueModal from './components/IssueModal'
import RedeemModal from './components/RedeemModal'
import useAllowance from '../../hooks/useAllowance'
import useApprove from '../../hooks/useApprove'
import { Contract } from 'web3-eth-contract'


const Nest: React.FC = () => {
	const { nestId }: any = useParams()
	const {
		nid,
		name,
		symbol,
		icon,
		nestAddress,
		nestContract,
	} = useNest(nestId) || {
		nid: 0,
		name: '',
		symbol: '',
		icon: '',
		nestAddress: '',
		nestContract: '',
	}

	const { path } = useRouteMatch()
	const { account } = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(nestContract)
	const { onApprove } = useApprove(nestContract)

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const nestBalance = useNestBalance(nid)

	const { onIssue } = useIssue(nid)
	const { onRedeem } = useRedeem(nid)


	const [onPresentIssue] = useModal(
		<IssueModal
			max={tokenBalance}
			onConfirm={onIssue}
			tokenName={tokenName}
		/>,
	)

	const [onPresentRedeem] = useModal(
		<RedeemModal
			max={stakedBalance}
			onConfirm={onRedeem}
			tokenName={tokenName}
		/>,
	)

	
	return (
		<>
			<PageHeader
				icon={''}
				subtitle={`Issue and Redeem Test Index`}
				title={'Test Nest'}
			/>
			<StyledNest>
				<StyledCardsWrapper>
				<Button
							onClick={onPresentWalletProviderModal}
							text="Issue"
						/>
				<Button
							onClick={onPresentWalletProviderModal}
							text="Redeem"
						/>
				</StyledCardsWrapper>
				<Spacer size="lg" />
				<StyledInfo>
					⭐️ Every time you mint a nest, BAO is burnt!
				</StyledInfo>
				<Spacer size="lg" />
			</StyledNest>
		</>
	)
}

const StyledNest = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

export default Nest
