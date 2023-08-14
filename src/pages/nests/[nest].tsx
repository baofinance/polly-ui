import Badge from '@/components/Badge'
import Tooltipped from '@/components/Tooltipped'
import Typography from '@/components/Typography'
import useComposition from '@/hooks/nests/useComposition'
import useNav from '@/hooks/nests/useNav'
import useNestInfo from '@/hooks/nests/useNestInfo'
import useNestRates from '@/hooks/nests/useNestRate'
import useNests from '@/hooks/nests/useNests'
import usePairPrice from '@/hooks/nests/usePairPrice'
import { decimate, getDisplayBalance } from '@/utils/numberFormat'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import Image from 'next/future/image'
import Link from 'next/link'
import { useMemo } from 'react'
import Loader from '../../components/Loader'
import Composition from './components/Composition'
import Description from './components/Description'
import NestButtons from './components/NestButtons'
//import { formatUnits, parseUnits } from 'ethers/lib/utils'

export async function getStaticPaths() {
	return {
		paths: [{ params: { nest: 'nDEFI' } }, { params: { nest: 'nSTBL' } }, { params: { nest: 'nINFR' } }, { params: { nest: 'nPOLY' } }],
		fallback: false, // can also be true or 'blocking'
	}
}

// `getStaticPaths` requires using `getStaticProps`
export async function getStaticProps({ params }: { params: any }) {
	const { nest } = params

	return {
		props: {
			nestId: nest,
		},
	}
}

const Nest: NextPage<{
	nestId: string
}> = ({ nestId }) => {
	const nests = useNests()

	const nest = useMemo(() => {
		if (!nests) return
		return nests.find(nest => nest.symbol === nestId)
	}, [nestId, nests])

	const composition = useComposition(nest)
	const rates = useNestRates(nest)
	const info = useNestInfo(nest)
	const pairPrice = usePairPrice(nest)
	const nav = useNav(composition, info ? info.totalSupply : BigNumber.from(1))

	let premium = null
	let premiumColor = 'white'
	if (nav && pairPrice && rates) {
		premium =
			((parseFloat(nav.toString()) - parseFloat(formatUnits(rates.usd.toString()))) / parseFloat(formatUnits(rates.usd.toString()))) * 100
		premiumColor = premium < 0 ? 'red' : 'green'
	}

	let marketCap
	if (rates && info) {
		marketCap = decimate(rates.usd.mul(info.totalSupply))
	}

	return nest ? (
		<>
			<NextSeo title={`${nestId} Nest`} description={`Mint or Redeem ${nestId}`} />
			<div className='mb-4 flex w-full flex-row items-center gap-4 rounded border-0 align-middle'>
				<Link href='/nests'>
					<div className='glassmorphic-card flex h-fit w-fit flex-row items-center p-4 align-middle duration-200 hover:bg-pollyGreen lg:p-7'>
						<FontAwesomeIcon icon={faArrowLeft} size='lg' />
					</div>
				</Link>
				{/*Desktop*/}
				<div className='glassmorphic-card hidden w-full !px-8 !py-4 lg:grid lg:grid-cols-4'>
					<div className='col-span-1 mx-auto my-0 flex w-full flex-row items-center text-start align-middle'>
						<Image
							src={`/images/tokens/${nestId}.png`}
							alt={`${nest.symbol}`}
							width={40}
							height={40}
							className='inline-block select-none'
						/>
						<span className='inline-block text-left align-middle'>
							<Typography variant='h3' className='ml-2 inline-block items-center align-middle font-bakbak leading-5'>
								{nest.symbol}
							</Typography>
							<Badge className='ml-2 inline-block font-bakbak text-base'>${getDisplayBalance(rates ? rates.usd : BigNumber.from(0))}</Badge>
						</span>
					</div>
					<div className='col-span-3 mx-auto my-0 flex w-full flex-row items-center justify-end align-middle'>
						<div className='grid grid-cols-4 gap-16'>
							<div className='col-span-1 break-words text-center'>
								<Typography variant='base' className='font-bakbak text-pollyGreen'>
									Market Cap
								</Typography>
								<Typography variant='xl' className='inline-block font-bakbak leading-5'>
									{marketCap ? `$${getDisplayBalance(marketCap)}` : <Loader />}
								</Typography>
							</div>
							<div className='col-span-1 break-words text-center'>
								<Typography variant='base' className='font-bakbak text-pollyGreen'>
									Supply
								</Typography>
								<Typography variant='xl' className='inline-block font-bakbak leading-5'>
									{info ? `${getDisplayBalance(info.totalSupply)}` : <Loader />}
								</Typography>
							</div>
							<div className='col-span-1 break-words text-center'>
								<Typography variant='base' className='font-bakbak text-pollyGreen'>
									NAV{' '}
									<Tooltipped
										content={`The Net Asset Value is the value of one ${
											nest && nest.symbol
										} token if you were to own each underlying asset with identical weighting to the nest.`}
										placement='top'
									/>
								</Typography>
								<Typography variant='xl' className='inline-block font-bakbak leading-5'>
									{nav ? `$${parseFloat(nav.toString()).toFixed(2)}` : <Loader />}
								</Typography>
							</div>
							<div className='col-span-1 break-words text-center'>
								<Typography variant='base' className='font-bakbak text-pollyGreen'>
									Premium{' '}
									<Tooltipped
										content={`Percent difference between the price on exchange 
							and the price to mint.`}
									/>
								</Typography>
								<Typography variant='xl' className='inline-block font-bakbak leading-5'>
									{premium ? `${premium.toFixed(4)}%` : <Loader />}
								</Typography>
							</div>
						</div>
					</div>
				</div>
				{/*Mobile*/}
				<div className='w-full lg:hidden'>
					<div className='my-0 flex w-full flex-row items-center justify-end align-middle'>
						<Image src={`/images/tokens/${nest.icon}`} alt={`${nest.symbol}`} width={40} height={40} className='inline-block select-none' />
						<span className='inline-block text-left align-middle'>
							<Typography variant='h3' className='ml-2 inline-block items-center align-middle font-bakbak leading-5'>
								{nest.symbol}
							</Typography>
							<Badge className='ml-2 inline-block font-bakbak text-base'>${getDisplayBalance(rates ? rates.usd : BigNumber.from(0))}</Badge>
						</span>
					</div>
				</div>
			</div>
			<div className='glassmorphic-card grid grid-cols-3 !rounded-3xl lg:hidden'>
				<div className='col-span-1 break-words px-2 py-2 text-center'>
					<Typography variant='sm' className='font-bakbak text-pollyGreen'>
						Market Cap
					</Typography>
					<Typography variant='base' className='inline-block font-bakbak leading-5'>
						{marketCap ? `$${getDisplayBalance(marketCap)}` : <Loader />}
					</Typography>
				</div>
				<div className='col-span-1 break-words px-2 py-2 text-center'>
					<Typography variant='sm' className='font-bakbak text-pollyGreen'>
						NAV{' '}
						<Tooltipped
							content={`The Net Asset Value is the value of one ${
								nest && nest.symbol
							} token if you were to own each underlying asset with identical weighting to the nest.`}
							placement='top'
						/>
					</Typography>
					<Typography variant='base' className='inline-block font-bakbak leading-5'>
						{nav ? `$${parseFloat(nav.toString()).toFixed(2)}` : <Loader />}
					</Typography>
				</div>
				<div className='col-span-1 break-words px-2 py-2 text-center'>
					<Typography variant='sm' className='font-bakbak text-pollyGreen'>
						Premium{' '}
						<Tooltipped
							content={`Percent difference between the price on exchange 
							and the price to mint.`}
						/>
					</Typography>
					<Typography variant='base' className='inline-block font-bakbak leading-5'>
						{premium ? `${premium.toFixed(4)}%` : <Loader />}
					</Typography>
				</div>
			</div>

			<Composition composition={composition} rates={rates} info={info} nestId={nestId} />
			<NestButtons nest={nest} swapLink={nest.swap} />
			<Description nestAddress={nest.address} />
		</>
	) : (
		<Loader />
	)
}

export default Nest
