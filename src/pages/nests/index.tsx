import Button from '@/components/Button'
import { Icon } from '@/components/Icon'
import Typography from '@/components/Typography'
import useNests from '@/hooks/nests/useNests'
import { NextSeo } from 'next-seo'
import React from 'react'
import NestList from './components/NestList'

const Nests: React.FC = () => {
	const nests = useNests()

	return (
		<>
			<NextSeo title={`Nests`} description={`Get diversified exposure to crypto assets with Bao Nests!`} />
			<div className='grid gap-10 lg:grid-cols-5 lg:gap-24'>
				<div className='w-full lg:col-span-2'>
					<Typography variant='hero' className='stroke'>
						Nests
					</Typography>
					<div className='mt-4 flex gap-2'>
						<Icon icon='lightbulb' className='m-0 h-6 w-6 flex-none' />
						<Typography className='m-0 pr-1 text-base font-light tracking-tight lg:mb-4'>
							Curated collections of tokens, powered by automated strategies, provide optimal yield opportunities and exposure to various
							sectors.
						</Typography>
					</div>
					<div className='hidden lg:block'>
						<a href='https://info.bao.finance/docs/franchises/bao-nests-soft-synths' target='_blank' rel='noopener noreferrer'>
							<Button className='!rounded-full border border-transparent-200 hover:bg-pollyGreen'>Learn More</Button>
						</a>
					</div>
				</div>
				<div className='lg:col-span-3'>
					<NestList nests={nests} />
				</div>
			</div>
		</>
	)
}

export default Nests
