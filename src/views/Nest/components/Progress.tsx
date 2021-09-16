import React from 'react'
import { ProgressBarProps, ProgressBar, OutsideLabel } from './styles'

export const Progress: React.FC<ProgressBarProps> = ({
	assetColor,
	width,
	label,
}) => {
	return (
		<>
			<ProgressBar assetColor={assetColor} width={width}>
				{
					width > 20 ? (
						label
					) : (
						<span style={{ opacity: '0' }}>x</span>
					) /* janky, but have to do it to make the bar show */
				}
			</ProgressBar>
			{width <= 20 && <OutsideLabel>{label}</OutsideLabel>}
		</>
	)
}
