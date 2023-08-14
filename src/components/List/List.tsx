import classNames from 'classnames'
import React from 'react'
import Typography from '../Typography'

type ListHeaderProps = {
	headers: string[]
	className?: string
}

export const ListHeader: React.FC<ListHeaderProps> = ({ headers, className }: ListHeaderProps) => {
	return (
		<div className={classNames(`flex flex-row px-2 py-3`, className)}>
			{headers.map((header: string) => (
				<Typography
					className='flex w-full flex-col items-center px-4 pb-0 text-center font-bakbak text-base first:items-start last:items-end lg:text-lg'
					key={header}
				>
					{header}
				</Typography>
			))}
		</div>
	)
}
