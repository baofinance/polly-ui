import React from 'react'
import useHomeAnalytics from '../../../hooks/useHomeAnalytics'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { SpinnerLoader } from '../../../components/Loader'

const HomeAnalytics: React.FC = () => {
	const homeAnalytics = useHomeAnalytics()
	return (
		<AnalyticsContainer lg={4}>
			{homeAnalytics ? homeAnalytics.map(_analytic => (
				<Analytic>
					<span>
						<h2>{_analytic.data}</h2>
						{_analytic.title}
					</span>
				</Analytic>
			)) : (
				<div style={{
					width: '100%',
					margin: 'auto'
				}}>
					<SpinnerLoader block={true} />
				</div>
			)}
		</AnalyticsContainer>
	)
}

const AnalyticsContainer = styled(Row)`
	width: 100%;
	height: 128px;
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.4);
	margin: 2.5em 0;
`

const Analytic = styled(Col)`
	margin: auto;
	text-align: center;
	height: 75%;
	border-right: 1px solid rgba(255, 255, 255, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;

	span > h2 {
		font-family: "Rubik", sans-serif;
	}
	
	&:last-child {
		border-right: none;
	}
`

export default HomeAnalytics
