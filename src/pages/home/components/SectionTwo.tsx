import Typography from '@/components/Typography'
import Image from 'next/future/image'
import React from 'react'

const SectionTwo: React.FC = () => (
	<>
		<div className='m-auto flex flex-col w-[100%] lg:flex-row lg:w-[80%]'>
			<div className='flex flex-col w-[90%] m-auto mb-20 lg:mb-20 lg:w-[30%]'>
				<div className='flex m-auto w-full'>
					<Image src='/images/diversify.svg' alt='Diversify' height={140} width={140} className='inline mx-0 my-10 max-w-full' />
				</div>
			</div>
			<div className='table w-full'>
				<div className='flex m-auto h-full'>
					<div>
						<Typography className='font-hero'>Diversify Your </Typography>
						<Typography className='hero-gradient'>Exposure</Typography>
					</div>
					<Typography className='text-base font-normal'>
						Polly Finance is home to some of the most diverse baskets on Polygon, all managed autonomously. With Polly Nests, you can easily
						get balanced exposure to digital assets on the Polygon Network.
					</Typography>
				</div>
			</div>
		</div>

		<div className='m-auto flex flex-col w-[100%] lg:flex-row lg:w-[80%]'>
			<div className='table w-full'>
				<div className='flex m-auto h-full'>
					<div>
						<Typography className='font-hero'>Earn Passive </Typography>
						<Typography className='hero-gradient'>Yield</Typography>
					</div>
					<Typography className='text-base font-normal'>
						Nests are designed to be truly set-and-forget, maximizing your returns at a fraction of the cost and effort. Nests leverage
						automated strategies utilizing staking, lending, and yield farming- No management or constant monitoring necessary!
					</Typography>
				</div>
			</div>
			<div className='w-[90%] m-auto mb-20 lg:mb-20 lg:w-[30%]'>
				<div className='flex m-auto w-full'>
					<Image src='/images/passive-yield.svg' alt='Passive Yield' height={140} width={140} className='inline mx-0 my-10 max-w-full' />
				</div>
			</div>
		</div>

		<div className='m-auto flex flex-col w-[100%] lg:flex-row lg:w-[80%]'>
			<div className='w-[90%] m-auto mb-20 lg:mb-20 lg:w-[30%]'>
				<div className='flex m-auto w-full'>
					<Image src='/images/dao.svg' alt='DAO' height={140} width={140} className='inline mx-0 my-10 max-w-full' />
				</div>
			</div>
			<div className='table w-full'>
				<div className='flex m-auto h-full'>
					<Typography className='font-hero'>Meet </Typography>
					<Typography className='hero-gradient'>Polly DAO</Typography>
				</div>
				<Typography className='text-base font-normal'>
					Polly is governed, maintained, and upgraded by its token holders. Polly DAO empowers users to curate their own Nests and develop
					complex strategies of their own.
				</Typography>
			</div>
		</div>
	</>
)

export default SectionTwo
