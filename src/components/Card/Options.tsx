import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface CardOptionsProps {
	children?: ReactNode
	className?: string
}

const CardOptions: FC<CardOptionsProps> = ({ children, className }) => {
	return <div className={classNames('mb-4 flex items-center justify-end', className)}>{children}</div>
}

export default CardOptions
