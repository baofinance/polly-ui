import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ParentSize } from '@visx/responsive'
import { BigNumber } from 'bignumber.js'
import { AssetBadge, CompositionBadge } from 'components/Badge/Badge'
import { PrefButtons } from 'components/Button/Button'
import { TableContainer } from 'components/Table'
import _ from 'lodash'
import React, { useMemo, useState } from 'react'
import { Button as BootButton, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import DonutGraph from '../../../components/Graphs/PieGraph'
import { SpinnerLoader } from '../../../components/Loader'
import { Progress } from '../../../components/ProgressBar'
import { StyledTable } from '../../../components/Table'
import Tooltipped from '../../../components/Tooltipped'
import { BasketComponent } from '../../../hooks/baskets/useComposition'
import { getDisplayBalance } from '../../../utils/numberFormat'

type CompositionProps = {
	composition: BasketComponent[]
}

type DisplayType = 'TABLE' | 'PIE'

const Composition: React.FC<CompositionProps> = ({ composition }) => {
	const [displayType, setDisplayType] = useState<DisplayType>('TABLE')

	const maxPercentage = useMemo(() => {
		if (!composition) return

		return _.max(composition.map((component) => component.percentage))
	}, [composition])

	return (
		<div style={{ padding: '0 0.75rem' }}>
			<Row style={{ marginBottom: '0.5rem' }}>
				<Col>
					<BasketHeader style={{ float: 'left', marginRight: '8px' }}>
						Allocation Breakdown
					</BasketHeader>{' '}
					<PrefButtons>
						<BootButton
							active={displayType === 'TABLE'}
							variant="outline-primary"
							onClick={() => setDisplayType('TABLE')}
							style={{
								marginTop: '0px',
								borderColor: 'transparent',
								padding: '8px',
								height: '36px',
								width: '36px',
							}}
						>
							<FontAwesomeIcon icon="table" size="xs" />
						</BootButton>
						<BootButton
							active={displayType === 'PIE'}
							variant="outline-primary"
							onClick={() => setDisplayType('PIE')}
							style={{
								marginTop: '0px',
								borderColor: 'transparent',
								padding: '8px',
								height: '36px',
								width: '36px',
							}}
						>
							<FontAwesomeIcon icon="chart-pie" size="xs" />
						</BootButton>
					</PrefButtons>
				</Col>
			</Row>
			{displayType === 'TABLE' ? (
				<StyledTable bordered hover>
					<thead>
						<tr>
							<th>Token</th>
							<th>Allocation</th>
							<th className="price">Price</th>
							<th className="apy">APY</th>
							<th className="strategy">Strategy</th>
						</tr>
					</thead>
					<tbody>
						{(composition &&
							composition
								.sort((a, b) => (a.percentage < b.percentage ? 1 : -1))
								.map((component: any) => (
									<tr key={component.symbol}>
										<td width="15%">
											<Tooltipped content={component.symbol}>
												<img
													src={component.image}
													style={{ height: '32px' }}
													alt="component"
												/>
											</Tooltipped>
										</td>
										<td width="40%">
											<Progress
												width={(component.percentage / maxPercentage) * 100}
												label={`${getDisplayBalance(
													new BigNumber(component.percentage),
													0,
												)}%`}
												assetColor={component.color}
											/>
										</td>
										<td className="price" width="20%">
											$
											{getDisplayBalance(
												component.basePrice || component.price,
												0,
											)}
										</td>
										<td className="apy" width="10%">
											<Tooltipped
												content={
													component.apy
														? `${component.apy
																.div(1e18)
																.times(100)
																.toFixed(18)}%`
														: '~'
												}
											>
												<CompositionBadge>
													{component.apy
														? `${component.apy
																.div(1e18)
																.times(100)
																.toFixed(2)}%`
														: '~'}
												</CompositionBadge>
											</Tooltipped>
										</td>
										<td className="strategy" width="15%">
											<CompositionBadge>
												{component.strategy || 'None'}
											</CompositionBadge>
										</td>
									</tr>
								))) || (
							<tr>
								{['name', 'perc', 'price', 'apy', 'strategy'].map((tdClass) => (
									<td key={Math.random()} className={tdClass}>
										<SpinnerLoader />
									</td>
								))}
							</tr>
						)}
					</tbody>
				</StyledTable>
			) : (
				<GraphContainer>
					<Row style={{ height: '100%' }}>
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
											<AssetBadge color={component.color}>
												{component.symbol}
											</AssetBadge>
										</Col>
									))}
							</Row>
						</Col>
					</Row>
				</GraphContainer>
			)}
		</div>
	)
}

const GraphContainer = styled.div`
	height: 500px;
	border-radius: 8px;
	background-color: ${(props) => props.theme.color.transparent[100]};
`

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

export default Composition
