import React, { useState } from 'react'

import Button from '@/components/Button'

import { ActiveSupportedNest } from '../../../bao/lib/types'
import NestModal from './Modals/NestModal'

type ModalOperation = 'MINT' | 'REDEEM'

type NestButtonsProps = {
	nest: ActiveSupportedNest
	swapLink: string
}

const NestButtons: React.FC<NestButtonsProps> = ({ nest, swapLink }) => {
	const [showNestModal, setShowNestModal] = useState(false)
	const [modalOperation, setModalOperation] = useState<ModalOperation>('MINT')

	const handleClick = (op: ModalOperation) => {
		setModalOperation(op)
		setShowNestModal(true)
	}

	return (
		<>
			<NestModal nest={nest} operation={modalOperation} show={showNestModal} hideModal={() => setShowNestModal(false)} />
			<div className='mt-4 grid grid-cols-3 gap-4'>
				<div>
					<Button fullWidth onClick={() => handleClick('MINT')} className='glassmorphic-card !justify-center !text-center'>
						Mint
					</Button>
				</div>
				<div>
					<Button fullWidth onClick={() => handleClick('REDEEM')} className='glassmorphic-card !justify-center !text-center'>
						Redeem
					</Button>
				</div>
				<div>
					<a href={`${swapLink}`} target='_blank' rel='noreferrer'>
						<Button fullWidth text='Swap' disabled={nest.name === 'bETH'} className='glassmorphic-card !justify-center !text-center' />
					</a>
				</div>
			</div>
		</>
	)
}

export default NestButtons
