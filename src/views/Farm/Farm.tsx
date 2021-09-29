import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getMasterChefContract } from 'bao/utils'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/useBao'
import useFarm from 'hooks/useFarm'
import useRedeem from 'hooks/useRedeem'
import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { getContract } from 'utils/erc20'
import { HeroSubHeader } from 'views/Home/components/styles'
import { provider } from 'web3-core'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import ExternalLink from 'components/ExternalLink'
import {
	StyledCardsWrapper,
	StyledCardWrapper,
	StyledFarm,
	StyledInfo,
	StyledLink,
} from './components/styles'

const Farm: React.FC = () => {
	const { farmId }: any = useParams()
	const {
		pid,
		lpToken,
		lpTokenAddress,
		tokenAddress,
		earnToken,
		name,
		icon,
		refUrl,
		poolType,
	} = useFarm(farmId) || {
		pid: 0,
		lpToken: '',
		lpTokenAddress: '',
		tokenAddress: '',
		earnToken: '',
		name: '',
		icon: '',
		refUrl: '',
		poolType: PoolType.POLLY,
	}

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const bao = useBao()
	const { ethereum } = useWallet()

	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, lpTokenAddress)
	}, [ethereum, lpTokenAddress])

	const { onRedeem } = useRedeem(getMasterChefContract(bao))

	const lpTokenName = useMemo(() => {
		return lpToken.toUpperCase()
	}, [lpToken])

	const earnTokenName = useMemo(() => {
		return earnToken.toUpperCase()
	}, [earnToken])

	return (
		<>
			<PageHeader
				icon={icon}
				subtitle={`Deposit ${lpTokenName}  Tokens and earn POLLY`}
				title={name}
			/>
			<StyledFarm>
				<StyledCardsWrapper>
					<StyledCardWrapper>
						<Harvest pid={pid} />
					</StyledCardWrapper>
					<Spacer />
					<StyledCardWrapper>
						<Stake
							lpContract={lpContract}
							pid={pid}
							tokenName={lpToken.toUpperCase()}
							poolType={poolType}
						/>
					</StyledCardWrapper>
				</StyledCardsWrapper>
				<Spacer size="lg" />
				<StyledInfo>
					⭐️ Every time you stake and unstake LP tokens, the contract will
					automagically harvest POLLY rewards for you!
				</StyledInfo>
				<Spacer />
				<StyledInfo>
					❗️{' '}
					<span
						style={{
							fontWeight: 700,
							color: '${(props) => props.theme.color.red}',
						}}
					>
						Attention:
					</span>{' '}
					Please familiarize yourself with the fee structure before using
					PollyChef. Deposits are subject to a 0.75% fee. Withdrawal slashing
					fee of 0.1% - 50 % will be incurred when exiting a farm, depending on
					the length of time your LP was staked. Please{' '}
					<ExternalLink
						href="https://docs.bao.finance/franchises/polly-finance"
						target="blank"
					>
						{' '}
						read the docs
					</ExternalLink>{' '}
					to familiarize yourself with fees and penalties.
				</StyledInfo>
				<Spacer size="lg" />
				<StyledLink exact activeClassName="active" to={{ pathname: '/farms' }}>
					<HeroSubHeader>
						<FontAwesomeIcon icon="arrow-left" size="xs" color="#6b9aef" /> Return to Farms
					</HeroSubHeader>
				</StyledLink>
			</StyledFarm>
		</>
	)
}

export default Farm
