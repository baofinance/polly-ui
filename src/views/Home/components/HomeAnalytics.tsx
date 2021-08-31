import React from 'react'
import useHomeAnalytics from '../../../hooks/useHomeAnalytics'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import { SpinnerLoader } from '../../../components/Loader'

const HomeAnalytics: React.FC = () => {
	const homeAnalytics = useHomeAnalytics()
	return (
		<AnalyticsContainer lg={4}>
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

const AnalyticsContainer = styled(Row)`
	display: flex;
	flex-direction: row;
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.5);
	backdrop-filter: blur(5px);

	@media (min-width: 414px) {
		margin-top: 200px; // bubble container is 600px high with 100 px margin top/bottom
		z-index: 10;
		position: absolute;
		width: 80%;
		left: 50%;
		transform: translateX(-50%);
		height: 125px;
	}

	@media (max-width: 414px) {
		flex-direction: column;
		margin-left: auto;
		margin-right: auto;
		margin-top: 50px;
		margin-bottom: 50px;
		position: relative;
		flex-direction: row;
	}
`

const Analytic = styled(Col)`
	margin: auto;
	text-align: center;
	height: 75%;
	border-right: 1px solid rgba(255, 255, 255, 0.1);
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;

	span > h2 {
		font-family: 'Rubik', sans-serif;
		font-weight: 700;
	}

	@media (max-width: 414px) {
		border-right: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		flex: auto !important;
		padding-bottom: 1rem;
		padding-top: 1rem;

		&:first-child {
		}

		&:last-child {
			border-bottom: none;
		}
	}

	@media (min-width: 414px) {
		border-right: 1px solid rgba(255, 255, 255, 0.1);
		flex: 1 1;
		padding: 2rem;

		&:first-child {
		}

		&:last-child {
			border-right: none;
		}
	}
`

export default HomeAnalytics
