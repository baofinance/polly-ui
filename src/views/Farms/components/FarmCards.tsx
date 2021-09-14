import { getEarned, getMasterChefContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardIcon from 'components/CardIcon'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import { Farm } from 'contexts/Farms'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/useBao'
import useFarms from 'hooks/useFarms'
import useAllFarmTVL from '../../../hooks/useAllFarmTVL'
import useMulticall from '../../../hooks/useMulticall'
import { lighten } from 'polished'
import React, { useEffect, useState } from 'react'
import type { CountdownRenderProps } from 'react-countdown'
import Countdown from 'react-countdown'
import { decimate, getDisplayBalance } from '../../../utils/formatBalance'
import { TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import { bnToDec } from 'utils'
import './tab-styles.css'
import GraphUtil from '../../../utils/graph'
import Multicall from '../../../utils/multicall'
import { addressMap, contractAddresses } from '../../../bao/lib/constants'
import { Badge } from 'react-bootstrap'
import Tooltipped from 'components/Tooltipped'

interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

const cardsPerRow = 3

const FarmCards: React.FC = () => {
	const bao = useBao()
	const multicall = useMulticall()
	const [farms] = useFarms()
	const farmsTVL = useAllFarmTVL(bao && bao.web3, multicall)
	const { ethereum, account } = useWallet()

	const [baoPrice, setBaoPrice] = useState<BigNumber | undefined>()
	const [pools, setPools] = useState<any | undefined>({
		[PoolType.POLLY]: [],
		[PoolType.SUSHI]: [],
		[PoolType.ARCHIVED]: [],
	})

	useEffect(() => {
		GraphUtil.getPrice(addressMap.WETH).then(async (wethPrice) => {
			const pollyPrice = await GraphUtil.getPriceFromPair(
				wethPrice,
				contractAddresses.polly[137],
			)
			setBaoPrice(pollyPrice)
		})

		const _pools: any = {
			[PoolType.POLLY]: [],
			[PoolType.SUSHI]: [],
			[PoolType.ARCHIVED]: [],
		}
		if (!(ethereum && farmsTVL && bao && multicall) || pools.polly.length)
			return setPools(_pools)

		multicall
			.call(
				Multicall.createCallContext([
					{
						ref: 'masterChef',
						contract: getMasterChefContract(bao),
						calls: farms
							.map((farm, i) => {
								return {
									ref: i.toString(),
									method: 'getNewRewardPerBlock',
									params: [farm.pid + 1],
								}
							})
							.concat(
								farms.map((farm, i) => {
									return {
										ref: (farms.length + i).toString(),
										method: 'userInfo',
										params: [farm.pid, account],
									}
								}) as any,
							),
					},
				]),
			)
			.then(async (_result: any) => {
				const result = await Multicall.parseCallResults(_result)

				for (let i = 0; i < farms.length; i++) {
					const farm = farms[i]
					const tvlInfo = farmsTVL.tvls.find(
						(fTVL: any) =>
							fTVL.lpAddress.toLowerCase() ===
							farm.lpTokenAddress.toLowerCase(),
					)
					const farmWithStakedValue = {
						...farm,
						poolType: farm.poolType || PoolType.POLLY,
						tvl: tvlInfo.tvl,
						stakedUSD: decimate(
							result.masterChef[farms.length + i].values[0].hex,
						)
							.div(decimate(tvlInfo.lpStaked))
							.times(tvlInfo.tvl),
						apy:
							baoPrice && farmsTVL
								? baoPrice
										.times(BLOCKS_PER_YEAR)
										.times(
											new BigNumber(result.masterChef[i].values[0].hex).div(
												10 ** 18,
											),
										)
										.div(tvlInfo.tvl)
								: null,
					}

					_pools[farmWithStakedValue.poolType].push(farmWithStakedValue)
				}
				setPools(_pools)
			})
	}, [farmsTVL, bao, multicall])

	const BLOCKS_PER_YEAR = new BigNumber(13428766) // (60 * 60 * 24 * 365.25) / 2.35 (avg Polygon block time)

	return (
		<>
			<h3 style={{ margin: '1rem' }}>
				<Badge bg="secondary" className="pollyTicker">
					Polly Price:{' '}
					{baoPrice ? `$${getDisplayBalance(baoPrice, 0)}` : <SpinnerLoader />}
				</Badge>
			</h3>
			<Spacer size="md" />
			<Tabs>
				<TabPanel>
					<StyledCards>
						{pools[PoolType.POLLY] && pools[PoolType.POLLY].length ? (
							pools[PoolType.POLLY].map((farm: any, i: number) => (
								<React.Fragment key={i}>
									<FarmCard farm={farm} />
									{(i + 1) % cardsPerRow !== 0 && <StyledSpacer />}
								</React.Fragment>
							))
						) : (
							<StyledLoadingWrapper>
								<SpinnerLoader />
							</StyledLoadingWrapper>
						)}
					</StyledCards>
				</TabPanel>
				<TabPanel>
					<StyledCards>
						{pools[PoolType.SUSHI] && [PoolType.SUSHI].length ? (
							pools[PoolType.SUSHI].map((farm: any, i: number) => (
								<React.Fragment key={i}>
									<FarmCard farm={farm} />
									{(i + 1) % cardsPerRow !== 0 && <StyledSpacer />}
								</React.Fragment>
							))
						) : (
							<StyledLoadingWrapper>
								<SpinnerLoader />
							</StyledLoadingWrapper>
						)}
					</StyledCards>
				</TabPanel>
				<TabPanel>
					<StyledCards>
						{pools[PoolType.ARCHIVED] && pools[PoolType.ARCHIVED].length ? (
							pools[PoolType.ARCHIVED].map((farm: any, i: number) => (
								<React.Fragment key={i}>
									<FarmCard farm={farm} />
									{(i + 1) % cardsPerRow !== 0 && <StyledSpacer />}
								</React.Fragment>
							))
						) : (
							<StyledLoadingWrapper>
								<SpinnerLoader />
							</StyledLoadingWrapper>
						)}
					</StyledCards>
				</TabPanel>
			</Tabs>
		</>
	)
}

interface FarmCardProps {
	farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
	const [startTime, setStartTime] = useState(0)
	const [harvestable, setHarvestable] = useState(0)

	const { account } = useWallet()
	const { pid } = farm
	const bao = useBao()

	const renderer = (countdownProps: CountdownRenderProps) => {
		const { hours, minutes, seconds } = countdownProps
		const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
		const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
		const paddedHours = hours < 10 ? `0${hours}` : hours
		return (
			<span style={{ width: '100%' }}>
				{paddedHours}:{paddedMinutes}:{paddedSeconds}
			</span>
		)
	}

	useEffect(() => {
		async function fetchEarned() {
			if (bao) return
			const earned = await getEarned(
				getMasterChefContract(bao),
				pid,
				account,
			)
			setHarvestable(bnToDec(earned))
		}
		if (bao && account) {
			fetchEarned()
		}
	}, [bao, pid, account, setHarvestable])

	const poolActive = true // startTime * 1000 - Date.now() <= 0
	const nestMint = 'Get ' + farm.tokenSymbol
	const destination = farm.refUrl
	const pairLink = farm.pairUrl

	return (
		<StyledCardWrapper>
			<Card>
				<CardContent>
					<StyledContent>
						{farm.tokenSymbol === 'POLLY' && <StyledCardAccent />}
						{farm.tokenSymbol === 'nDEFI' && <StyledCardAccent />}
						<CardIcon>
							<img src={farm.icon} alt="" height="50" />
						</CardIcon>
						<div style={{ height: '100px' }}>
							<StyledTitle>{farm.name}</StyledTitle>
							<StyledDetails>
								<StyledDetail>
									Deposit{' '}
									<StyledExternalLink href={pairLink} target="_blank">
										{farm.lpToken.toUpperCase()}
									</StyledExternalLink>
								</StyledDetail>
								<StyledDetail>Earn {farm.earnToken.toUpperCase()}</StyledDetail>
							</StyledDetails>
						</div>
						<Spacer />
						<Button
							disabled={!poolActive}
							text={poolActive ? 'Select' : undefined}
							to={`/farms/${farm.id}`}
						>
							{!poolActive && (
								<Countdown
									date={new Date(startTime * 1000)}
									renderer={renderer}
								/>
							)}
						</Button>
						<Spacer size="sm" />
						<Button text={nestMint} href={destination} />
						<StyledInsight>
							<span>APR {' '}
							<Tooltipped
								content={`APRs are affected by a 7-day average price of POLLY which
										has not yet stabilized.`}
							/>
							</span>
							<span>
								{farm.apy ? (
									farm.apy.gt(0) ? (
										`${farm.apy
											.times(new BigNumber(100))
											.toNumber()
											.toLocaleString('en-US')
											.slice(0, -1)}%`
									) : (
										'N/A'
									)
								) : (
									<SpinnerLoader />
								)}
							</span>
							{/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
						</StyledInsight>
						<StyledInsight>
							<span>TVL</span>
							<span>{`$${getDisplayBalance(farm.tvl, 0)}`}</span>
						</StyledInsight>
						<StyledInsight>
							<span>LP Staked (USD)</span>
							<span>{`$${getDisplayBalance(farm.stakedUSD, 0)}`}</span>
						</StyledInsight>
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
	color: ${(props) => props.theme.color.text[100]};
	font-size: 19px;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	margin: ${(props) => props.theme.spacing[2]}px 0 0;
	padding: 0;
	text-align: center;
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
	color: ${(props) => props.theme.color.text[100]};
`

const StyledInsight = styled.div`
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	border-radius: 8px;
	background: rgba(256, 256, 256, 0.1);
	color: ${(props) => props.theme.color.text[100]};
	width: 100%;
	margin-top: 12px;
	line-height: 32px;
	font-size: 13px;
	border: 1px solid #202231;
	text-align: center;
	padding: 0 12px;
`

const StyledExternalLink = styled.a`
	color: ${(props) => props.theme.color.link[100]};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	text-decoration: none;
	&:hover {
		color: ${(props) => lighten(0.1, props.theme.color.secondary[400])};
	}
	&.active {
		color: ${(props) => lighten(0.1, props.theme.color.secondary[400])};
	}
`

export default FarmCards
