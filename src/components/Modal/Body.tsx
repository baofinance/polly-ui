import React, { FC, ReactNode } from 'react'

import classNames from 'classnames'

export interface ModalBodyProps {
	children: ReactNode
	className?: string
}

const ModalBody: FC<ModalBodyProps> = ({ className = '', children }) => {
	return <div className={classNames('relative mb-4 flex-1', className)}>{children}</div>
}

export default ModalBody
