import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ParentSize } from '@visx/responsive'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Button as BootButton, Col, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Button from '../../components/Button'
import AreaGraph from '../../components/Graphs/AreaGraph/AreaGraph'
import DonutGraph from '../../components/Graphs/PieGraph'
import { SpinnerLoader } from '../../components/Loader'
import Spacer from '../../components/Spacer'
import Tooltipped from '../../components/Tooltipped'
import useBao from '../../hooks/useBao'
import useComposition from '../../hooks/useComposition'
import useGraphPriceHistory from '../../hooks/useGraphPriceHistory'
import useModal from '../../hooks/useModal'
import useNav from '../../hooks/useNav'
import useNest from '../../hooks/useNest'
import useNestRate from '../../hooks/useNestRate'
import useNestRedeem from '../../hooks/useNestRedeem'
import useTokenBalance from '../../hooks/useTokenBalance'
import usePairPrice from '../../hooks/usePairPrice'
import { getContract } from '../../utils/erc20'
import { decimate, getDisplayBalance } from '../../utils/formatBalance'
import IssueModal from './components/IssueModal'
import NavModal from './components/NavModal'
import { Progress } from './components/Progress'
import RedeemModal from './components/RedeemModal'
import {
	GraphContainer,
	Icon,
	PriceGraph,
	NestAnalytics,
	NestAnalyticsContainer,
	NestBox,
	NestBoxBreak,
	NestBoxHeader,
	NestButtons,
	NestCornerButton,
	NestHeader,
	NestList,
	NestSubHeader,
	NestText,
	PieGraphRow,
	PrefButtons,
	QuestionIcon,
	StatCard,
	StatsRow,
	StyledBadge,
	StyledTable,
	StyledAlert,
	StyledExternalLink,
	CornerButtons,
} from './styles'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()

	const [supply, setSupply] = useState<BigNumber | undefined>()
	const [analyticsOpen, setAnalyticsOpen] = useState(true)
	const [priceHistoryTimeFrame, setPriceHistoryTimeFrame] = useState('M')
	const [allocationDisplayType, setAllocationDisplayType] = useState(false)

	const nest = useNest(nestId)
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name, icon } =
		nest
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

	const indexPriceChange24h = useMemo(() => {
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

	const [onNavModal] = useModal(<NavModal />)

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
			nav={nav}
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
					<StyledBadge>
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
					</StyledBadge>
					<br />
				</NestBoxHeader>
				{nest && nest.nid === 1 && (
					<StyledAlert>
						<h4 style={{ color: 'white', textAlign: 'center' }}>
							<FontAwesomeIcon icon="exclamation-circle" /> Notice
						</h4>
						<p style={{ margin: 0 }}>
							During the first phase of this rollout, there will be heavy one
							sided buy pressure in each of the bridged underlying tokens
							liquidity pools on Sushi as a result of people minting their nDEFI
							tokens.
							<Spacer size="md" />
							Until more liquidity for nDEFI's underlying tokens is bridged to{' '}
							🍣
							<StyledExternalLink href="https://app.sushi.com" target="_blank">
								SushiSwap
							</StyledExternalLink>{' '}
							on Polygon and arbitrage bots recognize these pairs, price
							information for some tokens may slightly skew from that of robust
							oracles. This slippage affects the NAV price as well.
							<Spacer size="md" />
							Have any of nDEFI's underlying tokens laying around on another
							chain? Bridge the tokens to Polygon and stake them in our{' '}
							<StyledExternalLink href="/farms">farms</StyledExternalLink> to
							receive POLLY rewards!
						</p>
					</StyledAlert>
				)}
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
							<QuestionIcon icon="question-circle" onClick={onNavModal} />
							<Spacer size={'sm'} />
							<Tooltipped content={"Based on SushiSwap's MATIC prices"}>
								<StyledBadge style={{ marginRight: '10px' }}>
									<img
										src={require('../../assets/img/assets/MATIC.png')}
										style={{ height: '1em' }}
									/>{' '}
									{(nav && `$${getDisplayBalance(nav.nav, 0)}`) || (
										<SpinnerLoader />
									)}
								</StyledBadge>
							</Tooltipped>
							<Tooltipped content={"Based on SushiSwap's Mainnet prices"}>
								<StyledBadge>
									<FontAwesomeIcon icon={['fab', 'ethereum']} />{' '}
									{(nav && `$${getDisplayBalance(nav.mainnetNav, 0)}`) || (
										<SpinnerLoader />
									)}
								</StyledBadge>
							</Tooltipped>
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
										)}) and NAV price`}
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
					<Button text="Issue" onClick={onPresentDeposit} width="20%" disabled={!nav} />
					<Spacer />
					<Button
						disabled={tokenBalance.eq(new BigNumber(0))}
						text="Redeem"
						onClick={onPresentRedeem}
						width="20%"
					/>
					<Spacer />
					<Button
						href={`https://app.sushi.com/swap?inputCurrency=${nestTokenAddress}&outputCurrency=0x7ceb23fd6bc0add59e62ac25578270cff1b9f619`}
						target="_blank"
						text="Swap"
						width="20%"
					/>
				</NestButtons>
				<NestAnalytics in={analyticsOpen}>
					<NestAnalyticsContainer>
						<NestBoxBreak />
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
										style={{ marginTop: '0px' }}
									>
										{timeFrame}
									</BootButton>
								))}
							</PrefButtons>
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
						<NestBoxHeader style={{ float: 'left' }}>
							Allocation Breakdown
						</NestBoxHeader>
						<PrefButtons>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(false)}
								active={!allocationDisplayType}
								style={{ marginTop: '0px' }}
							>
								<FontAwesomeIcon icon="table" />
							</BootButton>
							<BootButton
								variant="outline-primary"
								onClick={() => setAllocationDisplayType(true)}
								active={allocationDisplayType}
								style={{ marginTop: '0px' }}
							>
								<FontAwesomeIcon icon="chart-pie" />
							</BootButton>
						</PrefButtons>
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
						The Polly DeFi Nest is divided into key DeFi sectors, which are
						given a weighting reflecting their maturity and share of the overall
						market. Within those sectors, each project is weighted on the TVL
						divided by Fully Diluted Valuation (FDV).
					</p>

					<NestHeader>Objective</NestHeader>
					<p>
						To generate revenue a defi project needs value deposited into their
						contracts. This makes Total Value Locked (TVL) a key metric for
						evaluating a project's ability to generate revenue. Projects with a
						high TVL are also likely to gain more traction in the market through
						the network effects the existing capital provides - capital attracts
						more capital. A good example of this is with Yearn Finance. Yearn
						was able to generate massive amounts of revenue as a result of the
						large amount of capital they attracted. This gave them the resources
						to further develop and innovate their products in a positive
						feedback loop. Yearn’s success has led to many projects such as
						Alchemix and Abracadabra using their products and liquidity as a
						base layer to build on.
					</p>
					<p>
						nDEFI is composed of the strongest components in the DeFi ecosystem,
						striving to provide core coverage of the key building blocks for the
						future of finance. With nDEFI you’ll have exposure to
						infrastructure, lending markets, decentralized exchanges,
						synthetics, and yield aggregators. The unique weighting formula
						allows the nest to invest in projects gaining traction earlier and
						with a greater weighting than market cap weighted nests.
					</p>
					<p>
						The Polly DeFi Nest will provide the crypto industry's first
						automated value investing, decentralized, tokenized portfolios. When
						you add the prospect of the underlying tokens being put to work to
						earn yield.
					</p>

					<NestHeader>Criteria</NestHeader>
					<p>
						For a project to be included in the Polly Defi Nest, it must fit the
						below criteria in order to reduce the risk of the nest and fit the
						desires of the community.
					</p>
					<NestSubHeader>Characteristics</NestSubHeader>
					<NestList>
						<li>Be a DeFi project available on the Ethereum blockchain.</li>
						<li>Listed on DefiLlama</li>
						<li>
							Have at least 7.5% of the total supply in circulation and have a
							predictable token emission over the next 5 years.
						</li>
						<li>
							The protocols will be selected by TVL based on DeFiLlama’s
							website.
						</li>
						<li>
							The protocol must be running for 3 months before qualifying to be
							included in the nest.
						</li>
						<li>
							In the event of a safety incident, the team must have addressed
							the problem responsibly and promptly, providing users of the
							protocol a reliable solution and document a detailed, transparent
							breakdown of the incident.
						</li>
						<li>Be Ethereum-focused</li>
						<li>Must be sufficiently decentralised</li>
					</NestList>

					<NestHeader>Strategy</NestHeader>
					<p>
						It is possible for the underlying tokens to utilize strategies that
						will earn yield, maximising value for nest holders, who benefit from
						this productivity without having to perform any actions themselves.
						These strategies will be changed over time to take advantage of new
						opportunities or to maximise the yield earned.
					</p>

					<NestHeader>Management</NestHeader>
					<p>The Nest is maintained quarterly in two phases.</p>

					<p>
						<NestSubHeader>Determination Phase</NestSubHeader>
					</p>
					<p>
						The determination phase takes place during the final 2 weeks of the
						quarter. During this phase the changes needed for the next
						reconstitution are determined.
					</p>
					<p>
						The TVL and FDV of each project are recorded, including new projects
						that qualify for the nest and meet the criteria.
					</p>
					<p>
						Proposed changes will be published on the governance forum for 1
						week then a governance vote will run for the community to approve
						changes.
					</p>
					<p>
						<NestSubHeader>Reconstitution Phase</NestSubHeader>
					</p>
					<p>
						In the two weeks following a successful vote, the nest components
						will be adjusted as per the instructions published during the final
						2 weeks of the quarter.
					</p>
				</NestText>
			</NestBox>
		</>
	)
}

export default Nest
