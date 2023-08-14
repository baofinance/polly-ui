import { Chip } from '@material-tailwind/react/components/Chip'
import classNames from 'classnames'

interface BadgeProps {
	children: any
	color?: string
	className?: string
}

const Badge: React.FC<BadgeProps> = ({ children, className = '', color }) => {
	return (
		<Chip
			className={classNames(
				'rounded-full bg-pollyGreen px-2 py-1 align-middle font-bakbak text-sm font-normal !normal-case text-pollyWhite',
				className,
			)}
			style={{ backgroundColor: `${color}` }}
			value={children}
		/>
	)
}

export default Badge
