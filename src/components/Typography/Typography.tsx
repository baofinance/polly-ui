/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import React, { FC, forwardRef } from 'react'

import classNames from 'classnames'

export type TypographyVariant = 'hero' | 'h1' | 'h2' | 'h3' | 'xl' | 'lg' | 'base' | 'p' | 'sm' | 'xs' | 'xxs'

const VARIANTS = {
	hero: 'text-hero leading-[4rem] font-bakbak uppercase',
	h1: 'text-4xl leading-[46px]',
	h2: 'text-3xl tracking-[-0.02em]',
	h3: 'text-2xl leading-7 tracking-[-0.01em]',
	xl: 'text-xl leading-6',
	lg: 'text-lg leading-6',
	base: 'text-base text-medium leading-5',
	p: 'text-base leading-5 my-2 text-medium ',
	sm: 'text-sm leading-5',
	xs: 'text-xs leading-4',
	xxs: 'text-[0.625rem] leading-[1.2]',
}

export interface TypographyProps extends React.AllHTMLAttributes<React.ReactHTML> {
	variant?: TypographyVariant
	component?: keyof React.ReactHTML
	className?: string
	clickable?: boolean
}

const Typography: FC<TypographyProps> = forwardRef(
	(
		{ variant = 'base', component = 'div', className = 'antialiased, text-pollyWhite', children = [], onClick = undefined, ...rest },
		ref,
	) => {
		return React.createElement(
			component,
			{
				className: classNames(
					VARIANTS[variant],
					// @ts-ignore TYPE NEEDS FIXING
					onClick ? 'cursor-pointer select-none ' : '',
					className,
				),
				onClick,
				...rest,
				ref,
			},
			children,
		)
	},
)

export default Typography
