import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { getPollySupply } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SpinnerLoader } from 'components/Loader'
import {
	UserStatsContainer,
	UserStatsWrapper,
	StatWrapper,
	UserStat,
} from 'components/Stats'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useAllEarnings from 'hooks/farms/useAllEarnings'
import useAllStakedValue from 'hooks/farms/useAllStakedValue'
import useFarms from 'hooks/farms/useFarms'
import useLockedEarnings from 'hooks/farms/useLockedEarnings'
import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import CountUp from 'react-countup'
import GraphUtil from 'utils/graph'
import { getDisplayBalance } from 'utils/numberFormat'

const PendingRewards: React.FC = () => {
	const [start, setStart] = useState(0)
	const [end, setEnd] = useState(0)
	const [scale, setScale] = useState(1)

	const allEarnings = useAllEarnings()
	let sumEarning = 0
	for (const earning of allEarnings) {
		sumEarning += new BigNumber(earning)
			.div(new BigNumber(10).pow(18))
			.toNumber()
	}

	const [farms] = useFarms()
	const allStakedValue = useAllStakedValue()

	if (allStakedValue && allStakedValue.length) {
		const sumWeth = farms.reduce(
			(c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
			0,
		)
	}

	useEffect(() => {
		setStart(end)
		setEnd(sumEarning)
	}, [sumEarning])

	return (
		<span
			style={{
				transform: `scale(${scale})`,
				transformOrigin: 'right bottom',
				transition: 'transform 0.5s',
				display: 'inline-block',
			}}
		>
			<CountUp
				start={start}
				end={end}
				decimals={end < 0 ? 4 : end > 1e5 ? 0 : 2}
				duration={1}
				onStart={() => {
					setScale(1.25)
					setTimeout(() => setScale(1), 600)
				}}
				separator=","
			/>
		</span>
	)
}

const Balances: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const bao = useBao()
	const pollyBalance = useTokenBalance(
		bao && bao.getContract('polly').options.address,
	)
	const { account } = useWeb3React()
	const [pollyPrice, setPollyPrice] = useState<BigNumber | undefined>()
	const locks = useLockedEarnings()

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await getPollySupply(bao)
			setTotalSupply(supply)
		}
		if (bao) {
			fetchTotalSupply()
		}
	}, [bao, setTotalSupply])

	useEffect(() => {
		if (!bao) return
		GraphUtil.getPrice(Config.addressMap.WETH).then(async (wethPrice) => {
			const pollyPrice = await GraphUtil.getPriceFromPair(
				wethPrice,
				Config.contracts.polly[Config.networkId].address,
			)
			setPollyPrice(pollyPrice)
		})
	}, [bao, setPollyPrice])

	return (
		<Fragment>
			<Container>
				<Row style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem' }}>
					<UserStatsContainer>
						<UserStatsWrapper>
							<StatWrapper>
								<UserStat>
									<h1>Your POLLY Balance</h1>
									<p>{account ? getDisplayBalance(pollyBalance) : '-'} </p>
								</UserStat>
							</StatWrapper>
							<StatWrapper>
								<UserStat>
									<h1>Your Locked POLLY</h1>
									<p>{account ? getDisplayBalance(locks) : '-'} </p>
								</UserStat>
							</StatWrapper>
							<StatWrapper>
								<UserStat>
									<h1>Pending Harvest</h1>
									<p>{account ? <PendingRewards /> : '-'}</p>
								</UserStat>
							</StatWrapper>
							<StatWrapper>
								<UserStat>
									<h1>Total POLLY Supply</h1>
									{totalSupply ? (
										getDisplayBalance(totalSupply)
									) : (
										<SpinnerLoader />
									)}
								</UserStat>
							</StatWrapper>
							<StatWrapper>
								<UserStat>
									<h1>POLLY Price</h1>
									{pollyPrice ? (
										`$${getDisplayBalance(pollyPrice, 0)}`
									) : (
										<SpinnerLoader />
									)}
								</UserStat>
							</StatWrapper>
						</UserStatsWrapper>
					</UserStatsContainer>
				</Row>
			</Container>
		</Fragment>
	)
}

export default Balances
