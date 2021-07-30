import React, { useMemo, useCallback } from 'react'
import { AreaClosed, Line, Bar } from '@visx/shape'
import appleStock from '@visx/mock-data/lib/mocks/appleStock'
import { curveMonotoneX } from '@visx/curve'
import { GridRows, GridColumns } from '@visx/grid'
import { scaleTime, scaleLinear } from '@visx/scale'
import { withTooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { localPoint } from '@visx/event'
import { LinearGradient } from '@visx/gradient'
import { max, extent, bisector } from 'd3-array'

export type TimeseriesData = {
	close: number
	date: string
}

type TooltipData = TimeseriesData

export const background = '#805e49'
export const accentColor = background
export const accentColorDark = '#e7a984'
const tooltipStyles = {
	...defaultStyles,
	background,
	border: '1px solid #e7a984',
	color: 'white',
}

// util
const formatDate = (date: any) => {
	const options = {
		month: 'short',
		year: 'numeric',
		day: '2-digit'
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
	margin?: { top: number; right: number; bottom: number; left: number }
}

export default withTooltip<AreaProps, TooltipData>(({
		width,
		height,
		timeseries = appleStock,
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

		// scales
		const dateScale = useMemo(
			() =>
				scaleTime({
					range: [margin.left, innerWidth + margin.left],
					domain: extent(timeseries, getDate) as [Date, Date],
				}),
			[innerWidth, margin.left],
		)
		const valueScale = useMemo(
			() =>
				scaleLinear({
					range: [innerHeight + margin.top, margin.top],
					domain: [0, (max(timeseries, getValue) || 0) + innerHeight / 3],
					nice: true,
				}),
			[margin.top, innerHeight],
		)

		// tooltip handler
		const handleTooltip = useCallback(
			(event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
				const { x } = localPoint(event) || { x: 0 }
				const x0 = dateScale.invert(x)
				const index = bisectDate(timeseries, x0, 1)
				const d0 = timeseries[index - 1]
				const d1 = timeseries[index]
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
						fill='url(#area-background-gradient)'
						rx={14}
					/>
					<LinearGradient id='area-gradient' from={accentColor} to={accentColor} toOpacity={0.5} />
					<GridRows
						left={margin.left}
						scale={valueScale}
						width={innerWidth}
						strokeDasharray='1,3'
						stroke={accentColor}
						strokeOpacity={0}
						pointerEvents='none'
					/>
					<GridColumns
						top={margin.top}
						scale={dateScale}
						height={innerHeight}
						strokeDasharray='1,3'
						stroke={accentColor}
						strokeOpacity={0.2}
						pointerEvents='none'
					/>
					<AreaClosed<TimeseriesData>
						data={timeseries}
						x={d => dateScale(getDate(d)) ?? 0}
						y={d => valueScale(getValue(d)) ?? 0}
						yScale={valueScale}
						strokeWidth={1}
						stroke='url(#area-gradient)'
						fill='url(#area-gradient)'
						curve={curveMonotoneX}
					/>
					<Bar
						x={margin.left}
						y={margin.top}
						width={innerWidth}
						height={innerHeight}
						fill='transparent'
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
								stroke={accentColorDark}
								strokeWidth={2}
								pointerEvents='none'
								strokeDasharray='5,2'
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop + 1}
								r={4}
								fill='black'
								fillOpacity={0.1}
								stroke='black'
								strokeOpacity={0.1}
								strokeWidth={2}
								pointerEvents='none'
							/>
							<circle
								cx={tooltipLeft}
								cy={tooltipTop}
								r={4}
								fill={accentColorDark}
								stroke='white'
								strokeWidth={2}
								pointerEvents='none'
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
							{`$${getValue(tooltipData)} ${formatDate(getDate(tooltipData))}`}
						</TooltipWithBounds>
					</div>
				)}
			</div>
		)
	},
)
