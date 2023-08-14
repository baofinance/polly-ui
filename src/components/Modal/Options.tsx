import React, { FC, ReactNode } from 'react'

export interface ModalOptionsProps {
	children?: ReactNode
}

const ModalOptions: FC<ModalOptionsProps> = ({ children }) => {
	return <div className='mb-4 flex items-center justify-end'>{children}</div>
}

export default ModalOptions
