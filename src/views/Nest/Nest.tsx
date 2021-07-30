import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import useNest from '../../hooks/useNest'
import { getContract } from '../../utils/erc20'
import Button from '../../components/Button'
import useModal from '../../hooks/useModal'
import useTokenBalance from '../../hooks/useTokenBalance'
import useNestRedeem from '../../hooks/useNestRedeem'
import IssueModal from './components/IssueModal'
import RedeemModal from './components/RedeemModal'
import BigNumber from 'bignumber.js'
import { getRecipeContract } from '../../bao/utils'
import useBao from '../../hooks/useBao'
import { getDisplayBalance } from '../../utils/formatBalance'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ListGroup from 'react-bootstrap/ListGroup'
import Collapse from 'react-bootstrap/Collapse'
import { Badge, Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { SpinnerLoader } from '../../components/Loader'
import useComposition from '../../hooks/useComposition'
import useNestRate from '../../hooks/useNestRate'
import PieGraph from '../../components/Graphs/PieGraph'
import { ParentSize } from '@visx/responsive'
import AreaGraph from '../../components/Graphs/AreaGraph/AreaGraph'

const nestIcon =
	'https://raw.githubusercontent.com/pie-dao/brand/master/PIE%20Tokens/PLAY.svg'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()
	const nest = useNest(nestId)
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name, icon } = nest
	const composition = useComposition(nest)
	const { wethPerIndex, usdPerIndex } = useNestRate(nestTokenAddress)

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
						<Row xs={1} sm={1} md={1} lg={2} style={{height: '500px' /* TODO: Responsive Size */}}>
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
										{parent => (
											<AreaGraph width={parent.width} height={parent.height} />
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

const NestBox = styled.div`
	width: 60%;
	background: #f0e9e7;
	border: 1px solid #e2d6cfff;
	border-radius: 12px;
	box-shadow: inset 1px 1px 0 #f7f4f2;
	padding: 15px;
	text-align: center;
`

const NestBoxHeader = styled.h1`
	font-family: 'Reem Kufi', sans-serif;
	color: ${props => props.theme.color.grey[500]};
	margin-bottom: 10px;
	margin-top: 0;
	font-size: 32px;

	small {
		display: block;
		font-family: 'Reem Kufi', sans-serif;
		font-size: 40%;
		margin-top: 5px;
	}
`

const AssetImageContainer = styled.div`
	display: inline-block;
	background-color: #e2d6cf;
	border-radius: 50%;
	width: 48px;
	height: 48px;
	margin: 10px 15px;

	img {
		height: 32px;
		vertical-align: middle;
	}
`

interface NestBreakProps {
	margin: number
}

const NestBoxBreak = styled.hr.attrs((props: NestBreakProps) => ({
	margin: props.margin ? `${props.margin}px auto` : '30px auto'
}))`
	border: none;
	margin: ${props => props.margin};
	border-bottom: 2px solid ${props => props.theme.color.grey[500]};
	width: 40%;
`

const NestCornerButton = styled.a`
	float: right;
	margin-top: 10px;
	margin-right: 10px;
	font-size: 24px;
	vertical-align: middle;

	&:hover {
		cursor: pointer;
	}
`

const NestAnalytics = styled(Collapse)`
	margin-bottom: 50px;
`

const NestAnalyticsContainer = styled.div.attrs(props => ({
	id: 'analytics-collapse'
}))``

const GraphLabel = styled.h2`
	font-family: 'Kaushan Script', sans-serif;
	color: ${props => props.theme.color.grey[500]};
	background-color: ${props => props.theme.color.grey[300]};
	width: 80%;
	margin: 0 auto;
	padding: 10px;
	border: 1px solid #e2d6cfff;
	border-top-right-radius: 12px;
	border-top-left-radius: 12px;
`

const GraphContainer = styled(Col)`
	background-color: ${props => props.theme.color.grey[100]};
	box-shadow: inset 1px 1px 0 #f7f4f2;
	width: 80%;
	height: 80%;
	margin: 0 auto;
	border: 1px solid #e2d6cfff;
	border-radius: 0 0 12px 12px;
	overflow: hidden;
`

const StatsCard = styled(Card)`
	background-color: transparent;
	border: none;
	justify-content: center;
	margin-top: 2.5rem;
	margin-bottom: 2.5rem;
`

const StatsCardHeader = styled(Card.Header)`
	font-weight: bold;
	background-color: ${props => props.theme.color.grey[300]};
	color: ${props => props.theme.color.grey[600]};
	width: 70%;
	margin: 0 auto 0;
	border: 1px solid ${props => props.theme.color.grey[400]};
	border-bottom: none;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
`

const StatsCardBody = styled(Card.Body)`
	padding: 0;
`

const NestStats = styled(ListGroup)`
	margin: 0 auto;
	width: 70%;
	justify-content: center;

	.list-group-item:last-child {
		border-top-right-radius: 0 !important;
	}

	.list-group-item:first-child {
		border-top-left-radius: 0;
	}
`

const NestStat = styled(ListGroup.Item)`
	background-color: ${props => props.theme.color.grey[100]};
	border-color: ${props => props.theme.color.grey[400]};
	color: ${props => props.theme.color.grey[500]};
	width: 25%;

	span {
		font-weight: bold;
	}
`

const StyledBadge = styled(Badge)`
	background-color: ${props => props.theme.color.grey[500]};
	color: ${props => props.theme.color.grey[100]};
`

const Icon = styled.img`
	vertical-align: middle;
	width: 100%;
	display: inline;
	height: 80px;
`

const NestButtons = styled.div`
	align-items: center;
	flex-grow: 1;
	margin-right: 0;
	justify-content: center;
	vertical-align: middle;
	display: flex;
	margin-top: 15px;
	margin-bottom: 0;
`

export default Nest
