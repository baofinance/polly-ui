import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface CardActionsProps {
	children?: ReactNode
	className?: string
}

const CardActions: FC<CardActionsProps> = ({ children, className }) => {
	return <div className={classNames('w-full items-center justify-end gap-4', className)}>{children}</div>
}

export default CardActions
