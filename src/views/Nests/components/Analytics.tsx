import { ParentSize } from '@visx/responsive'
import { ActiveSupportedNest } from 'bao/lib/types'
import BigNumber from 'bignumber.js'
import { PrefButtons } from 'components/Button'
import { GraphContainer, PriceGraph } from 'components/Graphs'
import AreaGraph from 'components/Graphs/AreaGraph/AreaGraph'
import { SpinnerLoader } from 'components/Loader'
import useGraphPriceHistory from 'hooks/baskets/useGraphPriceHistory'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import { Button as BootButton, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/numberFormat'

type AnalyticsProps = {
	nest: ActiveSupportedNest
}

const Analytics: React.FC<AnalyticsProps> = ({ nest }) => {
	const [priceHistoryTimeFrame, setPriceHistoryTimeFrame] = useState('M')
	const priceHistory = useGraphPriceHistory(nest)
	const nestPriceChange24h = useMemo(() => {
		return (
			priceHistory &&
			new BigNumber(priceHistory[priceHistory.length - 1].close)
				.minus(priceHistory[priceHistory.length - 2].close)
				.div(priceHistory[priceHistory.length - 1].close)
				.times(100)
		)
	}, [priceHistory])

	return (
		<>
			<div style={{ padding: '0 0.75rem' }}>
				{priceHistory && priceHistory[priceHistory.length - 1].close > 0 && (
					<PriceGraph>
						<Row style={{ marginBottom: '0.5rem' }}>
							<Col>
								<BasketHeader style={{ float: 'left', marginRight: '8px' }}>
									Nest Price
								</BasketHeader>{' '}
								<PrefButtons>
									{_.map(['W', 'M', 'Y'], (timeFrame) => (
										<BootButton
											variant="outline-primary"
											onClick={() => setPriceHistoryTimeFrame(timeFrame)}
											active={priceHistoryTimeFrame === timeFrame}
											key={timeFrame}
											style={{
												marginTop: '0px',
												borderColor: 'transparent',
												padding: '8px',
												height: '36px',
												width: '36px',
											}}
										>
											{timeFrame}
										</BootButton>
									))}
								</PrefButtons>
								<BasketHeader style={{ float: 'right' }}>
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
												style={{
													fontSize: '1rem',
													color: nestPriceChange24h.gt(0) ? 'green' : 'red',
													marginLeft: '0.5rem',
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
								</BasketHeader>
							</Col>
						</Row>
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
			</div>
		</>
	)
}

export default Analytics

export const BasketHeader = styled.div`
	font-family: 'Rubik', sans-serif;
	color: ${(props) => props.theme.color.text[100]};
	margin: auto;
	font-size: 1.5rem;
	vertical-align: middle;

	p {
		margin: 0;
	}

	span.badge {
		font-size: 1.25rem;
		margin-bottom: ${(props) => props.theme.spacing[3]}px;
	}

	span.smalltext {
		float: right;
		font-size: 1rem;
		margin-top: ${(props) => props.theme.spacing[3]}px;
		margin-left: ${(props) => props.theme.spacing[2]}px;
	}

	img {
		text-align: center;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		font-size: 1.5rem;
	}
`
