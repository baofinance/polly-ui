import Image from 'next/future/image'
import React from 'react'
import { isDesktop } from 'react-device-detect'

import Typography from '../Typography'

interface PageHeaderProps {
	icon?: any
	description?: any
	title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, icon, description }) => {
	return (
		<div className='mx-auto mb-4 mt-6 box-border flex flex-col items-center'>
			{icon && <Image src={icon} alt={title} height={`${isDesktop ? 128 : 64}`} width={`${isDesktop ? 128 : 64}`} />}
			<Typography variant='h1' className='font-bakbak antialiased'>
				{title}
			</Typography>
			{description && <Typography className='flex flex-1 items-center justify-center'>{description}</Typography>}
		</div>
	)
}

export default PageHeader
