import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

export const GraphContainer = styled(Col)`
	width: 100%;
	height: 350px;
	margin: 0 auto ${(props) => props.theme.spacing[6]}px;
	border-radius: ${(props) => props.theme.borderRadius}px;
	overflow: hidden;
	background: ${(props) => props.theme.color.transparent[100]};

	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		height: 250px;
	}
`

export const PriceGraphContainer = styled.div`
	width: 80%;
	margin: 0 auto;
`

export const StyledGraphContainer = styled(GraphContainer)`
	width: 100%;
	margin: ${(props) => props.theme.spacing[5]}px auto 0;
`

export const PieGraphRow = styled(Row)`
  height: 400px;
  width: 100%;
  margin: 0 auto;
`

export const PriceGraph = styled.div`
`