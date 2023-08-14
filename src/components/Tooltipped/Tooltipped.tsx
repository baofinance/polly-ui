import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tooltip } from '@material-tailwind/react/components/Tooltip'
import React from 'react'

import classNames from 'classnames'

interface TooltippedProps {
	content: any
	children?: any
	placement?: any
	className?: any
}

const Tooltipped: React.FC<TooltippedProps> = ({ children, content, placement, className }) => (
	<>
		<Tooltip
			id={Math.random().toString()}
			content={content}
			placement={placement}
			offset={10}
			className={classNames(
				'z-[9999] max-w-xs rounded border border-pollyWhite border-opacity-20 bg-pollyBlack px-2 py-1 text-center',
				className,
			)}
		>
			{children || (
				<span>
					<FontAwesomeIcon icon={faQuestionCircle} className='text-pollyWhite duration-200 hover:text-pollyGreen' />
				</span>
			)}
		</Tooltip>
	</>
)

export default Tooltipped
export type { TooltippedProps }
