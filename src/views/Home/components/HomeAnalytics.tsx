import { AnalyticsContainer, Analytics } from 'components/Analytics'
import { SpinnerLoader } from 'components/Loader'
import useHomeAnalytics from 'hooks/base/useHomeAnalytics'
import React from 'react'

const HomeAnalytics: React.FC = () => {
	const homeAnalytics = useHomeAnalytics()
	return (
		<AnalyticsContainer sm={1} lg={4}>
			{homeAnalytics ? (
				homeAnalytics.map((_analytic) => (
					<Analytics key={Math.random().toString()}>
						<span>
							<h2>{_analytic.data}</h2>
							{_analytic.title}
						</span>
					</Analytics>
				))
			) : (
				<div
					style={{
						width: '100%',
						margin: 'auto',
					}}
				>
					<SpinnerLoader block={true} />
				</div>
			)}
		</AnalyticsContainer>
	)
}

export default HomeAnalytics
