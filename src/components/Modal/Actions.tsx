import React, { FC, ReactNode } from 'react'

export interface ModalActionsProps {
	children?: ReactNode
}

const ModalActions: FC<ModalActionsProps> = ({ children }) => {
	return <div className='flex w-full flex-col gap-2'>{children}</div>
}

export default ModalActions
