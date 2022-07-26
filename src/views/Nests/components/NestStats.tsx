import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber } from 'bignumber.js'
import { StatBadge } from 'components/Badge/Badge'
import React from 'react'
import { Col } from 'react-bootstrap'
import { ActiveSupportedNest } from '../../../bao/lib/types'
import { SpinnerLoader } from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { StatCard, StatsRow } from '../../../components/Stats'
import Tooltipped from '../../../components/Tooltipped'
import useNav from '../../../hooks/baskets/useNav'
import { getDisplayBalance } from '../../../utils/numberFormat'

type NestStatsProps = {
	nest: ActiveSupportedNest
	composition: any
	rates: any
	info: any
	pairPrice: BigNumber | undefined
}

const NestStats: React.FC<NestStatsProps> = ({
	nest,
	composition,
	rates,
	info,
	pairPrice,
}) => {
	const nav = useNav(composition, info && info.totalSupply)

	return (
		<StatsRow lg={4} sm={2}>
			<Col>
				<StatCard>
					<span>
						<FontAwesomeIcon icon="hand-holding-usd" />
						<br />
						Market Cap
					</span>
					<Spacer size={'sm'} />
					<StatBadge bg="secondary">
						{rates && info ? (
							`$${getDisplayBalance(rates.usdPerIndex)}`
						) : (
							<SpinnerLoader />
						)}
					</StatBadge>
				</StatCard>
			</Col>
			<Col>
				<StatCard>
					<span>
						<FontAwesomeIcon icon="coins" />
						<br />
						Supply
					</span>
					<Spacer size={'sm'} />
					<StatBadge bg="secondary">
						{(info &&
							`${getDisplayBalance(info.totalSupply)} ${nest.symbol}`) || (
							<SpinnerLoader />
						)}
					</StatBadge>
				</StatCard>
			</Col>
			<Col>
				<StatCard>
					<span>
						<FontAwesomeIcon icon="money-bill-wave" />
						<br />
						NAV{' '}
						<Tooltipped
							content={`The Net Asset Value is the value of one ${
								nest && nest.symbol
							} token if you were to own each underlying asset with identical weighting to the nest.`}
						/>
					</span>
					<Spacer size={'sm'} />
					<StatBadge bg="secondary">
						{nav ? `$${getDisplayBalance(nav, 0)}` : <SpinnerLoader />}
					</StatBadge>
				</StatCard>
			</Col>
			<Col>
				<StatCard>
					<span>
						<FontAwesomeIcon icon="angle-double-up" />
						<FontAwesomeIcon icon="angle-double-down" />
						<br />
						Premium{' '}
						<Tooltipped
							content={`Percent difference between the price on exchange 
							and the price to mint`}
						/>
					</span>
					<Spacer size={'sm'} />
					<StatBadge bg="secondary">
						{pairPrice && rates ? (
							// `${getDisplayBalance(
							// 	pairPrice
							// 		.minus(decimate(rates.usd))
							// 		.abs()
							// 		.div(decimate(rates.usd))
							// 		.times(100),
							// 	0,
							// )}%`
							'-'
						) : (
							<SpinnerLoader />
						)}
					</StatBadge>
				</StatCard>
			</Col>
		</StatsRow>
	)
}

export default NestStats
