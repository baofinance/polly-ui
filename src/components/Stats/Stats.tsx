import classNames from 'classnames'
import Typography from '../Typography'

type Stat = {
	label: string
	value: any
}

type StatBlockProps = {
	label?: string
	stats: Stat[]
	className?: string
}

export const StatBlock = ({ label, stats, className = '' }: StatBlockProps) => (
	<>
		<div className={classNames('', className)}>
			{label && (
				<div className='text-center'>
					<Typography className='p-4 text-center font-bakbak text-lg lg:text-xl'>{label}</Typography>
				</div>
			)}
			<div className='realtive flex min-h-fit min-w-fit flex-1 flex-col rounded-3xl'>
				{stats.map(({ label, value }) => (
					<div className='grid grid-cols-2 break-words rounded px-2 py-2 last:pb-1 lg:px-2 lg:py-1' key={label}>
						<Typography className='my-auto align-middle font-bakbak text-sm text-pollyWhite lg:text-base'>{label}</Typography>
						<Typography className='my-auto text-end font-bakbak text-sm text-pollyWhite lg:text-base'>{value}</Typography>
					</div>
				))}
			</div>
		</div>
	</>
)

export const StatCards = ({ label, stats }: StatBlockProps) => (
	<>
		{label && (
			<div className='text-center'>
				<Typography>{label}</Typography>
			</div>
		)}
		{stats.map(({ label, value }) => (
			<div key={label} className='realtive  flex min-w-[15%] flex-1 flex-col rounded border px-4 py-3'>
				<div className='break-words text-center' key={label}>
					<Typography variant='sm' className='mb-1 text-left font-bakbak text-pollyGreen'>
						{label}
					</Typography>
					<Typography variant='base' className='text-left font-bakbak'>
						{value}
					</Typography>
				</div>
			</div>
		))}
	</>
)

export const FeeBlock = ({ label, stats }: StatBlockProps) => (
	<>
		<div className='text-center'>
			<Typography variant='base' className='font-bakbak text-pollyWhite'>
				{label}
			</Typography>
		</div>
		<div className='realtive  flex min-h-fit min-w-fit flex-1 flex-col rounded p-2'>
			{stats.map(({ label, value }) => (
				<div className='grid grid-cols-2 break-words rounded px-2 py-2' key={label}>
					<Typography variant='base' className='font-bakbak text-pollyWhite'>
						{label}
					</Typography>
					<Typography variant='base' className='text-end font-bakbak text-pollyWhite'>
						{value}
					</Typography>
				</div>
			))}
		</div>
	</>
)
