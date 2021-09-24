import { getEarned, getMasterChefContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import Button from 'components/Button'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import CardIcon from 'components/CardIcon'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import Tooltipped from 'components/Tooltipped'
import { Farm } from 'contexts/Farms'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/useBao'
import useFarms from 'hooks/useFarms'
import React, { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import type { CountdownRenderProps } from 'react-countdown'
import Countdown from 'react-countdown'
import { TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { useWallet } from 'use-wallet'
import { bnToDec } from 'utils'
import Config from '../../../bao/lib/config'
import useAllFarmTVL from '../../../hooks/useAllFarmTVL'
import GraphUtil from '../../../utils/graph'
import Multicall from '../../../utils/multicall'
import { decimate, getDisplayBalance } from '../../../utils/numberFormat'
import {
	StyledCardAccent,
	StyledCards,
	StyledCardWrapper,
	StyledContent,
	StyledDetail,
	StyledDetails,
	StyledExternalLink,
	StyledInsight,
	StyledLoadingWrapper,
	StyledSpacer,
	StyledTitle,
} from './styles'
import './tab-styles.css'

interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

const cardsPerRow = 3

const FarmCards: React.FC = () => {
	const bao = useBao()
	const [farms] = useFarms()
	const farmsTVL = useAllFarmTVL(bao && bao.web3, bao && bao.multicall)
	const { ethereum, account } = useWallet()

	const [baoPrice, setBaoPrice] = useState<BigNumber | undefined>()
	const [pools, setPools] = useState<any | undefined>({
		[PoolType.POLLY]: [],
		[PoolType.SUSHI]: [],
		[PoolType.ARCHIVED]: [],
	})

	useEffect(() => {
		GraphUtil.getPrice(Config.addressMap.WETH).then(async (wethPrice) => {
			const pollyPrice = await GraphUtil.getPriceFromPair(
				wethPrice,
				Config.contracts.polly[Config.networkId].address,
			)
			setBaoPrice(pollyPrice)
		})

		const _pools: any = {
			[PoolType.POLLY]: [],
			[PoolType.SUSHI]: [],
			[PoolType.ARCHIVED]: [],
		}
		if (!(ethereum && farmsTVL && bao) || pools.polly.length)
			return setPools(_pools)

		bao.multicall
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
	}, [farmsTVL, bao])

	const BLOCKS_PER_YEAR = new BigNumber(13428766) // (60 * 60 * 24 * 365.25) / 2.35 (avg Polygon block time)

	return (
		<>
			<h3 style={{ margin: '${(props) => props.theme.spacing[3]}px' }}>
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
			const earned = await getEarned(getMasterChefContract(bao), pid, account)
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
						{(farm.tokenSymbol === 'POLLY' || farm.tokenSymbol === 'nDEFI') && (
							<StyledCardAccent />
						)}
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
							<span>
								APR{' '}
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

export default FarmCards
