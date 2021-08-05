import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import Button from '../../components/Button'
import IssueModal from './components/IssueModal'
import RedeemModal from './components/RedeemModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { SpinnerLoader } from '../../components/Loader'
import PieGraph from '../../components/Graphs/PieGraph'
import { ParentSize } from '@visx/responsive'
import AreaGraph from '../../components/Graphs/AreaGraph/AreaGraph'
import { getRecipeContract } from '../../bao/utils'
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
import { useParams } from 'react-router-dom'
import {
	NestBox,
	NestCornerButton,
	NestBoxHeader,
	AssetImageContainer,
	Icon,
	NestBoxBreak,
	StatsCard,
	StatsCardHeader,
	StatsCardBody,
	NestStats,
	NestStat,
	NestButtons,
	StyledBadge,
	NestAnalytics,
	NestAnalyticsContainer,
	GraphLabel,
	GraphContainer
} from './styles'

// will replace with nest icons once they're designed
const nestIcon =
	'https://raw.githubusercontent.com/pie-dao/brand/master/PIE%20Tokens/PLAY.svg'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()
	const nest = useNest(nestId)
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name, icon } = nest
	const composition = useComposition(nest)
	const { wethPerIndex, usdPerIndex } = useNestRate(nestTokenAddress)
	const priceHistory = useGraphPriceHistory(nest)

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

	const nestTokenName = useMemo(() => {
		return nestToken.toUpperCase()
	}, [nestToken])

	const tokenBalance = useTokenBalance(nestContract.options.address)
	const bao = useBao()
	const recipeContract = getRecipeContract(bao)

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

	const [supply, setSupply] = useState<BigNumber | undefined>()
	const [analyticsOpen, setAnalyticsOpen] = useState(false)

	useEffect(() => {
		if (nestContract.options.address)
			nestContract.methods.totalSupply().call().then((_supply: any) => setSupply(new BigNumber(_supply)))
	}, [bao, ethereum])

	return (
		<>
			<NestBox>
				<OverlayTrigger overlay={<Tooltip id={Math.random().toString()}>View Analytics</Tooltip>} placement='bottom'>
					<NestCornerButton
						onClick={() => setAnalyticsOpen(!analyticsOpen)}
						aria-controls='analytics-collapse'
						aria-expanded={analyticsOpen}
					>
						<FontAwesomeIcon icon='chart-line' />
					</NestCornerButton>
				</OverlayTrigger>
				<OverlayTrigger overlay={<Tooltip id={Math.random().toString()}>View Contract</Tooltip>} placement='bottom'>
					<NestCornerButton href={`https://polygonscan.com/address/${nestTokenAddress}`} target='_blank'>
						<FontAwesomeIcon icon='file-contract' />
					</NestCornerButton>
				</OverlayTrigger>
				<NestBoxHeader>
					<Icon src={nestIcon} alt={nestToken} />
					{name}
					<br />
					{composition ? composition.map((component: any) => {
						return (
							<OverlayTrigger
								placement='bottom'
								overlay={<Tooltip id={component.symbol}>{component.symbol}</Tooltip>}
								key={component.symbol}
							>
								<AssetImageContainer>
									<img src={component.imageUrl} />
								</AssetImageContainer>
							</OverlayTrigger>
						)
					}) : <SpinnerLoader />}
				</NestBoxHeader>
				<NestBoxBreak margin={10} />
				<StatsCard>
					<StatsCardHeader>
						1 {nestToken} = {wethPerIndex && getDisplayBalance(wethPerIndex, 0) || <SpinnerLoader />}{' '}
						<FontAwesomeIcon icon={['fab', 'ethereum']} /> = $
						{usdPerIndex && getDisplayBalance(usdPerIndex, 0) || <SpinnerLoader />}
					</StatsCardHeader>
					<StatsCardBody>
						<NestStats horizontal>
							<NestStat key={'mkt-cap'}>
								<span>
									<FontAwesomeIcon icon='hand-holding-usd' />
									<br />
									Market Cap
								</span>
								<br />
								{(
									supply &&
									usdPerIndex &&
									<StyledBadge>
										${getDisplayBalance(supply.div(10 ** 18).times(usdPerIndex), 0)}
									</StyledBadge>
								) || <SpinnerLoader />}
							</NestStat>
							<NestStat key={'supply'}>
								<span>
									<FontAwesomeIcon icon='coins' />
									<br />
									Supply
								</span>
								<br />
								<StyledBadge>{(supply && `${getDisplayBalance(supply)} ${nestToken}`) || <SpinnerLoader />}</StyledBadge>
							</NestStat>
							<NestStat key={Math.random().toString()}>
								<span>
									<FontAwesomeIcon icon='times-circle' />
									<br />
									NAV
								</span>
								<br />
								<StyledBadge>0</StyledBadge>
							</NestStat>
							<NestStat key={Math.random().toString()}>
								<span>
									<FontAwesomeIcon icon='times-circle' />
									<br />
									Premium
								</span>
								<br />
								<StyledBadge>0</StyledBadge>
							</NestStat>
						</NestStats>
					</StatsCardBody>
				</StatsCard>
				<NestButtons>
					<Button text="Issue" onClick={onPresentDeposit} width="30%" />
					<Spacer />
					<Button
						disabled={tokenBalance.eq(new BigNumber(0))}
						text="Redeem"
						onClick={onPresentRedeem}
						width="30%"
					/>
				</NestButtons>
				<NestAnalytics in={analyticsOpen}>
					<NestAnalyticsContainer>
						<NestBoxBreak />
						<Row xs={1} sm={1} md={1} lg={2} style={{height: '500px'}}>
							<Col>
								<GraphLabel>Asset Allocation</GraphLabel>
								<GraphContainer>
									{composition && (
										<ParentSize>
											{parent => (
												<PieGraph width={parent.width} height={parent.height} composition={composition} />
											)}
										</ParentSize>
									)}
								</GraphContainer>
							</Col>
							<Col>
								<GraphLabel>Index Price</GraphLabel>
								<GraphContainer>
									<ParentSize>
										{parent => priceHistory && (
											<AreaGraph width={parent.width} height={parent.height} timeseries={priceHistory} />
										)}
									</ParentSize>
								</GraphContainer>
							</Col>
						</Row>
					</NestAnalyticsContainer>
				</NestAnalytics>
			</NestBox>
		</>
	)
}

export default Nest
