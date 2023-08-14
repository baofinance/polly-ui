// FIXME: BROKEN this won't be used anymore as the /farms/ page is getting trashed!
import Config from '@/bao/lib/config'
import { PageLoader } from '@/components/Loader'
import Typography from '@/components/Typography'
import { Farm, PoolType } from '@/contexts/Farms/types'
import useBao from '@/hooks/base/useBao'
import useContract from '@/hooks/base/useContract'
import useAllFarmTVL from '@/hooks/farms/useAllFarmTVL'
import useFarms from '@/hooks/farms/useFarms'
import type { Masterchef } from '@/typechain/index'
import GraphUtil from '@/utils/graph'
import Multicall from '@/utils/multicall'
import { fromDecimal, getDisplayBalance, truncateNumber } from '@/utils/numberFormat'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import Image from 'next/future/image'
import React, { useEffect, useState } from 'react'
import FarmModal from './Modals'

const FarmList: React.FC = () => {
	const bao = useBao()
	const farms = useFarms()
	const farmsTVL = useAllFarmTVL()
	const { account, library, chainId } = useWeb3React()

	const [pools, setPools] = useState<any | undefined>({
		[PoolType.ACTIVE]: [],
		[PoolType.ARCHIVED]: [],
	})

	const [archived, showArchived] = useState(false)

	const MasterchefContract = useContract<Masterchef>('masterChef')

	const { data: pollyPrice } = useQuery(
		['GraphUtil.getPriceFromPair', { WETH: true, BAO: true }],
		async () => {
			const wethPrice = await GraphUtil.getPrice(Config.addressMap.WETH)
			const _pollyPrice = await GraphUtil.getPriceFromPair(wethPrice, Config.contracts.polly[chainId].address)
			return fromDecimal(_pollyPrice)
		},
		{
			enabled: !!chainId,
			refetchOnReconnect: true,
			refetchInterval: 1000 * 60 * 5,
			placeholderData: BigNumber.from(0),
		},
	)

	useEffect(() => {
		if (!bao || !account || !MasterchefContract || !farmsTVL) return

		const _pools: any = {
			[PoolType.ACTIVE]: [],
			[PoolType.ARCHIVED]: [],
		}

		bao.multicall
			.call(
				Multicall.createCallContext([
					{
						ref: 'masterChef',
						contract: MasterchefContract,
						calls: farms.map((farm, i) => {
							return {
								ref: (farms.length + i).toString(),
								method: 'userInfo',
								params: [farm.pid, account],
							}
						}) as any,
					},
				]),
			)
			.then(async (_result: any) => {
				const result = await Multicall.parseCallResults(_result)

				for (let i = 0; i < farms.length; i++) {
					const farm = farms[i]
					const tvlInfo = farmsTVL.tvls.find((fTVL: any) => fTVL.lpAddress.toLowerCase() === farm.lpAddress.toLowerCase())
					const farmWithStakedValue = {
						...farm,
						poolType: farm.poolType || PoolType.ACTIVE,
						tvl: tvlInfo.tvl,
						stakedUSD: result.Masterchef[i].values[0].div(tvlInfo.lpStaked).mul(tvlInfo.tvl),
					}

					_pools[farmWithStakedValue.poolType].push(farmWithStakedValue)
				}

				setPools(_pools)
			})
	}, [bao, library, MasterchefContract, farms, farmsTVL, pollyPrice, account, setPools])

	return (
		<>
			<div className='flex w-full flex-row'>
				<div className='flex w-full flex-col'>
					<FarmListHeader headers={['Pool', 'LP Staked', 'TVL']} />
					{!archived ? (
						<>
							{pools[PoolType.ACTIVE].length ? (
								pools[PoolType.ACTIVE].map((farm: any, i: number) => (
									<React.Fragment key={i}>
										<FarmListItem farm={farm} />
									</React.Fragment>
								))
							) : (
								<PageLoader block />
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
								<PageLoader block />
							)}
						</>
					)}
				</div>
			</div>
		</>
	)
}

type FarmListHeaderProps = {
	headers: string[]
}

const FarmListHeader: React.FC<FarmListHeaderProps> = ({ headers }: FarmListHeaderProps) => {
	return (
		<div className='flex flex-row px-2 py-3'>
			{headers.map((header: string) => (
				<Typography variant='lg' className='flex w-full flex-col px-2 pb-0 text-right font-bold first:text-left' key={header}>
					{header}
				</Typography>
			))}
		</div>
	)
}

export interface FarmWithStakedValue extends Farm {
	apy: BigNumber
	stakedUSD: BigNumber
}

interface FarmListItemProps {
	farm: FarmWithStakedValue
}

const FarmListItem: React.FC<FarmListItemProps> = ({ farm }) => {
	const { account } = useWeb3React()

	const [showFarmModal, setShowFarmModal] = useState(false)

	return (
		<>
			<button className='w-full py-2' onClick={() => setShowFarmModal(true)} disabled={!account}>
				<div className='rounded border border-primary-300 bg-primary-100 p-4 hover:bg-primary-200'>
					<div className='flex w-full flex-row items-center'>
						<div className={`mx-auto my-0 flex basis-1/3 flex-col text-left`}>
							<div className='mx-0 my-auto inline-block h-full items-center'>
								<div className='mr-2 inline-block'>
									<Image className='z-10 inline-block select-none' src={farm.iconA} alt={farm.lpToken} width={32} height={32} />
									<Image className='z-20 -ml-2 inline-block select-none' src={farm.iconB} alt={farm.lpToken} width={32} height={32} />
								</div>
								<span className='inline-block text-left align-middle'>
									<Typography variant='base' className='font-bold'>
										{farm.name}
									</Typography>
									<Typography variant='sm' className={`font-light text-text-200`}>
										{farm.type === 'SushiSwap LP' ? (
											<Image src='/images/tokens/SUSHI.png' height={12} width={12} alt='SushiSwap' className='mr-1 inline' />
										) : (
											<Image src='/images/tokens/UNI.png' height={12} width={12} alt='Uniswap' className='mr-1 inline' />
										)}
										{farm.type}
									</Typography>
								</span>
							</div>
						</div>
						<div className='mx-auto my-0 flex basis-1/3 flex-col text-right'>
							<Typography variant='base' className='ml-2 inline-block font-medium'>
								{account
									? `$${window.screen.width > 1200 ? getDisplayBalance(farm.stakedUSD, 0) : truncateNumber(farm.stakedUSD, 0)}`
									: '-'}
							</Typography>
						</div>
						<div className='mx-auto my-0 flex basis-1/3 flex-col text-right'>
							<Typography variant='base' className='ml-2 inline-block font-medium'>
								-
							</Typography>
						</div>
					</div>
				</div>
			</button>
			<FarmModal farm={farm} show={showFarmModal} onHide={() => setShowFarmModal(false)} />
		</>
	)
}

export default FarmList
