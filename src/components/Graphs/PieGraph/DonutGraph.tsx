import Loader from '@/components/Loader'
import { NestComponent } from '@/hooks/nests/useComposition'
import { NestInfo } from '@/hooks/nests/useNestInfo'
import { NestRates } from '@/hooks/nests/useNestRate'
import { getDisplayBalance } from '@/utils/numberFormat'
import { Group } from '@visx/group'
import Pie, { PieArcDatum, ProvidedProps } from '@visx/shape/lib/shapes/Pie'
import { Text } from '@visx/text'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import _ from 'lodash'
import { useState } from 'react'
import { animated, interpolate, useTransition } from 'react-spring'

interface AssetAllocationAmount {
	symbol: string
	balance: BigNumber
	decimals: number
	tvl: BigNumber
	frequency: BigNumber
	color: string
}

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 }

export type DonutProps = {
	width: number
	height: number
	composition: NestComponent[]
	rates: NestRates
	info: NestInfo
	nest: string
	margin?: typeof defaultMargin
	animate?: boolean
}

export default function DonutGraph({ width, height, composition, rates, info, margin = defaultMargin }: DonutProps) {
	const [active, setActive] = useState(null)

	const assetsBalance: AssetAllocationAmount[] =
		composition &&
		composition.map(component => {
			return {
				tvl: component.price.mul(component.balance.toString()).div(BigNumber.from(10).pow(component.decimals)),
				symbol: component.symbol,
				balance: component.balance,
				decimals: component.decimals,
				frequency: component.percentage,
				color: component.color,
			}
		})

	const frequency = (d: AssetAllocationAmount) => parseFloat(formatUnits(d.frequency))

	if (width < 10) return null

	const innerWidth = width - margin.left - margin.right
	const innerHeight = height - margin.top - margin.bottom
	const radius = Math.min(innerWidth, innerHeight) / 2
	const centerY = innerHeight / 2
	const centerX = innerWidth / 2

	return (
		<svg width={width} height={height}>
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				<Pie
					data={assetsBalance}
					pieValue={frequency}
					pieSortValues={() => -1}
					outerRadius={radius}
					innerRadius={({ data }) => {
						const size = active && active.symbol == data.symbol ? 6 : 6
						return radius - size
					}}
					padAngle={0.01}
				>
					{pie => {
						return pie.arcs.map(arc => {
							return (
								<g
									key={arc.data.symbol}
									className='duration-200'
									onMouseEnter={() => setActive(arc.data)}
									onMouseLeave={() => setActive(null)}
								>
									<defs>
										<filter id='glow'>
											<feGaussianBlur className='blur' result='coloredBlur' stdDeviation='2'></feGaussianBlur>
											<feMerge>
												<feMergeNode in='coloredBlur'></feMergeNode>
												<feMergeNode in='SourceGraphic'></feMergeNode>
											</feMerge>
										</filter>
									</defs>
									<path
										d={pie.path(arc)}
										fill={arc.data.color}
										filter={active && active.symbol == arc.data.symbol ? 'url(#glow)' : ''}
									></path>
								</g>
							)
						})
					}}
				</Pie>
				{!active ? (
					<>
						<Text textAnchor='middle' fill='#faf2e3' className='font-bakbak text-lg' dy={-2}>
							{`${rates && info ? `$${getDisplayBalance(rates.usd.mul(info.totalSupply), 36)}` : <Loader />}`}
						</Text>
						<Text textAnchor='middle' fill='#faf2e3' className='font-bakbak text-sm' dy={14}>
							{`Total Value Locked`}
						</Text>
					</>
				) : (
					<>
						<Text textAnchor='middle' fill='#faf2e3' className='font-bakbak text-lg' dy={-2}>
							{`$${active && getDisplayBalance(active.tvl)}`}
						</Text>
						<Text textAnchor='middle' fill={active.color} className='font-bakbak text-xs' dy={14}>
							{`${getDisplayBalance(active.balance, active.decimals, 4)} ${active.symbol}`}
						</Text>
					</>
				)}
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

function AnimatedPie<Datum>({ animate, arcs, path, getKey, getColor, onClickDatum }: AnimatedPieProps<Datum>) {
	const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(arcs, {
		from: animate ? fromLeaveTransition : enterUpdateTransition,
		enter: enterUpdateTransition,
		update: enterUpdateTransition,
		leave: animate ? fromLeaveTransition : enterUpdateTransition,
		keys: getKey,
	})
	return transitions((props, arc, { key }) => {
		const [centroidX, centroidY] = path.centroid(arc)
		const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.5

		let index = 0
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
				/>
				{hasSpaceForLabel && (
					<animated.g style={{ opacity: props.opacity }}>
						{_.map(
							_.filter(getKey(arc).split('\n'), line => line.length > 0),
							line => {
								return (
									<>
										<text
											fill='white'
											x={centroidX}
											y={centroidY + index++ * 12}
											dy='.33em'
											fontSize={12}
											fontWeight='bold'
											textAnchor='middle'
											pointerEvents='none'
										>
											{line}
										</text>
										<br />
									</>
								)
							},
						)}
					</animated.g>
				)}
			</g>
		)
	})
}

/*
interface AssetAllocation {
	label: string
	usage: number
	color: string
}
	const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
	const assets: AssetAllocation[] = composition.map(component => ({
		label: `${component.symbol}\n${component.percentage}%`,
		usage: Number(component.percentage),
		color: component.color,
	}))
	const usage = (d: AssetAllocation) => d.usage
	const donutThickness = 50
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
	 */
