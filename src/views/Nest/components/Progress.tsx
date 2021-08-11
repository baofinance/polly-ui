import React from 'react'
import styled from 'styled-components'

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

const ProgressBar = styled.div.attrs((props: ProgressBarProps) => ({}))`
	background-color: ${(props: ProgressBarProps) => props.assetColor};
	border-radius: 5px;
	width: ${(props: ProgressBarProps) => props.width}%;
	height: 100%;
	display: inline-block;
	float: left;
`

const OutsideLabel = styled.span`
	float: left;
	margin-left: 10px;
`

interface ProgressBarProps {
	assetColor: string
	width: number
	label?: string
}
