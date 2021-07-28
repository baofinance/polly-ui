import React, { useState } from 'react'
import Pie, { PieArcDatum, ProvidedProps } from '@visx/shape/lib/shapes/Pie'
import { Group } from '@visx/group'
import { animated, interpolate, useTransition } from 'react-spring'
import { NestComponent } from '../../../contexts/Nests/types'
import { getDisplayBalance } from '../../../utils/formatBalance'
import _ from 'lodash'

interface AssetAllocation {
	label: string
	usage: number
	color: string
}

interface AssetAllocationAmount {
	label: string
	frequency: number
	color: string
}

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

export type PieProps = {
	width: number
	height: number
	composition: Array<NestComponent>
	margin?: typeof defaultMargin
	animate?: boolean
}

export default function PieGraph({
  width,
  height,
  composition,
  margin = defaultMargin,
  animate = false,
}: PieProps) {
	const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
	const [selectedAssetAmount, setSelectedAssetAmount] = useState<string | null>(null)

	const assets: AssetAllocation[] = composition.map(component => ({
		label: `${component.symbol}\n${component.percentage}%`,
		usage: Number(component.percentage),
		color: component.color,
	}))
	const assetsUsd: AssetAllocationAmount[] = _.reverse(composition).map(component => ({
		label: `${getDisplayBalance(component.balance, component.balanceDecimals)} ${component.symbol}`,
		frequency: component.percentage,
		color: component.color
	}))

	const usage = (d: AssetAllocation) => d.usage
	const frequency = (d: AssetAllocationAmount) => d.frequency

	if (width < 10) return null

	const innerWidth = width - margin.left - margin.right
	const innerHeight = height - margin.top - margin.bottom
	const radius = Math.min(innerWidth, innerHeight) / 2
	const centerY = innerHeight / 2
	const centerX = innerWidth / 2
	const donutThickness = 50

	return (
		<svg width={width} height={height}>
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				<Pie
					data={
						selectedAsset ? assets.filter(({ label }) => label === selectedAsset) : assets
					}
					pieValue={usage}
					outerRadius={radius}
					innerRadius={radius - donutThickness}
					cornerRadius={3}
					padAngle={0.005}
				>
					{pie => (
						<AnimatedPie<AssetAllocation>
							{...pie}
							animate={animate}
							getKey={arc => arc.data.label}
							onClickDatum={({ data: { label } }) =>
								animate &&
								setSelectedAsset(selectedAsset && selectedAsset === label ? null : label)
							}
							getColor={arc => arc.data.color}
						/>
					)}
				</Pie>
				<Pie
					data={
						selectedAssetAmount
							? assetsUsd.filter(({ label }) => label === selectedAssetAmount)
							: assetsUsd
					}
					pieValue={frequency}
					pieSortValues={() => -1}
					outerRadius={radius - donutThickness * 1.3}
				>
					{pie => (
						<AnimatedPie<AssetAllocationAmount>
							{...pie}
							animate={animate}
							getKey={({ data: { label } }) => label}
							onClickDatum={({ data: { label } }) =>
								animate &&
								setSelectedAssetAmount(
									selectedAssetAmount && selectedAssetAmount === label ? null : label,
								)
							}
							getColor={({ data: { color } }) => color}
						/>
					)}
				</Pie>
			</Group>
		</svg>
	)
}

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number }

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
	// enter from 360° if end angle is > 180°
	startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
	opacity: 0,
})
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
	startAngle,
	endAngle,
	opacity: 1,
})

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
	animate?: boolean
	getKey: (d: PieArcDatum<Datum>) => string
	getColor: (d: PieArcDatum<Datum>) => string
	onClickDatum: (d: PieArcDatum<Datum>) => void
	delay?: number
}

function AnimatedPie<Datum>({
	animate,
	arcs,
	path,
	getKey,
	getColor,
	onClickDatum,
}: AnimatedPieProps<Datum>) {
	const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
		from: animate ? fromLeaveTransition : enterUpdateTransition,
		enter: enterUpdateTransition,
		update: enterUpdateTransition,
		leave: animate ? fromLeaveTransition : enterUpdateTransition,
		keys: getKey,
	})
	return transitions((props, arc, { key }) => {
		const [centroidX, centroidY] = path.centroid(arc)
		const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1

		return (
			<g key={key}>
				<animated.path
					// compute interpolated path d attribute from intermediate angle values
					d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
						path({
							...arc,
							startAngle,
							endAngle,
						}),
					)}
					fill={getColor(arc)}
					onClick={() => onClickDatum(arc)}
					onTouchStart={() => onClickDatum(arc)}
				/>
				{hasSpaceForLabel && (
					<animated.g style={{ opacity: props.opacity }}>
						<text
							fill="white"
							x={centroidX}
							y={centroidY}
							dy=".33em"
							fontSize={9}
							textAnchor="middle"
							pointerEvents="none"
						>
							{getKey(arc)}
						</text>
					</animated.g>
				)}
			</g>
		)
	})
}
