import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'react-bootstrap'
import _ from 'lodash'

const HomeAnalytics: React.FC = () => (
	<AnalyticsContainer lg={4}>
		{_.times(4, () => {
			return (
				<Analytic>
					<span>
						<h2>$1,000,000</h2>
						Placeholder
					</span>
				</Analytic>
			)
		})}
	</AnalyticsContainer>
)

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
	
	&:last-child {
		border-right: none;
	}
`

export default HomeAnalytics
