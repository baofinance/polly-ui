import React from 'react'
import pollyIcon from 'assets/img/logo.svg'

interface PollyIconProps {
	size?: number
	v1?: boolean
	v2?: boolean
	v3?: boolean
}

const PollyIcon: React.FC<PollyIconProps> = ({ size = 36, v1, v2, v3 }) => (
	<span
		role="img"
		style={{
			fontSize: size,
			filter: v1 ? 'saturate(0.5)' : undefined,
		}}
	>
		<img src={pollyIcon} width={50} height={50} alt="" />
	</span>
)

export default PollyIcon
