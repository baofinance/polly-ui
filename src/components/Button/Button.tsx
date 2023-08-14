/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import { faExternalLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React, { ReactNode, useMemo } from 'react'
import { PendingTransaction } from '../Loader/Loader'

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg'

const Size = {
	xs: 'rounded-full px-2 h-8',
	sm: 'rounded-full px-4 h-10',
	md: 'rounded-full px-6 h-12',
	lg: 'rounded-full px-8 h-16',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode
	size?: ButtonSize
	fullWidth?: boolean
	pendingTx?: string | boolean
	txHash?: string
	inline?: boolean
	href?: string
	text?: any
	disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className = '', size = 'md', fullWidth = false, pendingTx, txHash, inline, text, href, disabled, ...rest }, ref) => {
		const ButtonChild = useMemo(() => {
			if (href) {
				return (
					<a href={href} target='_blank' rel='noreferrer' className='hover:text-pollyWhite focus:text-pollyWhite'>
						{text}
					</a>
				)
			} else {
				return text
			}
		}, [href, text])

		const isDisabled = useMemo(() => typeof pendingTx === 'string' || pendingTx || disabled === true, [disabled, pendingTx])

		const buttonText = children

		return !pendingTx ? (
			<button
				{...rest}
				ref={ref}
				disabled={isDisabled}
				className={classNames(
					// @ts-ignore TYPE NEEDS FIXING
					Size[size],
					inline ? 'inline-block' : 'flex',
					fullWidth ? 'w-full' : '',
					disabled ? 'cursor-not-allowed opacity-50' : '',
					`relative flex w-fit items-center justify-center overflow-hidden rounded-full border border-pollyWhite border-opacity-20
				bg-pollyWhite bg-opacity-5 px-4 py-2 font-bakbak text-lg text-pollyWhite duration-300 hover:border-pollyGreen hover:bg-pollyGreen hover:bg-opacity-20`,
					className,
				)}
			>
				<>
					{ButtonChild}
					{buttonText}
				</>
			</button>
		) : (
			<a href={`https://polygonscan.io/tx/${txHash}`} target='_blank' aria-label='View Transaction on Etherscan' rel='noreferrer'>
				<button
					{...rest}
					ref={ref}
					disabled={isDisabled}
					className={classNames(
						// @ts-ignore TYPE NEEDS FIXING
						Size[size],
						inline ? 'inline-block' : 'flex',
						fullWidth ? 'w-full' : '',
						disabled ? 'cursor-not-allowed opacity-50' : '',
						`relative flex w-fit items-center justify-center overflow-hidden rounded-full border border-pollyWhite border-opacity-20
					bg-pollyWhite bg-opacity-5 px-4 py-2 font-bakbak text-lg text-pollyWhite duration-300 hover:border-pollyGreen hover:bg-pollyGreen hover:bg-opacity-20`,
						className,
					)}
				>
					<>
						<PendingTransaction /> Pending Transaction
						<FontAwesomeIcon icon={faExternalLink} className='ml-2 text-pollyGreen' />
					</>
				</button>
			</a>
		)
	},
)

export default Button

type NavButtonProps = {
	onClick: (s: any) => void
	active: string
	options: string[]
	className?: string
}

export const NavButtons = ({ options, active, onClick, className }: NavButtonProps) => {
	return (
		<div className='flex w-full cursor-pointer gap-2'>
			{options.map((option: string) => (
				<Button
					size='md'
					key={option}
					className={classNames(`${option === active && '!border-pollyGreen !bg-pollyGreen !bg-opacity-20'} w-full`, className)}
					onClick={() => onClick(option)}
				>
					{option}
				</Button>
			))}
		</div>
	)
}
