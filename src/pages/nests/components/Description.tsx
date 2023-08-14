import React from 'react'

import Config from '@/bao/lib/config'

import NDEFI from './explanations/nDEFI'
import NINFR from './explanations/nINFR'
import NPOLY from './explanations/nPOLY'
import NSTBL from './explanations/nSTBL'

interface DescriptionProps {
	nestAddress: string
}

const Description: React.FC<DescriptionProps> = ({ nestAddress = '' }) => {
	return (
		<>
			<div className='glassmorphic-card mt-4 !rounded-3xl px-4 py-4 lg:p-8'>
				{nestAddress.toLowerCase() === Config.addressMap.nDEFI.toLowerCase() && <NDEFI />}
				{nestAddress.toLowerCase() === Config.addressMap.nINFR.toLowerCase() && <NINFR />}
				{nestAddress.toLowerCase() === Config.addressMap.nPOLY.toLowerCase() && <NPOLY />}
				{nestAddress.toLowerCase() === Config.addressMap.nSTBL.toLowerCase() && <NSTBL />}
			</div>
		</>
	)
}

export default Description
