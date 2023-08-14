import Image from 'next/future/image'
import React from 'react'

const SecuritySection: React.FC = () => (
	<>
		<a href='https://www.immunefi.com/bounty/baofinance' target='_blank' rel='noreferrer'>
			<Image src='/images/immunefi.png' alt='Immunefi' height={250} width={893} />
		</a>
	</>
)

export default SecuritySection
