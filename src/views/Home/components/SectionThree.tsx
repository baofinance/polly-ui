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

const SectionThree: React.FC = () => {
	const [priceData, setPriceData] = useState<any | undefined>()
	const [activeNest, setActiveNest] = useState<any | undefined>()

	const activeToken = useMemo(() => {
		return _.find(
			priceData,
			(d: any) => d.id === addressMap.WETH  // activeNest.nestAddress[137]
		)
	}, [activeNest])

	useEffect(() => {
		GraphClient.getPriceHistoryMultiple(
			supportedNests.map(nest => addressMap.WETH) // nest.nestAddress[137]
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
			}))
		)

	return (
		<SectionThreeContainer>
			<PrefButtons style={{ width: '100%' }}>
				<NestBoxHeader style={{ float: 'left' }}>
					{(activeNest && activeNest.symbol) || <SpinnerLoader />}
				</NestBoxHeader>
				{supportedNests.map(nest => (
					<Button
						variant="outline-primary"
						onClick={() => setActiveNest(nest)}
						active={activeNest === nest}
					>
						{nest.symbol}
					</Button>
				))}
				<NestBoxHeader style={{ float: 'right' }}>
					{
						(activeNest && `$${getDisplayBalance(
							new BigNumber(
								activeToken.dayData[activeToken.dayData.length - 1].close
							),
							0
						)}`) || <SpinnerLoader />
					}
				</NestBoxHeader>
			</PrefButtons>
			<Spacer />
			{activeNest && (
				<StyledGraphContainer>
					<ParentSize>
						{parent => (
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
		</SectionThreeContainer>
	)
}

const SectionThreeContainer = styled.div`
	width: 80%;
	margin: 0 auto;
`

const StyledGraphContainer = styled(GraphContainer)`
	width: 100%;
	margin: 0 auto;
`

export default SectionThree
