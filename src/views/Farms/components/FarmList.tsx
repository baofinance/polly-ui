import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { getMasterChefContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import { Farm } from 'contexts/Farms'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/base/useBao'
import useAllFarmTVL from 'hooks/farms/useAllFarmTVL'
import useFarms from 'hooks/farms/useFarms'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'
import GraphUtil from 'utils/graph'
import Multicall from 'utils/multicall'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { FarmModal } from './Modals'
import { StyledLoadingWrapper } from './styles'

export interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

export const FarmList: React.FC = () => {
	const bao = useBao()
	const [farms] = useFarms()
	const farmsTVL = useAllFarmTVL(bao && bao.web3, bao && bao.multicall)
	const { account, library } = useWeb3React()

	const [pollyPrice, setPollyPrice] = useState<BigNumber | undefined>()
	const [pools, setPools] = useState<any | undefined>({
		[PoolType.ACTIVE]: [],
		[PoolType.ARCHIVED]: [],
	})

	const tempAddress = '0x0000000000000000000000000000000000000000'

	const userAddress = account ? account : tempAddress

	useEffect(() => {
		GraphUtil.getPrice(Config.addressMap.WETH).then(async (wethPrice) => {
			const pollyPrice = await GraphUtil.getPriceFromPair(
				wethPrice,
				Config.contracts.polly[Config.networkId].address,
			)
			setPollyPrice(pollyPrice)
		})

		const _pools: any = {
			[PoolType.ACTIVE]: [],
			[PoolType.ARCHIVED]: [],
		}
		if (!(library && farmsTVL && bao)) return setPools(_pools)

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
										params: [farm.pid, userAddress],
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
						poolType: farm.poolType || PoolType.ACTIVE,
						tvl: tvlInfo.tvl,
						stakedUSD: decimate(
							result.masterChef[farms.length + i].values[0].hex,
						)
							.div(decimate(tvlInfo.lpStaked))
							.times(tvlInfo.tvl),
						apy:
							pollyPrice && farmsTVL
								? pollyPrice
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

	const BLOCKS_PER_YEAR = new BigNumber(2336000)

	const [archived, showArchived] = useState(false)
	const [staked, showStaked] = useState(false)

	return (
		<>
			<Spacer size="md" />
			<Container style={{ textAlign: 'right', fontSize: '0.875rem' }}>
				{/* <Form.Check
					inline
					type="switch"
					id="show-archived"
					label="Show Staked Only"
					checked={staked}
					onChange={(e) => showStaked(e.currentTarget.checked)}
				/> */}
				<Form.Check
					inline
					type="switch"
					id="show-archived"
					label="Show Archived Farms"
					checked={archived}
					onChange={(e) => showArchived(e.currentTarget.checked)}
				/>
			</Container>
			<Row>
				<Col>
					{!account ? (
						<FarmListHeader headers={['Pool', 'APR', 'TVL']} />
					) : (
						<FarmListHeader headers={['Pool', 'APR', 'LP Staked', 'TVL']} />
					)}
					{!archived ? (
						<>
							{pools[PoolType.ACTIVE].length ? (
								pools[PoolType.ACTIVE].map((farm: any, i: number) => (
									<React.Fragment key={i}>
										<FarmListItem farm={farm} />
									</React.Fragment>
								))
							) : (
								<StyledLoadingWrapper>
									<SpinnerLoader block />
								</StyledLoadingWrapper>
							)}
						</>
					) : (
						<>
							{pools[PoolType.ARCHIVED].length ? (
								pools[PoolType.ARCHIVED].map((farm: any, i: number) => (
									<React.Fragment key={i}>
										<FarmListItem farm={farm} />
									</React.Fragment>
								))
							) : (
								<StyledLoadingWrapper>
									<SpinnerLoader block />
								</StyledLoadingWrapper>
							)}
						</>
					)}
				</Col>
			</Row>
		</>
	)
}

type FarmListHeaderProps = {
	headers: string[]
}

const FarmListHeader: React.FC<FarmListHeaderProps> = ({
	headers,
}: FarmListHeaderProps) => {
	return (
		<Container fluid>
			<Row style={{ padding: '0.5rem 12px' }}>
				{headers.map((header: string) => (
					<FarmListHeaderCol style={{ paddingBottom: '0px' }} key={header}>
						{header}
					</FarmListHeaderCol>
				))}
			</Row>
		</Container>
	)
}

interface FarmListItemProps {
	farm: FarmWithStakedValue
}

const FarmListItem: React.FC<FarmListItemProps> = ({ farm }) => {
	const operations = ['Stake', 'Unstake']
	const [operation, setOperation] = useState(operations[0])
	const { account } = useWeb3React()

	const [showFarmModal, setShowFarmModal] = useState(false)

	return (
		<>
			<StyledAccordionItem
				style={{ padding: '12px' }}
				onClick={() => setShowFarmModal(true)}
				disabled={!account}
			>
				<StyledAccordionHeader>
					<Row lg={7} style={{ width: '100%' }}>
						<Col style={{ fontWeight: 700 }}>
							<FarmIconContainer>
								<FarmIcon src={farm.iconA} />
								<FarmIcon src={farm.iconB} />
							</FarmIconContainer>
							{farm.name}
						</Col>
						<Col>
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
						</Col>
						{account && <Col>{`$${getDisplayBalance(farm.stakedUSD, 0)}`}</Col>}
						<Col>{`$${getDisplayBalance(farm.tvl, 0)}`}</Col>
					</Row>
				</StyledAccordionHeader>
			</StyledAccordionItem>
			<FarmModal
				farm={farm}
				show={showFarmModal}
				onHide={() => setShowFarmModal(false)}
			/>
		</>
	)
}

export const FarmImage = styled.img`
	height: 50px;
	margin-right: ${(props) => props.theme.spacing[3]}px;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		height: 40px;
		margin-right: ${(props) => props.theme.spacing[3]}px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.md}px) {
		height: 35px;
		margin-right: ${(props) => props.theme.spacing[3]}px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		height: 50px;
		margin-right: ${(props) => props.theme.spacing[3]}px;
	}
`

export const FarmIconContainer = styled.div`
	height: 100%;
	align-items: center;
	margin: 0 auto;
	display: inline-block;
	vertical-align: middle;
	color: ${(props) => props.theme.color.text[100]};

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		display: none;
	}
`

export const FarmIcon = styled(FarmImage)`
	height: 40px;
	vertical-align: super;
	transition: 200ms;
	user-select: none;
	-webkit-user-drag: none;
	margin-left: -${(props) => props.theme.spacing[3]}px;

	&:first-child {
		margin-left: 0;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		height: 30px;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.md}px) {
		height: 25px;
	}
`

const FarmListHeaderCol = styled(Col)`
	font-family: 'Rubik', sans-serif;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	text-align: right;

	&:first-child {
		text-align: left;
	}

	&:last-child {
		margin-right: 20px;
	}
`

const StyledAccordionItem = styled.button`
	background-color: transparent;
	border-color: transparent;
	width: 100%;
`

const StyledAccordionHeader = styled.div`
		background: ${(props) => props.theme.color.transparent[100]};
		color: ${(props) => props.theme.color.text[100]};
		padding: 1.25rem;
		border: none;
		border-radius: 8px;

		&:hover,
		&:focus,
		&:active {
			background: ${(props) => props.theme.color.transparent[200]};
			color: ${(props) => props.theme.color.text[100]};
			border: none;
			box-shadow: none;
		}
		
		.row > .col {
			margin: auto 0;
			text-align: right;

			&:first-child {
				text-align: left;
			}

			&:last-child {
			}
		}
		
		&:active {
			border-radius: 8px 8px 0px 0px;
		}
	
		img {
			height: 32px;
			margin-right: 0.75rem;
			vertical-align: middle;
		}
	}
`
