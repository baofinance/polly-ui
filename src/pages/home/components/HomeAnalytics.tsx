import { Analytics, AnalyticsContainer } from '@/components/Analytics'
import Loader from '@/components/Loader'
import Typography from '@/components/Typography'
import useHomeAnalytics from '@/hooks/base/useHomeAnalytics'
import React from 'react'

const HomeAnalytics: React.FC = () => {
	const homeAnalytics = useHomeAnalytics()
	return (
		<div className='flex flex-row row-span-1 lg:row-span-4 glassmorphic-card mt-[200px] absolute w-4/5 left-1/2 h-[125px] translate-x-[50%]'>
			{homeAnalytics ? (
				homeAnalytics.map(_analytic => (
					<div
						key={Math.random().toString()}
						className='m-auto text-center h-3/4 flex flex-col items-center justify-center flex-1 p-4 border-r border-baoBlack last:border-r-0 '
					>
						<span>
							<Typography className='text-xl font-medium'>{_analytic.data}</Typography>
							{_analytic.title}
						</span>
					</div>
				))
			) : (
				<div
					style={{
						width: '100%',
						margin: 'auto',
					}}
				>
					<Loader block={true} />
				</div>
			)}
		</div>
	)
}

export default HomeAnalytics
