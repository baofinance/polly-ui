import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getMasterChefContract } from 'bao/utils'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/useBao'
import useFarm from 'hooks/useFarm'
import useRedeem from 'hooks/useRedeem'
import React, { useEffect, useMemo } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getContract } from 'utils/erc20'
import { HeroSubHeader } from 'views/Home/components/styles'
import { provider } from 'web3-core'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

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
				<Spacer size="lg" />
				<StyledLink
					exact
					activeClassName="active"
					to={{ pathname: '/farms' }}
				>
					<HeroSubHeader>
						<FontAwesomeIcon icon="arrow-left" /> Return to Farms
					</HeroSubHeader>
				</StyledLink>
			</StyledFarm>
		</>
	)
}

const StyledFarm = styled.div`
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
	color: white;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

const StyledLink = styled(NavLink)`
	color: white;
	font-weight: 700;
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
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

export default Farm
