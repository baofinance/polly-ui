import React, { useEffect, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import _ from 'lodash'
import GraphClient from '../../../utils/graph'
import { getDisplayBalance } from '../../../utils/formatBalance'
import { addressMap, supportedNests } from '../../../bao/lib/constants'
import AreaGraph from '../../../components/Graphs/AreaGraph/AreaGraph'
import { PrefButtons, NestBoxHeader, GraphContainer } from '../../Nest/styles'
import { ParentSize } from '@visx/responsive'
import { Button } from 'react-bootstrap'
import { SpinnerLoader } from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import styled from 'styled-components'

const PriceGraphs: React.FC = () => {
	const [priceData, setPriceData] = useState<any | undefined>()
	const [activeNest, setActiveNest] = useState<any | undefined>()

	const activeToken = useMemo(() => {
		return _.find(
			priceData,
			(d: any) => d.id === addressMap.WETH, // activeNest.nestAddress[137]
		)
	}, [activeNest])

	const indexPriceChange24h = useMemo(() => {
		if (!(activeNest && activeToken.dayData)) return

		const { dayData } = activeToken
		return new BigNumber(dayData[dayData.length - 1].close)
			.minus(dayData[dayData.length - 2].close)
			.div(dayData[dayData.length - 1].close)
			.times(100)
	}, [activeNest])

	useEffect(() => {
		GraphClient.getPriceHistoryMultiple(
			supportedNests.map(() => addressMap.WETH), // nest.nestAddress[137]
		).then((res: any) => {
			// Clean price data from subgraph
			const tokens = _.cloneDeep(res.tokens).map((token: any) => {
				token.dayData = _cleanPriceData(token.dayData)
				return token
			})
			setPriceData(tokens)
			setActiveNest(supportedNests[0])
		})
	}, [])

	const _cleanPriceData = (dayData: any) =>
		_.reverse(
			dayData.map((data: any) => ({
				date: new Date(data.date * 1000).toISOString(),
				close: parseFloat(data.priceUSD),
			})),
		)

	return (
		<PriceGraphContainer>
			<PrefButtons style={{ width: '100%' }}>
				<NestBoxHeader style={{ float: 'left' }}>Nest Price</NestBoxHeader>
				{supportedNests.map((nest) => (
					<Button
						variant="outline-primary"
						onClick={() => setActiveNest(nest)}
						active={activeNest === nest}
						key={nest.symbol}
						style={{ margin: '5px 10px' }}
					>
						{nest.symbol}
					</Button>
				))}
				<NestBoxHeader style={{ float: 'right' }}>
					{indexPriceChange24h ? (
						<>
							$
							{activeToken.dayData &&
								getDisplayBalance(
									new BigNumber(
										activeToken.dayData[activeToken.dayData.length - 1].close,
									),
									0,
								)}
							<span
								className="smalltext"
								style={{
									color: indexPriceChange24h.gt(0) ? 'green' : 'red',
								}}
							>
								{activeToken.dayData &&
									getDisplayBalance(indexPriceChange24h, 0)}
								{'%'}
							</span>
						</>
					) : (
						<SpinnerLoader />
					)}
				</NestBoxHeader>
			</PrefButtons>
			<Spacer />
			{activeNest && (
				<StyledGraphContainer>
					<ParentSize>
						{(parent) => (
							<AreaGraph
								width={parent.width}
								height={parent.height}
								timeseries={activeToken.dayData}
								timeframe="Y"
							/>
						)}
					</ParentSize>
				</StyledGraphContainer>
			)}
		</PriceGraphContainer>
	)
}

const PriceGraphContainer = styled.div`
	width: 80%;
	margin: 0 auto;
`

const StyledGraphContainer = styled(GraphContainer)`
	width: 100%;
	margin: 2.5em auto 0;
`

export default PriceGraphs
