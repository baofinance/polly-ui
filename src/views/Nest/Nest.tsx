import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import IssueModal from './components/IssueModal'
import RedeemModal from './components/RedeemModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	Badge,
	Button as BootButton,
	Col,
	OverlayTrigger,
	Row,
	Tooltip,
} from 'react-bootstrap'
import { SpinnerLoader } from '../../components/Loader'
import PieGraph from '../../components/Graphs/PieGraph'
import { ParentSize } from '@visx/responsive'
import AreaGraph from '../../components/Graphs/AreaGraph/AreaGraph'
import { getDisplayBalance } from '../../utils/formatBalance'
import { getContract } from '../../utils/erc20'
import useGraphPriceHistory from '../../hooks/useGraphPriceHistory'
import useComposition from '../../hooks/useComposition'
import useNestRate from '../../hooks/useNestRate'
import useNest from '../../hooks/useNest'
import useTokenBalance from '../../hooks/useTokenBalance'
import useNestRedeem from '../../hooks/useNestRedeem'
import { useWallet } from 'use-wallet'
import useBao from '../../hooks/useBao'
import useModal from '../../hooks/useModal'
import useNav from '../../hooks/useNav'
import { useParams } from 'react-router-dom'
import {
	NestBox,
	NestCornerButton,
	NestBoxHeader,
	NestText,
	NestHeader,
	NestSubHeader,
	NestList,
	Icon,
	NestBoxBreak,
	NestButtons,
	StyledBadge,
	NestAnalytics,
	NestAnalyticsContainer,
	GraphContainer,
	PieGraphRow,
	StyledTable,
	PrefButtons,
	StatsRow,
	StatCard,
} from './styles'
import { Progress } from './components/Progress'

// will replace with nest icons once they're designed
import nestIcon from '../../assets/img/egg.png'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()

	const [supply, setSupply] = useState<BigNumber | undefined>()
	const [analyticsOpen, setAnalyticsOpen] = useState(true)
	const [priceHistoryTimeFrame, setPriceHistoryTimeFrame] = useState('M')
	const [allocationDisplayType, setAllocationDisplayType] = useState(false)

	const nest = useNest(nestId)
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name } = nest
	const composition = useComposition(nest)
	const { wethPerIndex, usdPerIndex } = useNestRate(nestTokenAddress)
	const priceHistory = useGraphPriceHistory(nest)
	const nav = useNav(composition, supply)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { ethereum } = useWallet()

	const nestContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const inputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, inputTokenAddress)
	}, [ethereum, inputTokenAddress])

	const outputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const maxAllocationPercentage = useMemo(() => {
		return (
			composition &&
			_.max(
				_.map(composition, (component) =>
					parseFloat(component.percentage.toString()),
				),
			)
		)
	}, [composition])

	const indexPriceChange24h = useMemo(() => {
		return (
			priceHistory &&
			new BigNumber(
				((priceHistory[priceHistory.length - 1].close -
					priceHistory[priceHistory.length - 2].close) /
					priceHistory[priceHistory.length - 1].close) *
					100,
			)
		)
	}, [priceHistory])

	const marketCap = useMemo(() => {
		return (
			supply &&
			usdPerIndex &&
			`$${getDisplayBalance(supply.div(10 ** 18).times(usdPerIndex), 0)}`
		)
	}, [supply, usdPerIndex])

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const bao = useBao()

	const _inputToken = inputTokenContract.options.address
	const _outputToken = outputTokenContract.options.address

	const [onPresentDeposit] = useModal(
		<IssueModal
			nestName={nestToken}
			nestAddress={nestTokenAddress}
			inputTokenName="WETH"
			_inputToken={_inputToken}
			_outputToken={_outputToken}
			nestContract={nestContract}
			inputTokenContract={inputTokenContract}
			outputTokenContract={outputTokenContract}
		/>,
	)

	const { onNestRedeem } = useNestRedeem(nid)
	const [onPresentRedeem] = useModal(
		<RedeemModal
			max={tokenBalance}
			onConfirm={onNestRedeem}
			nestName={nestToken}
			nestContract={nestContract}
			nid={nid}
		/>,
	)

	useEffect(() => {
		if (nestContract.options.address)
			nestContract.methods
				.totalSupply()
				.call()
				.then((_supply: any) => setSupply(new BigNumber(_supply)))
	}, [bao, ethereum])

	return (
		<>
			<NestBox>
				<OverlayTrigger
					overlay={
						<Tooltip id={Math.random().toString()}>
							{analyticsOpen ? 'Hide' : 'View'} Analytics
						</Tooltip>
					}
					placement="bottom"
				>
					<NestCornerButton
						onClick={() => setAnalyticsOpen(!analyticsOpen)}
						aria-controls="analytics-collapse"
						aria-expanded={analyticsOpen}
					>
						<FontAwesomeIcon icon="chart-line" />
					</NestCornerButton>
				</OverlayTrigger>
				<OverlayTrigger
					overlay={
						<Tooltip id={Math.random().toString()}>View Contract</Tooltip>
					}
					placement="bottom"
				>
					<NestCornerButton
						href={`https://polygonscan.com/address/${nestTokenAddress}`}
						target="_blank"
					>
						<FontAwesomeIcon icon="file-contract" />
					</NestCornerButton>
				</OverlayTrigger>
				<NestBoxHeader>
					<Icon src={nestIcon} alt={nestToken} />
					<p>{name}</p>
					<StyledBadge>
						1 {nestToken} ={' '}
						{(wethPerIndex && getDisplayBalance(wethPerIndex, 0)) || (
							<SpinnerLoader />
						)}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} /> = $
						{(usdPerIndex && getDisplayBalance(usdPerIndex, 0)) || (
							<SpinnerLoader />
						)}
					</StyledBadge>
					<br />
				</NestBoxHeader>
				<NestBoxBreak margin={10} />
				<StatsRow lg={4}>
					<Col>
						<StatCard>
							<span>
								<FontAwesomeIcon icon="hand-holding-usd" />
								<br />
								Market Cap
							</span>
							<Spacer size={'sm'} />
							<StyledBadge>{marketCap || <SpinnerLoader />}</StyledBadge>
						</StatCard>
					</Col>
					<Col>
						<StatCard>
							<span>
								<FontAwesomeIcon icon="coins" />
								<br />
								Supply
							</span>
							<Spacer size={'sm'} />
							<StyledBadge>
								{(supply && `${getDisplayBalance(supply)} ${nestToken}`) || (
									<SpinnerLoader />
								)}
							</StyledBadge>
						</StatCard>
					</Col>
					<Col>
						<StatCard>
							<span>
								<FontAwesomeIcon icon="times-circle" />
								<br />
								NAV
							</span>
							<Spacer size={'sm'} />
							<StyledBadge>
								{(nav && `$${getDisplayBalance(nav, 0)}`) || <SpinnerLoader />}
							</StyledBadge>
						</StatCard>
					</Col>
					<Col>
						<StatCard>
							<span>
								<FontAwesomeIcon icon="times-circle" />
								<br />
								Premium
							</span>
							<Spacer size={'sm'} />
							<StyledBadge>-</StyledBadge>
						</StatCard>
					</Col>
				</StatsRow>
				<NestButtons>
					<Button text="Issue" onClick={onPresentDeposit} width="20%" />
					<Spacer />
					<Button
						disabled={tokenBalance.eq(new BigNumber(0))}
						text="Redeem"
						onClick={onPresentRedeem}
						width="20%"
					/>
					<Spacer />
					<Button disabled={true} text="Swap" width="20%" />
				</NestButtons>
				<NestAnalytics in={analyticsOpen}>
					<NestAnalyticsContainer>
						<NestBoxBreak />
						<PrefButtons>
							<NestBoxHeader style={{ float: 'left' }}>
								Index Price
							</NestBoxHeader>
							{_.map(['W', 'M', 'Y'], (timeFrame) => (
								<BootButton
									variant="outline-primary"
									onClick={() => setPriceHistoryTimeFrame(timeFrame)}
									active={priceHistoryTimeFrame === timeFrame}
								>
									{timeFrame}
								</BootButton>
							))}
							<NestBoxHeader style={{ float: 'right' }}>
								{indexPriceChange24h ? (
									<>
										$
										{priceHistory &&
											getDisplayBalance(
												new BigNumber(
													priceHistory[priceHistory.length - 1].close,
												),
												0,
											)}
										<span
											className="smalltext"
											style={{
												color: indexPriceChange24h.gt(0) ? 'green' : 'red',
											}}
										>
											{priceHistory &&
												getDisplayBalance(indexPriceChange24h, 0)}
											{'%'}
										</span>
									</>
								) : (
									<SpinnerLoader />
								)}
							</NestBoxHeader>
						</PrefButtons>
						<GraphContainer>
							<ParentSize>
								{(parent) =>
									priceHistory && (
										<AreaGraph
											width={parent.width}
											height={parent.height}
											timeseries={priceHistory}
											timeframe={priceHistoryTimeFrame}
										/>
									)
								}
							</ParentSize>
						</GraphContainer>
						<PrefButtons>
							<NestBoxHeader style={{ float: 'left' }}>
								Allocation Breakdown
							</NestBoxHeader>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(false)}
								active={!allocationDisplayType}
							>
								<FontAwesomeIcon icon="table" />
							</BootButton>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(true)}
								active={allocationDisplayType}
							>
								<FontAwesomeIcon icon="chart-pie" />
							</BootButton>
						</PrefButtons>
						{!allocationDisplayType ? (
							<StyledTable bordered hover>
								<thead>
									<tr>
										<th>Asset</th>
										<th>Allocation %</th>
										<th>Price</th>
										<th>Strategy</th>
									</tr>
								</thead>
								<tbody>
									{(composition &&
										maxAllocationPercentage &&
										_.orderBy(
											composition,
											(component) =>
												parseFloat(component.percentage.toString()),
											'desc',
										).map((component) => (
											<tr key={component.symbol}>
												<td>
													<img
														src={component.imageUrl}
														style={{ height: '32px' }}
													/>
												</td>
												<td>
													<Progress
														width={
															(component.percentage / maxAllocationPercentage) *
															100
														}
														label={`${getDisplayBalance(
															new BigNumber(component.percentage),
															0,
														)}%`}
														assetColor={component.color}
													/>
												</td>
												<td>${getDisplayBalance(component.price, 0)}</td>
												<td>
													<StyledBadge>None</StyledBadge>
												</td>
											</tr>
										))) || <SpinnerLoader />}
								</tbody>
							</StyledTable>
						) : (
							<GraphContainer style={{ height: '400px' }}>
								<PieGraphRow lg={2}>
									<Col lg={8}>
										{composition && (
											<ParentSize>
												{(parent) => (
													<PieGraph
														width={parent.width}
														height={parent.height}
														composition={composition}
													/>
												)}
											</ParentSize>
										)}
									</Col>
									<Col lg={4} style={{ margin: 'auto' }}>
										<Row lg={2}>
											{composition &&
												composition.map((component) => (
													<Col key={component.symbol}>
														<Badge
															style={{
																backgroundColor: component.color,
																margin: '10px 0',
															}}
														>
															{component.symbol}
														</Badge>
													</Col>
												))}
										</Row>
									</Col>
								</PieGraphRow>
							</GraphContainer>
						)}
					</NestAnalyticsContainer>
				</NestAnalytics>
				<NestBoxBreak />
				<NestText>
					<NestHeader>Description</NestHeader>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						imperdiet, nibh ac dictum tristique, tortor tellus commodo lacus, a
						feugiat dolor sem in lorem. Donec blandit diam arcu, quis ultricies
						urna volutpat a. Donec ac tortor volutpat, ullamcorper diam at,
						gravida neque. Aenean bibendum fermentum diam. Aenean id elit massa.
						Etiam at molestie risus, nec pellentesque lorem. Sed libero nunc,
						viverra mollis aliquet semper, pulvinar ac ante. Proin pellentesque,
						nisl id malesuada semper, ligula nunc lacinia mi, ac tincidunt nulla
						sapien a lorem. Nulla nunc lectus, sollicitudin at scelerisque non,
						tincidunt eu velit. Sed nec risus nulla.
					</p>

					<NestHeader>Objective</NestHeader>
					<p>
						Etiam vel augue a velit eleifend commodo. In malesuada nunc eget
						suscipit volutpat. Cras fermentum ullamcorper enim ut facilisis.
						Donec id felis lobortis, aliquet magna non, cursus tellus. Vivamus
						sed erat vitae metus elementum finibus. Sed blandit molestie
						consequat. Orci varius natoque penatibus et magnis dis parturient
						montes, nascetur ridiculus mus. In vel elit ac urna commodo
						pulvinar. Nullam ultricies pretium tempor. Pellentesque sit amet
						erat gravida, aliquam sem sed, venenatis est.
					</p>

					<NestHeader>Criteria</NestHeader>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
						imperdiet, nibh ac dictum tristique, tortor tellus commodo lacus, a
						feugiat dolor sem in lorem. Donec blandit diam arcu, quis ultricies
						urna volutpat a. Donec ac tortor volutpat, ullamcorper diam at,
						gravida neque. Aenean bibendum fermentum diam. Aenean id elit massa.
						Etiam at molestie risus, nec pellentesque lorem. Sed libero nunc,
						viverra mollis aliquet semper, pulvinar ac ante. Proin pellentesque,
						nisl id malesuada semper, ligula nunc lacinia mi, ac tincidunt nulla
						sapien a lorem. Nulla nunc lectus, sollicitudin at scelerisque non,
						tincidunt eu velit.
					</p>
					<NestSubHeader>Descriptive Characteristics</NestSubHeader>
					<NestList>
						<li>
							Pellentesque sit amet erat gravida, aliquam sem sed, venenatis
							est.
						</li>
						<li>
							In vel elit ac urna commodo pulvinar. Nullam ultricies pretium
							tempor.
						</li>
						<li>
							Donec imperdiet, nibh ac dictum tristique, tortor tellus commodo
							lacus, a feugiat dolor sem in lorem.
						</li>
						<li>
							Nulla nunc lectus, sollicitudin at scelerisque non, tincidunt eu
							velit.
						</li>
					</NestList>
					<NestSubHeader>Supply Characteristics</NestSubHeader>
					<NestList>
						<li>
							Pellentesque sit amet erat gravida, aliquam sem sed, venenatis
							est.
						</li>
						<li>
							In vel elit ac urna commodo pulvinar. Nullam ultricies pretium
							tempor.
						</li>
						<li>
							Donec imperdiet, nibh ac dictum tristique, tortor tellus commodo
							lacus, a feugiat dolor sem in lorem.
						</li>
						<li>
							Nulla nunc lectus, sollicitudin at scelerisque non, tincidunt eu
							velit.
						</li>
					</NestList>
					<NestSubHeader>Traction Characteristics</NestSubHeader>
					<NestList>
						<li>
							Pellentesque sit amet erat gravida, aliquam sem sed, venenatis
							est.
						</li>
						<li>
							In vel elit ac urna commodo pulvinar. Nullam ultricies pretium
							tempor.
						</li>
						<li>
							Donec imperdiet, nibh ac dictum tristique, tortor tellus commodo
							lacus, a feugiat dolor sem in lorem.
						</li>
						<li>
							Nulla nunc lectus, sollicitudin at scelerisque non, tincidunt eu
							velit.
						</li>
					</NestList>
					<NestSubHeader>Safety Characteristics</NestSubHeader>
					<NestList>
						<li>
							Pellentesque sit amet erat gravida, aliquam sem sed, venenatis
							est.
						</li>
						<li>
							In vel elit ac urna commodo pulvinar. Nullam ultricies pretium
							tempor.
						</li>
						<li>
							Donec imperdiet, nibh ac dictum tristique, tortor tellus commodo
							lacus, a feugiat dolor sem in lorem.
						</li>
						<li>
							Nulla nunc lectus, sollicitudin at scelerisque non, tincidunt eu
							velit.
						</li>
					</NestList>

					<NestHeader>Calculations</NestHeader>
					<p>Etiam vel augue a velit eleifend commodo:</p>
					<NestList>
						<li>
							Pellentesque sit amet erat gravida, aliquam sem sed, venenatis
							est.
						</li>
						<li>
							In vel elit ac urna commodo pulvinar. Nullam ultricies pretium
							tempor.
						</li>
						<li>
							Donec imperdiet, nibh ac dictum tristique, tortor tellus commodo
							lacus, a feugiat dolor sem in lorem.
						</li>
					</NestList>

					<NestHeader>Strategy</NestHeader>
					<p>
						Etiam vel augue a velit eleifend commodo. In malesuada nunc eget
						suscipit volutpat. Cras fermentum ullamcorper enim ut facilisis.
						Donec id felis lobortis, aliquet magna non, cursus tellus. Vivamus
						sed erat vitae metus elementum finibus. Sed blandit molestie
						consequat. Orci varius natoque penatibus et magnis dis parturient
						montes, nascetur ridiculus mus. In vel elit ac urna commodo
						pulvinar. Nullam ultricies pretium tempor. Pellentesque sit amet
						erat gravida, aliquam sem sed, venenatis est.
					</p>

					<NestHeader>Management</NestHeader>
					<p>
						Pellentesque et neque iaculis, iaculis leo vitae, tincidunt lorem.
						Donec euismod sed elit faucibus porta. Vestibulum elit leo, interdum
						et feugiat nec, vehicula feugiat ipsum. Nunc sodales eros in
						tincidunt feugiat. In vel sapien leo. Vestibulum erat enim, varius
						quis nulla luctus, varius rhoncus nisl. Phasellus placerat sagittis
						ultricies. Phasellus in sollicitudin magna, ultricies volutpat
						tortor. Nulla egestas nulla ac pulvinar rhoncus. Maecenas vitae
						ultricies ipsum. Nunc ut erat iaculis, lacinia nisi at, sodales
						nunc. Proin ultricies suscipit egestas. Duis malesuada ut ante eget
						feugiat. Maecenas eget faucibus nisl.
					</p>
				</NestText>
			</NestBox>
		</>
	)
}

export default Nest
