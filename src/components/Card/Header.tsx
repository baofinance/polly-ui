import React, { FC, ReactNode } from 'react'

import Typography from '@/components/Typography'
import classNames from 'classnames'

export interface CardHeaderProps {
	children?: any
	header?: string | ReactNode
	subheader?: string
	className?: string
}

const CardHeader: FC<CardHeaderProps> = ({ header, subheader, children, className }) => {
	return (
		<div className={classNames('flex justify-between', className)}>
			<div className='mb-2 flex flex-col items-center justify-center gap-1'>
				<Typography className='flex gap-3 font-bakbak'>
					{header}
					{children}
				</Typography>
				{subheader && <Typography variant='sm'>{subheader}</Typography>}
			</div>
		</div>
	)
}

export default CardHeader
