import { faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { FC, ReactNode } from 'react'

import Typography from '@/components/Typography'
import Button from '../Button'

export interface ModalHeaderProps {
	children?: ReactNode
	header?: string | ReactNode
	subheader?: string | ReactNode
	onClose?(): void
	onBack?(): void
}

const ModalHeader: FC<ModalHeaderProps> = ({ header, subheader, children, onBack, onClose }) => {
	return (
		<>
			<div className='mb-4 flex h-8'>
				<div className='flex flex-col items-center gap-1'>
					<Typography variant='h3' className='font-bakbak'>
						{onBack && <FontAwesomeIcon icon={faArrowLeft} onClick={onBack} size='sm' className='mr-2 cursor-pointer hover:text-pollyGreen' />}
						{header ? header : children}
					</Typography>
					{subheader && <Typography variant='sm'>{subheader}</Typography>}
				</div>
			</div>
			<div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
				{onClose && (
					<Button onClick={onClose} className='m-auto h-auto !px-3 !py-1'>
						<FontAwesomeIcon icon={faClose} width={6} height={6} />
					</Button>
				)}
			</div>
		</>
	)
}

export default ModalHeader
