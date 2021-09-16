import React from 'react'
import useHomeAnalytics from 'hooks/useHomeAnalytics'
import { SpinnerLoader } from 'components/Loader'
import {
	AnalyticsContainer,
	Analytic,
} from './styles'

const HomeAnalytics: React.FC = () => {
	const homeAnalytics = useHomeAnalytics()
	return (
		<AnalyticsContainer sm={1} lg={4}>
			{homeAnalytics ? (
				homeAnalytics.map((_analytic) => (
					<Analytic key={Math.random().toString()}>
						<span>
							<h2>{_analytic.data}</h2>
							{_analytic.title}
						</span>
					</Analytic>
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
