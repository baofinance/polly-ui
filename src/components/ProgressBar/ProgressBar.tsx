import React from 'react'

import Typography from '../Typography'

export interface ProgressBarProps {
	assetColor: string
	width: number
	label?: string
}

export const Progress: React.FC<ProgressBarProps> = ({ assetColor, width, label }) => {
	return (
		<>
			<div
				className='float-left inline-block h-full rounded px-4 py-1 font-bakbak'
				style={{ backgroundColor: `${assetColor}`, width: `${width}%` }}
			>
				{width > 20 ? label : <span className='opacity-0'>x</span> /* janky, but have to do it to make the bar show */}
			</div>
			{width <= 20 && (
				<Typography variant='sm' className='font-bakbak'>
					{label}
				</Typography>
			)}
		</>
	)
}
