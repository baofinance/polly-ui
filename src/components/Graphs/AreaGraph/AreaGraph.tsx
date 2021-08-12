import React, { useMemo, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { Line, Bar, LinePath, AreaClosed } from '@visx/shape'
import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import { scaleTime, scaleLinear } from '@visx/scale'
import { withTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { localPoint } from '@visx/event'
import { LinearGradient } from '@visx/gradient'
import { min, max, extent, bisector } from 'd3-array'
import { getDisplayBalance } from '../../../utils/formatBalance'
import { curveMonotoneX } from '@visx/visx'

export type TimeseriesData = {
	close: number
	date: string
}

type TooltipData = TimeseriesData

export const accentColor = '#555'
const tooltipStyles = {
	...defaultStyles,
	background: accentColor,
	border: `1px solid ${accentColor}`,
	color: 'white',
}

// util
const formatDate = (date: any) => {
	const options = {
		month: 'short',
		year: 'numeric',
		day: '2-digit',
	}

	return new Date(date).toLocaleDateString('en-US', options)
}

// accessors
const getDate = (d: TimeseriesData) => new Date(d.date)
const getValue = (d: TimeseriesData) => d.close
const bisectDate = bisector<TimeseriesData, Date>((d: any) => new Date(d.date)).left

export type AreaProps = {
	width: number
	height: number
	timeseries?: Array<TimeseriesData>
	timeframe?: string
	margin?: { top: number; right: number; bottom: number; left: number }
}

export default withTooltip<AreaProps, TooltipData>(
	({
		width,
		height,
		timeseries = appleStock,
		timeframe,
		margin = { top: 0, right: 0, bottom: 0, left: 0 },
		showTooltip,
		hideTooltip,
		tooltipData,
		tooltipTop = 0,
		tooltipLeft = 0,
	}: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
		if (width < 10) return null

		// bounds
		const innerWidth = width - margin.left - margin.right
		const innerHeight = height - margin.top - margin.bottom

		const timeSeries = useMemo(() => {
			return timeseries.slice(
				timeframe === 'W' ? -7 : timeframe === 'M' ? -31 : -365,
			)
		}, [timeseries, timeframe])

		// scales
		const dateScale = useMemo(
			() =>
				scaleTime({
					range: [margin.left, innerWidth + margin.left],
					domain: extent(timeSeries, getDate) as [Date, Date],
				}),
			[innerWidth, margin.left, timeSeries],
		)
		const valueScale = useMemo(
			() =>
				scaleLinear({
					range: [innerHeight + margin.top, 0],
					domain: [
						min(timeSeries, getValue) || 0,
						(max(timeSeries, getValue) || 0) + innerHeight / 3,
					],
					nice: true,
				}),
			[margin.top, innerHeight, timeSeries],
		)

		// tooltip handler
		const handleTooltip = useCallback(
			(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
				const { x } = localPoint(event) || { x: 0 }
				const x0 = dateScale.invert(x)
				const index = bisectDate(timeSeries, x0, 1)
				const d0 = timeSeries[index - 1]
				const d1 = timeSeries[index]
				let d = d0
				if (d1 && getDate(d1)) {
					d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0
				}
				showTooltip({
					tooltipData: d,
					tooltipLeft: x,
					tooltipTop: valueScale(getValue(d)),
				})
			},
			[showTooltip, valueScale, dateScale],
		)

		return (
			<div>
				<svg width={width} height={height}>
					<rect
						x={0}
						y={0}
						width={width}
						height={height}
						fill="transparent"
						rx={14}
					/>
					<LinearGradient
						id="line-gradient"
						from={'#3c32f5'}
						to={'#6332f5'}
						toOpacity={0.8}
					/>
					<LinearGradient
						id="area-under-curve-gradient"
						from="#3c32f5"
						to="#6332f5"
						fromOpacity={0.1}
						toOpacity={0.25}
					/>
					<LinePath
						stroke="url(#line-gradient)"
						strokeWidth={2}
						data={timeSeries}
						x={d => dateScale(getDate(d)) ?? 0}
						y={d => valueScale(getValue(d)) ?? 0}
						curve={curveMonotoneX}
					/>
					<AreaClosed<TimeseriesData>
						data={timeSeries}
						x={d => dateScale(getDate(d)) ?? 0}
						y={d => valueScale(getValue(d)) ?? 0}
						yScale={valueScale}
						strokeWidth={1}
						fill="url(#area-under-curve-gradient)"
						curve={curveMonotoneX}
					/>
					<Bar
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						fill="transparent"
						rx={14}
						onTouchStart={handleTooltip}
						onTouchMove={handleTooltip}
						onMouseMove={handleTooltip}
						onMouseLeave={() => hideTooltip()}
					/>
					{tooltipData && (
						<g>
							<Line
								from={{ x: tooltipLeft, y: margin.top }}
								to={{ x: tooltipLeft, y: innerHeight + margin.top }}
								stroke={'#896ed9'}
								strokeWidth={2}
								pointerEvents="none"
								strokeDasharray="5,2"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop + 1}
								r={4}
								fill="black"
								fillOpacity={0.1}
								stroke="black"
								strokeOpacity={0.1}
								strokeWidth={2}
								pointerEvents="none"
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={4}
								fill={accentColor}
								stroke="white"
								strokeWidth={2}
								pointerEvents="none"
							/>
						</g>
					)}
				</svg>
				{tooltipData && (
					<div>
						<TooltipWithBounds
							key={Math.random()}
							top={tooltipTop - 12}
							left={tooltipLeft + 12}
							style={tooltipStyles}
						>
							{`$${getDisplayBalance(
								new BigNumber(getValue(tooltipData)),
								0,
							)} ${formatDate(getDate(tooltipData))}`}
						</TooltipWithBounds>
					</div>
				)}
			</div>
		)
	},
)
