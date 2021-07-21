import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown from 'react-countdown'
import type { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Nest } from '../../../contexts/Nests'
import useNests from '../../../hooks/useNests'
import useBao from '../../../hooks/useBao'
import { getRecipeContract } from '../../../bao/utils'
import { bnToDec } from '../../../utils'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './tab-styles.css'
import { IndexType } from '../../../contexts/Nests/types'

interface NestWithIssuedTokens extends Nest {}

const cardsPerRow = 3

const NestCards: React.FC = () => {
	const [nests] = useNests()
	const { account } = useWallet()

	const indexes: { [key: string]: NestWithIssuedTokens[] } = {
		[IndexType.TEST]: [],
	}

	nests.forEach((nest, i) => {
		const nestWithIssuedTokens = {
			...nest,
			indexType: nest.indexType || IndexType.TEST,
		}

		indexes[nestWithIssuedTokens.indexType].push(nestWithIssuedTokens)
	})

	return (
		<Tabs>
			<TabPanel>
				<StyledCards>
					{indexes[IndexType.TEST].length ? (
						indexes[IndexType.TEST].map((nest, i) => (
							<React.Fragment key={i}>
								<NestCard nest={nest} />
								{(i + 1) % cardsPerRow !== 0 && <StyledSpacer />}
							</React.Fragment>
						))
					) : (
						<StyledLoadingWrapper>
							<Loader text="Cooking the rice ..." />
						</StyledLoadingWrapper>
					)}
				</StyledCards>
			</TabPanel>
		</Tabs>
	)
}

interface NestCardProps {
	nest: NestWithIssuedTokens
}

const NestCard: React.FC<NestCardProps> = ({ nest }) => {
	const { account } = useWallet()
	const { nestTokenAddress } = nest
	const bao = useBao()

	const indexActive = true // startTime * 1000 - Date.now() <= 0
	return (
		<StyledCardWrapper>
			{nest.tokenSymbol === 'BAO' && <StyledCardAccent />}
			<Card>
				<CardContent>
					<StyledContent>
						<CardIcon>
							<img src={nest.icon} alt="" height="50" />
						</CardIcon>
						<StyledTitle>{nest.name}</StyledTitle>
						<StyledDetails>
							<StyledDetail>
								Deposit {nest.nestToken.toUpperCase()}
							</StyledDetail>
						</StyledDetails>
						<Spacer />
						<Button
							disabled={!indexActive}
							text={indexActive ? 'Select' : undefined}
							to={`/nests/${nest.nid}`}
						></Button>
					</StyledContent>
				</CardContent>
			</Card>
		</StyledCardWrapper>
	)
}

const RainbowLight = keyframes`
  
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
	background: linear-gradient(
		45deg,
		rgba(255, 0, 0, 1) 0%,
		rgba(255, 154, 0, 1) 10%,
		rgba(208, 222, 33, 1) 20%,
		rgba(79, 220, 74, 1) 30%,
		rgba(63, 218, 216, 1) 40%,
		rgba(47, 201, 226, 1) 50%,
		rgba(28, 127, 238, 1) 60%,
		rgba(95, 21, 242, 1) 70%,
		rgba(186, 12, 248, 1) 80%,
		rgba(251, 7, 217, 1) 90%,
		rgba(255, 0, 0, 1) 100%
	);
	background-size: 300% 300%;
	animation: ${RainbowLight} 2s linear infinite;
	border-radius: 12px;
	filter: blur(6px);
	position: absolute;
	top: -2px;
	right: -2px;
	bottom: -2px;
	left: -2px;
	z-index: -1;
`

const StyledCards = styled.div`
	width: 900px;
	display: flex;
	flex-flow: row wrap;
	justify-content: space-evenly;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledLoadingWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	justify-content: center;
`

const StyledCardWrapper = styled.div`
	display: flex;
	margin-top: ${(props) => props.theme.spacing[4]}px;
	width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
	position: relative;
`

const StyledTitle = styled.h4`
	color: ${(props) => props.theme.color.grey[600]};
	font-size: 19px;
	font-weight: 700;
	margin: ${(props) => props.theme.spacing[2]}px 0 0;
	padding: 0;
	text-align: center;
	height: 50px;
`

const StyledContent = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

const StyledSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
	margin-top: ${(props) => props.theme.spacing[2]}px;
	text-align: center;
`

const StyledDetail = styled.div`
	color: ${(props) => props.theme.color.grey[500]};
`

const StyledInsight = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	border-radius: 8px;
	background: #fffdfa;
	color: #aa9584;
	width: 100%;
	margin-top: 12px;
	line-height: 32px;
	font-size: 13px;
	border: 1px solid #e6dcd5;
	text-align: center;
	padding: 0 12px;
`

export default NestCards
