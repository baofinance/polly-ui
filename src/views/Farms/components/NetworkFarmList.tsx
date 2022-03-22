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
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import styled from 'styled-components'
import GraphUtil from 'utils/graph'
import Multicall from 'utils/multicall'
import { getDisplayBalance } from 'utils/numberFormat'
import { StyledLoadingWrapper } from './styles'

export interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

export const NetworkFarmList: React.FC = () => {
	const bao = useBao()
	const [farms] = useFarms()
	const farmsTVL = useAllFarmTVL(bao && bao.web3, bao && bao.multicall)
	const { library } = useWeb3React()

	const [pollyPrice, setPollyPrice] = useState<BigNumber | undefined>()
	const [pools, setPools] = useState<any | undefined>({
		[PoolType.ACTIVE]: [],
		[PoolType.ARCHIVED]: [],
	})

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
						calls: farms.map((farm, i) => {
							return {
								ref: i.toString(),
								method: 'getNewRewardPerBlock',
								params: [farm.pid + 1],
							}
						}),
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

	return (
		<>
			<Spacer size="md" />
			<Row>
				<Col>
					<FarmListHeader headers={['Pool', 'APR', 'LP Staked', 'TVL']} />
					{pools[PoolType.ACTIVE] && pools[PoolType.ACTIVE].length ? (
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
						<b>{header}</b>
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

	return (
		<Accordion>
			<StyledAccordionItem eventKey="0" style={{ padding: '12px' }}>
				<StyledAccordionHeader>
					<Row lg={7} style={{ width: '100%' }}>
						<Col>
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
						<Col>-</Col>
						<Col>{`$${getDisplayBalance(farm.tvl, 0)}`}</Col>
					</Row>
				</StyledAccordionHeader>
			</StyledAccordionItem>
		</Accordion>
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
	text-align: right;

	&:first-child {
		text-align: left;
	}

	&:last-child {
		margin-right: 46px;
	}
`

const StyledAccordionItem = styled(Accordion.Item)`
	background-color: transparent;
	border-color: transparent;
`

const StyledAccordionBody = styled(Accordion.Body)`
	background: ${(props) => props.theme.color.transparent[100]};
	border-bottom-left-radius: 8px;
	border-bottom-right-radius: 8px;
`

const StyledAccordionHeader = styled(Accordion.Header)`
	&:active {
		border-radius: 8px 8px 0px 0px;
	}

	img {
		height: 32px;
		margin-right: 0.75rem;
		vertical-align: middle;
	}

	> button {
		background: ${(props) => props.theme.color.transparent[100]};
		color: ${(props) => props.theme.color.text[100]};
		padding: 1.25rem;
		border: none;
		border-radius: 8px;

		&:hover,
		&:focus,
		&:active,
		&:not(.collapsed) {
			background: ${(props) => props.theme.color.transparent[100]};
			color: ${(props) => props.theme.color.text[100]};
			border: none;
			box-shadow: none;
			border-radius: 8px 8px 0px 0px;
		}

		&:not(.collapsed) {
			transition: none;

			&:focus,
			&:active {
				border-color: ${(props) => props.theme.color.primary[300]};
			}

			::after {
				background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='${(
					props,
				) =>
					props.theme.color.text[100].replace(
						'#',
						'%23',
					)}'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
			}
		}

		::after {
			// don't turn arrow blue
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='${(
				props,
			) =>
				props.theme.color.text[100].replace(
					'#',
					'%23',
				)}'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
		}

		.row > .col {
			margin: auto 0;
			text-align: right;

			&:first-child {
				text-align: left;
			}

			&:last-child {
				margin-right: 25px;
			}
		}
	}
`
