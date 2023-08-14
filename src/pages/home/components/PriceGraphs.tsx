import Config from '@/bao/lib/config'
import Button from '@/components/Button'
import { PriceGraphContainer, StyledGraphContainer } from '@/components/Graphs'
import AreaGraph from '@/components/Graphs/AreaGraph/AreaGraph'
import Loader from '@/components/Loader'
import GraphClient from '@/utils/graph'
import { getDisplayBalance } from '@/utils/numberFormat'
import { ParentSize } from '@visx/responsive'
import { BigNumber } from 'ethers'
import _ from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'

const PriceGraphs: React.FC = () => {
	const [priceData, setPriceData] = useState<any | undefined>()
	const [activeNest, setActiveNest] = useState<any | undefined>()

	const activeToken = useMemo(() => {
		return _.find(
			priceData,
			(d: any) => d.id === Config.addressMap.WETH, // activeNest.nestAddress[137]
		)
	}, [priceData])

	const nestPriceChange24h = useMemo(() => {
		if (!(activeNest && activeToken.dayData)) return

		const { dayData } = activeToken
		return BigNumber.from(dayData[dayData.length - 1].close)
			.sub(dayData[dayData.length - 2].close)
			.div(dayData[dayData.length - 1].close)
			.mul(100)
	}, [activeNest, activeToken])

	useEffect(() => {
		GraphClient.getPriceHistoryMultiple(
			Config.nests.map(() => Config.addressMap.WETH), // nest.nestAddress[137]
		).then((res: any) => {
			// Clean price data from subgraph
			const tokens = _.cloneDeep(res.tokens).map((token: any) => {
				token.dayData = _cleanPriceData(token.dayData)
				return token
			})
			setPriceData(tokens)
			setActiveNest(Config.nests[0])
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
			<div className='m-auto'>
				<div className='float-left text-pollyWhite m-auto text-xl'>Nest Price</div>
				{Config.nests.map(nest => (
					<Button
						onClick={() => setActiveNest(nest)}
						key={nest.symbol}
						style={{
							margin: `${(props: { theme: { spacing: any[] } }) => props.theme.spacing[1]}px ${(props: { theme: { spacing: any[] } }) =>
								props.theme.spacing[2]}px`,
						}}
					>
						{nest.symbol}
					</Button>
				))}
				<div className='float-left text-pollyWhite m-auto text-xl'>
					{nestPriceChange24h ? (
						<>
							${activeToken.dayData && getDisplayBalance(BigNumber.from(activeToken.dayData[activeToken.dayData.length - 1].close), 0)}
							<span
								className='smalltext'
								style={{
									color: nestPriceChange24h.gt(0) ? '${(props) => props.theme.color.green}' : '${(props) => props.theme.color.red}',
								}}
							>
								{activeToken.dayData && getDisplayBalance(nestPriceChange24h, 0)}
								{'%'}
							</span>
						</>
					) : (
						<Loader />
					)}
				</div>
			</div>
			{activeNest && (
				<StyledGraphContainer>
					<ParentSize>
						{parent => <AreaGraph width={parent.width} height={parent.height} timeseries={activeToken.dayData} timeframe='Y' />}
					</ParentSize>
				</StyledGraphContainer>
			)}
		</PriceGraphContainer>
	)
}

export default PriceGraphs
