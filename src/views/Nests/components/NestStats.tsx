import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber } from 'bignumber.js'
import { StatBadge } from 'components/Badge/Badge'
import useBao from 'hooks/base/useBao'
import React, { useEffect, useMemo, useState } from 'react'
import { Col } from 'react-bootstrap'
import { ActiveSupportedNest } from '../../../bao/lib/types'
import { SpinnerLoader } from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { StatCard, StatsRow } from '../../../components/Stats'
import Tooltipped from '../../../components/Tooltipped'
import useNav from '../../../hooks/baskets/useNav'
import { decimate, getDisplayBalance } from '../../../utils/numberFormat'

type NestStatsProps = {
	nest: ActiveSupportedNest
	composition: any
	rate: BigNumber
	info: any
	pairPrice: BigNumber | undefined
}

const NestStats: React.FC<NestStatsProps> = ({
	nest,
	composition,
	rate,
	info,
	pairPrice,
}) => {
	const bao = useBao()
	const [supply, setSupply] = useState<BigNumber | undefined>()
	const marketCap = useMemo(() => {
		return (
			supply && rate && `$${getDisplayBalance(decimate(supply).times(rate), 0)}`
		)
	}, [supply, rate])

	useEffect(() => {
		if (nest && bao)
			nest.nestContract.methods
				.totalSupply()
				.call()
				.then((_supply: any) => setSupply(new BigNumber(_supply)))
	}, [bao, nest])

	const nav = useNav(composition, supply)

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
					<StatBadge bg="secondary">{marketCap || <SpinnerLoader />}</StatBadge>
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
						{nav ? `$${getDisplayBalance(nav.nav, 0)}` : <SpinnerLoader />}
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
						{(nav &&
							rate &&
							`${getDisplayBalance(
								rate.minus(nav.nav).div(rate).times(100),
								0,
							)}%`) || <SpinnerLoader />}
					</StatBadge>
				</StatCard>
			</Col>
		</StatsRow>
	)
}

export default NestStats
