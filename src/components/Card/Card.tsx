import React, { FC, ReactNode } from 'react'

import classNames from 'classnames'

import CardActions, { CardActionsProps } from './Actions'
import CardBody, { CardBodyProps } from './Body'
import CardHeader, { CardHeaderProps } from './Header'
import CardOptions, { CardOptionsProps } from './Options'

type CardType<P> = FC<P> & {
	Header: FC<CardHeaderProps>
	Options: FC<CardOptionsProps>
	Body: FC<CardBodyProps>
	Actions: FC<CardActionsProps>
}

interface CardProps {
	children?: ReactNode
	className?: string
}

const Card: CardType<CardProps> = ({ children, className }) => {
	return (
		<div className='flex flex-col justify-center'>
			<div
				className={classNames('relative flex flex-col items-center break-words rounded border bg-clip-border p-3 shadow-2xl', className)}
			>
				{children}
			</div>
		</div>
	)
}

Card.Header = CardHeader
Card.Options = CardOptions
Card.Body = CardBody
Card.Actions = CardActions

export default Card
