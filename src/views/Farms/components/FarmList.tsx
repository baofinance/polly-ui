import { useWeb3React } from '@web3-react/core'
import { getMasterChefContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { IconContainer, StyledIcon } from 'components/Icon'
import { ListHeader, ListItemHeader, ListItem } from 'components/List'
import { SpinnerLoader } from 'components/Loader'
import Spacer from 'components/Spacer'
import { Farm } from 'contexts/Farms'
import { PoolType } from 'contexts/Farms/types'
import useBao from 'hooks/base/useBao'
import useAllFarmTVL from 'hooks/farms/useAllFarmTVL'
import useFarms from 'hooks/farms/useFarms'
import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import Multicall from 'utils/multicall'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { FarmModal } from './Modals'

export interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

export const FarmList: React.FC = () => {
	const bao = useBao()
	const farms = useFarms()
	const farmsTVL = useAllFarmTVL(bao, bao && bao.multicall)
	const { account } = useWeb3React()

	const [pollyPrice, setPollyPrice] = useState<BigNumber | undefined>()
	const [pools, setPools] = useState<any | undefined>({
		[PoolType.ACTIVE]: [],
		[PoolType.ARCHIVED]: [],
	})

	const tempAddress = '0x0000000000000000000000000000000000000000'

	const userAddress = account ? account : tempAddress

	const BLOCKS_PER_YEAR = new BigNumber(2336000)

	const [archived, showArchived] = useState(false)
	const [staked, showStaked] = useState(false)

	useEffect(() => {
		fetch(
			'https://api.coingecko.com/api/v3/simple/price?ids=polly&vs_currencies=usd',
		).then(async (res) => {
			setPollyPrice(new BigNumber((await res.json())['polly'].usd))
		})

		const _pools: any = {
			[PoolType.ACTIVE]: [],
			[PoolType.ARCHIVED]: [],
		}
		if (!(farmsTVL && bao)) return setPools(_pools)

		bao.multicall
			.call(
				Multicall.createCallContext([
					{
						ref: 'masterChef',
						contract: getMasterChefContract(bao),
						calls: farms
							.map((farm, i) => {
								return {
									ref: i.toString(),
									method: 'getNewRewardPerBlock',
									params: [farm.pid + 1],
								}
							})
							.concat(
								farms.map((farm, i) => {
									return {
										ref: (farms.length + i).toString(),
										method: 'userInfo',
										params: [farm.pid, userAddress],
									}
								}) as any,
							),
					},
				]),
			)
			.then(async (_result: any) => {
				const result = await Multicall.parseCallResults(_result)

				for (let i = 0; i < farms.length; i++) {
					const farm = farms[i]
					const tvlInfo = farmsTVL.tvls.find(
						(fTVL: any) =>
							fTVL.lpAddress.toLowerCase() ===
							farm.lpTokenAddress.toLowerCase(),
					)
					const farmWithStakedValue = {
						...farm,
						poolType: farm.poolType || PoolType.ACTIVE,
						tvl: tvlInfo.tvl,
						stakedUSD: decimate(
							result.masterChef[farms.length + i].values[0].hex,
						)
							.div(decimate(tvlInfo.lpStaked))
							.times(tvlInfo.tvl),
						apy:
							pollyPrice && farmsTVL
								? pollyPrice
										.times(BLOCKS_PER_YEAR)
										.times(
											new BigNumber(result.masterChef[i].values[0].hex).div(
												10 ** 18,
											),
										)
										.div(tvlInfo.tvl)
								: null,
					}

					_pools[farmWithStakedValue.poolType].push(farmWithStakedValue)
				}
				setPools(_pools)
			})
	}, [farmsTVL, bao])

	return (
		<>
			<Spacer size="md" />
			<Container style={{ textAlign: 'right', fontSize: '0.875rem' }}>
				{/* <Form.Check
					inline
					type="switch"
					id="show-archived"
					label="Show Staked Only"
					checked={staked}
					onChange={(e) => showStaked(e.currentTarget.checked)}
				/> */}
				<Form.Check
					inline
					type="switch"
					id="show-archived"
					label="Show Archived Farms"
					checked={archived}
					onChange={(e) => showArchived(e.currentTarget.checked)}
				/>
			</Container>
			<Row>
				<Col>
					{!account ? (
						<ListHeader headers={['Pool', 'APR', 'TVL']} />
					) : (
						<ListHeader headers={['Pool', 'APR', 'LP Staked', 'TVL']} />
					)}
					{!archived ? (
						<>
							{pools[PoolType.ACTIVE].length ? (
								pools[PoolType.ACTIVE].map((farm: any, i: number) => (
									<React.Fragment key={i}>
										<FarmListItem farm={farm} />
									</React.Fragment>
								))
							) : (
								<SpinnerLoader block />
							)}
						</>
					) : (
						<>
							{pools[PoolType.ARCHIVED].length ? (
								pools[PoolType.ARCHIVED].map((farm: any, i: number) => (
									<React.Fragment key={i}>
										<FarmListItem farm={farm} />
									</React.Fragment>
								))
							) : (
								<SpinnerLoader block />
							)}
						</>
					)}
				</Col>
			</Row>
		</>
	)
}

interface FarmListItemProps {
	farm: FarmWithStakedValue
}

const FarmListItem: React.FC<FarmListItemProps> = ({ farm }) => {
	const { account } = useWeb3React()

	const [showFarmModal, setShowFarmModal] = useState(false)

	return (
		<>
			<ListItem
				style={{ padding: '12px' }}
				onClick={() => setShowFarmModal(true)}
				disabled={!account}
			>
				<ListItemHeader>
					<Row lg={7} style={{ width: '100%' }}>
						<Col style={{ fontWeight: 700 }}>
							<IconContainer>
								<StyledIcon src={farm.iconA} />
								<StyledIcon src={farm.iconB} />
							</IconContainer>
							{farm.name}
						</Col>
						<Col>
							{farm.apy ? (
								farm.apy.gt(0) ? (
									`${farm.apy
										.times(new BigNumber(100))
										.toNumber()
										.toLocaleString('en-US')
										.slice(0, -1)}%`
								) : (
									'N/A'
								)
							) : (
								<SpinnerLoader />
							)}
						</Col>
						{account && <Col>{`$${getDisplayBalance(farm.stakedUSD, 0)}`}</Col>}
						<Col>{`$${getDisplayBalance(farm.tvl, 0)}`}</Col>
					</Row>
				</ListItemHeader>
			</ListItem>
			<FarmModal
				farm={farm}
				show={showFarmModal}
				onHide={() => setShowFarmModal(false)}
			/>
		</>
	)
}
