import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ParentSize } from '@visx/responsive'
import BigNumber from 'bignumber.js'
import { Button } from 'components/Button'
import AreaGraph from 'components/Graphs/AreaGraph/AreaGraph'
import DonutGraph from 'components/Graphs/PieGraph'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import Tooltipped from 'components/Tooltipped'
import useBao from 'hooks/base/useBao'
import useComposition from 'hooks/baskets/useComposition'
import useGraphPriceHistory from 'hooks/baskets/useGraphPriceHistory'
import useModal from 'hooks/base/useModal'
import useNav from 'hooks/baskets/useNav'
import useNest from 'hooks/baskets/useNest'
import useNestRate from 'hooks/baskets/useNestRate'
import usePairPrice from 'hooks/baskets/usePairPrice'
import useTokenBalance from 'hooks/base/useTokenBalance'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Button as BootButton, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { getContract } from 'utils/erc20'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { provider } from 'web3-core'
import NDEFI from './components/explanations/nDEFI'
import NSTBL from './components/explanations/nSTBL'
import NINFR from './components/explanations/nINFR'
import NPOLY from './components/explanations/nPOLY'
import { IssueModal, RedeemModal, NavModal } from './components/Modals'
import { Progress } from './components/Progress'
import Config from 'bao/lib/config'
import {
	CornerButtons,
	GraphContainer,
	Icon,
	NestAnalytics,
	NestAnalyticsContainer,
	NestBox,
	NestBoxBreak,
	NestBoxHeader,
	NestButtons,
	NestCornerButton,
	NestExplanation,
	PieGraphRow,
	PrefButtons,
	PriceBadge,
	PriceGraph,
	QuestionIcon,
	StatCard,
	StatsRow,
	StyledBadge,
	StyledTable,
} from './components/styles'
import useTransactionHandler from 'hooks/base/useTransactionHandler'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()

	const [supply, setSupply] = useState<BigNumber | undefined>()
	const [analyticsOpen, setAnalyticsOpen] = useState(true)
	const [priceHistoryTimeFrame, setPriceHistoryTimeFrame] = useState('M')
	const [allocationDisplayType, setAllocationDisplayType] = useState(false)

	const nest = useNest(nestId)
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, icon } = nest

	const composition = useComposition(nest)
	const { wethPrice } = useNestRate(nestTokenAddress)
	const priceHistory = useGraphPriceHistory(nest)
	const nav = useNav(composition, supply)
	const sushiPairPrice = usePairPrice(nest)

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

	const nestPriceChange24h = useMemo(() => {
		return (
			priceHistory &&
			new BigNumber(priceHistory[priceHistory.length - 1].close)
				.minus(priceHistory[priceHistory.length - 2].close)
				.div(priceHistory[priceHistory.length - 1].close)
				.times(100)
		)
	}, [priceHistory])

	const marketCap = useMemo(() => {
		return (
			supply &&
			sushiPairPrice &&
			`$${getDisplayBalance(decimate(supply).times(sushiPairPrice), 0)}`
		)
	}, [supply, sushiPairPrice])

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const bao = useBao()

	const _inputToken = inputTokenContract.options.address
	const _outputToken = outputTokenContract.options.address

	const [showNavModal, setShowNavModal] = useState(false)
	const [showIssueModal, setShowIssueModal] = useState(false)
	const [showRedeemModal, setShowRedeemModal] = useState(false)

	const { handleTx } = useTransactionHandler()

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
				<CornerButtons>
					<Tooltipped content={`${analyticsOpen ? 'Hide' : 'View'} Analytics`}>
						<NestCornerButton
							onClick={() => setAnalyticsOpen(!analyticsOpen)}
							aria-controls="analytics-collapse"
							aria-expanded={analyticsOpen}
						>
							<FontAwesomeIcon icon="chart-line" />
						</NestCornerButton>
					</Tooltipped>
					<Tooltipped content="View Contract">
						<NestCornerButton
							href={`https://polygonscan.com/address/${nestTokenAddress}`}
							target="_blank"
						>
							<FontAwesomeIcon icon="file-contract" />
						</NestCornerButton>
					</Tooltipped>
				</CornerButtons>
				<NestBoxHeader>
					<Icon src={icon} alt={nestToken} />
					<br />
					<PriceBadge>
						1 {nestToken} ={' '}
						{(wethPrice &&
							sushiPairPrice &&
							getDisplayBalance(sushiPairPrice.div(wethPrice), 0)) || (
							<SpinnerLoader />
						)}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} /> = $
						{(sushiPairPrice && getDisplayBalance(sushiPairPrice, 0)) || (
							<SpinnerLoader />
						)}
					</PriceBadge>
					<br />
				</NestBoxHeader>
				<StatsRow lg={4} sm={2}>
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
								<FontAwesomeIcon icon="money-bill-wave" />
								<br />
								NAV &nbsp;
							</span>
							<QuestionIcon
								icon="question-circle"
								onClick={() => setShowNavModal(true)}
							/>
							<Spacer size={'sm'} />
							<Tooltipped content={"Based on SushiSwap's Polygon prices"}>
								<StyledBadge
									style={{
										marginRight: '${(props) => props.theme.spacing[2]}px',
									}}
								>
									<img
										src={require('assets/img/assets/MATIC.png')}
										style={{ height: '1em' }}
									/>{' '}
									{(nav && `$${getDisplayBalance(nav.nav, 0)}`) || (
										<SpinnerLoader />
									)}
								</StyledBadge>
							</Tooltipped>
							<span style={{ marginLeft: '5px' }} />
							{nestTokenAddress !== Config.addressMap.nPOLY && (
								<Tooltipped content={"Based on SushiSwap's Mainnet prices"}>
									<StyledBadge>
										<FontAwesomeIcon icon={['fab', 'ethereum']} />{' '}
										{(nav && `$${getDisplayBalance(nav.mainnetNav, 0)}`) || (
											<SpinnerLoader />
										)}
									</StyledBadge>
								</Tooltipped>
							)}
						</StatCard>
					</Col>
					<Col>
						<StatCard>
							<span>
								<FontAwesomeIcon icon="angle-double-up" />
								<FontAwesomeIcon icon="angle-double-down" />
								<br />
								Premium{' '}
								{sushiPairPrice && (
									<Tooltipped
										content={`Difference between ${nestToken} price on SushiSwap ($${getDisplayBalance(
											sushiPairPrice,
											0,
										)}) and NAV price.`}
									/>
								)}
							</span>
							<Spacer size={'sm'} />
							<StyledBadge>
								{(nav &&
									sushiPairPrice &&
									`${getDisplayBalance(
										sushiPairPrice
											.minus(nav.nav)
											.div(sushiPairPrice)
											.times(100),
										0,
									)}%`) || <SpinnerLoader />}
							</StyledBadge>
						</StatCard>
					</Col>
				</StatsRow>
				<NestButtons>
					<Button
						text="Issue"
						onClick={() => setShowIssueModal(true)}
						width="20%"
						disabled={!nav}
					/>
					<Spacer />
					<Button
						disabled={tokenBalance.eq(new BigNumber(0))}
						text="Redeem"
						onClick={() => setShowRedeemModal(true)}
						width="20%"
					/>
					<Spacer />
					<Button
						href={`https://app.sushi.com/swap?inputCurrency=${nestTokenAddress}&outputCurrency=${Config.addressMap.WETH}`}
						target="_blank"
						text="Swap"
						width="20%"
					/>
				</NestButtons>
				<NestAnalytics in={analyticsOpen}>
					<NestAnalyticsContainer>
						<NestBoxBreak />
						{priceHistory && priceHistory[priceHistory.length - 1].close > 0 && (
							<PriceGraph>
								<NestBoxHeader style={{ float: 'left' }}>
									Nest Price
								</NestBoxHeader>
								<PrefButtons>
									{_.map(['W', 'M', 'Y'], (timeFrame) => (
										<BootButton
											variant="outline-primary"
											onClick={() => setPriceHistoryTimeFrame(timeFrame)}
											active={priceHistoryTimeFrame === timeFrame}
											key={timeFrame}
											style={{ marginTop: '0px', borderColor: 'transparent' }}
										>
											{timeFrame}
										</BootButton>
									))}
								</PrefButtons>
								<NestBoxHeader style={{ float: 'right' }}>
									{nestPriceChange24h ? (
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
													color: nestPriceChange24h.gt(0) ? 'green' : 'red',
												}}
											>
												{priceHistory &&
													getDisplayBalance(nestPriceChange24h, 0)}
												{'%'}
											</span>
										</>
									) : (
										<SpinnerLoader />
									)}
								</NestBoxHeader>
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
							</PriceGraph>
						)}
						<NestBoxHeader style={{ float: 'left' }}>
							Allocation Breakdown
						</NestBoxHeader>
						<PrefButtons>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(false)}
								active={!allocationDisplayType}
								style={{ marginTop: '0px', borderColor: 'transparent' }}
							>
								<FontAwesomeIcon icon="table" />
							</BootButton>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(true)}
								active={allocationDisplayType}
								style={{ marginTop: '0px', borderColor: 'transparent' }}
							>
								<FontAwesomeIcon icon="chart-pie" />
							</BootButton>
						</PrefButtons>
						<br />
						{!allocationDisplayType ? (
							<StyledTable bordered hover>
								<thead>
									<tr>
										<th>Token</th>
										<th>Allocation</th>
										<th>Price</th>
										<th className="strategy">Strategy</th>
									</tr>
								</thead>
								<tbody>
									{(composition &&
										maxAllocationPercentage &&
										composition.map((component) => (
											<tr key={component.symbol}>
												<td>
													<Tooltipped content={component.symbol}>
														<img
															src={component.imageUrl}
															style={{ height: '32px' }}
														/>
													</Tooltipped>
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
												<td>
													$
													{getDisplayBalance(
														component.basePrice || component.price,
														0,
													)}
												</td>
												<td className="strategy">
													<StyledBadge>{component.strategy}</StyledBadge>
												</td>
											</tr>
										))) || (
										<tr>
											{_.times(4, () => (
												<td>
													<SpinnerLoader />
												</td>
											))}
										</tr>
									)}
								</tbody>
							</StyledTable>
						) : (
							<GraphContainer style={{ height: '400px' }}>
								<PieGraphRow lg={2}>
									<Col lg={8}>
										{composition && (
											<ParentSize>
												{(parent) => (
													<DonutGraph
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
																margin: '8px 0',
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
				<NestExplanation>
					{/* TODO: Store pointer to nest description in config, this is messy */}
					{nestTokenAddress === Config.addressMap.nDEFI && <NDEFI />}
					{nestTokenAddress === Config.addressMap.nSTBL && <NSTBL />}
					{nestTokenAddress === Config.addressMap.nINFR && <NINFR />}
					{nestTokenAddress === Config.addressMap.nPOLY && <NPOLY />}
				</NestExplanation>
			</NestBox>
			<IssueModal
				nestName={nestToken}
				nestAddress={nestTokenAddress}
				inputTokenName="WETH"
				_inputToken={_inputToken}
				_outputToken={_outputToken}
				nestContract={nestContract}
				inputTokenContract={inputTokenContract}
				outputTokenContract={outputTokenContract}
				nav={nav}
				show={showIssueModal}
				onHide={() => setShowIssueModal(false)}
			/>
			<RedeemModal
				max={tokenBalance}
				nestName={nestToken}
				nestContract={nestContract}
				nid={nid}
				show={showRedeemModal}
				onHide={() => setShowRedeemModal(false)}
			/>
			<NavModal show={showNavModal} onHide={() => setShowNavModal(false)} />
		</>
	)
}

export default Nest
