import {
	getMasterChefContract,
	getPollyAddress,
	getPollySupply,
	getReferrals,
} from 'bao/utils'
import BigNumber from 'bignumber.js'
import Card from 'components/Card'
import CardContent from 'components/CardContent'
import Label from 'components/Label'
import PollyIcon from 'components/PollyIcon'
import Spacer from 'components/Spacer'
import Value from 'components/Value'
import useAllEarnings from 'hooks/useAllEarnings'
import useAllStakedValue from 'hooks/useAllStakedValue'
import useBao from 'hooks/useBao'
import useFarms from 'hooks/useFarms'
import useTokenBalance from 'hooks/useTokenBalance'
import React, { Fragment, useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { getBalanceNumber } from 'utils/formatBalance'

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
				decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
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
	const [totalReferrals, setTotalReferrals] = useState<string>()
	const [refLink, setRefLink] = useState<string>()
	const bao = useBao()
	const pollyBalance = useTokenBalance(getPollyAddress(bao))
	const masterChefContract = getMasterChefContract(bao)
	const { account, ethereum }: { account: any; ethereum: any } = useWallet()

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
		async function fetchTotalReferrals() {
			const referrals = await getReferrals(masterChefContract, account)
			setTotalReferrals(referrals)
		}
		if (bao) {
			fetchTotalReferrals()
		}
	}, [bao, setTotalReferrals])

	useEffect(() => {
		async function fetchRefLink() {
			const usrReflink = 'www.pollyfinance.com?ref=' + account
			setRefLink(usrReflink)
		}
		if (bao) {
			fetchRefLink()
		}
	}, [bao, setRefLink])

	return (
		<Fragment>
			<StyledWrapper>
				<Card>
					<CardContent>
						<StyledBalances>
							<StyledBalance>
								<PollyIcon />
								<Spacer />
								<div style={{ flex: 1 }}>
									<Label text="Your POLLY Balance" />
									<Value
										value={account ? getBalanceNumber(pollyBalance) : 'Locked'}
									/>
								</div>
							</StyledBalance>
						</StyledBalances>
					</CardContent>
					<Footnote>
						Pending harvest
						<FootnoteValue>
							<PendingRewards /> POLLY
						</FootnoteValue>
					</Footnote>
				</Card>
				<Spacer />

				<Card>
					<CardContent>
						<Label text="Total POLLY Supply" />
						<Value
							value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
						/>
					</CardContent>
					<Footnote>
						New rewards per block
						<FootnoteValue>5 POLLY</FootnoteValue>
					</Footnote>
				</Card>
			</StyledWrapper>
			<Spacer />
		</Fragment>
	)
}

const Footnote = styled.div`
	font-size: 14px;
	padding: 8px 20px;
	color: ${(props) => props.theme.color.text[100]};
	border-top: solid 1px #161522;
`

const FootnoteValue = styled.div`
	font-family: 'Poppins', sans-serif;
	float: right;
`

const StyledWrapper = styled.div`
	align-items: center;
	display: flex;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: stretch;
	}
`

const StyledBalances = styled.div`
	display: flex;
`

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
`

export default Balances
