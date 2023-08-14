import { ListHeader } from '@/components/List'
import Loader from '@/components/Loader'
import Tooltipped from '@/components/Tooltipped'
import Typography from '@/components/Typography'
import useNestRates from '@/hooks/nests/useNestRate'
import useComposition from '@/hooks/nests/useComposition'
import { getDisplayBalance } from '@/utils/numberFormat'
import Image from 'next/future/image'
import Link from 'next/link'
import React from 'react'

import { isDesktop } from 'react-device-detect'
import { ActiveSupportedNest } from '../../../bao/lib/types'

const NestList: React.FC<NestListProps> = ({ nests }) => {
	return (
		<>
			<ListHeader headers={isDesktop ? ['Nest Name', 'Underlying Assets', 'Cost to Mint'] : ['Name', 'Assets', 'Cost']} />
			<div className='flex flex-col gap-4'>{nests && nests.map(nest => <NestListItem nest={nest} key={nest.nid} />)}</div>
		</>
	)
}

const NestListItem: React.FC<NestListItemProps> = ({ nest }) => {
	const composition = useComposition(nest)
	const rates = useNestRates(nest)

	return (
		<Link href={`/nests/${nest.symbol}`} key={nest.nid}>
			<button className='bg-transparent-100 w-full px-4 py-2 duration-300 hover:border-pollyPurple hover:bg-pollyPurple hover:bg-opacity-20 border rounded-full border-transparent-200'>
				<div className='flex w-full flex-row'>
					<div className='flex w-full'>
						<div className='my-auto'>
							<Image src={`/images/tokens/${nest.symbol}.png`} alt={nest.symbol} className={`inline-block`} height={32} width={32} />
							<span className='inline-block text-left align-middle'>
								<Typography variant='lg' className='ml-2 font-bakbak'>
									{nest.symbol}
								</Typography>
								<Typography variant='sm' className='ml-2 hidden text-pollyWhite lg:block'>
									{nest.desc}
								</Typography>
							</span>
						</div>
					</div>

					<div className='mx-auto my-0 flex w-full items-center justify-center'>
						{composition ? (
							composition.map((component: any) => {
								return (
									<Tooltipped content={component.symbol} key={component.symbol} placement='bottom'>
										<span className={`-ml-2 inline-block select-none duration-200 first:ml-0`}>
											<Image src={`/images/tokens/${component.symbol}.png`} alt={component.symbol} height={32} width={32} />
										</span>
									</Tooltipped>
								)
							})
						) : (
							<Loader />
						)}
					</div>

					<div className='mx-auto my-0 flex w-full flex-col items-end justify-center text-right'>
						<span className='inline-block'>
							{rates ? (
								<>
									<Typography className='m-0 font-bakbak text-lg leading-5'>${getDisplayBalance(rates.usd)}</Typography>
								</>
							) : (
								<Loader />
							)}
						</span>
					</div>
				</div>
			</button>
		</Link>
	)
}

type NestListProps = {
	nests: ActiveSupportedNest[]
}

type NestListItemProps = {
	nest: ActiveSupportedNest
}

export default NestList
