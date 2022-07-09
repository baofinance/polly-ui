import { Row } from 'react-bootstrap'
import styled from 'styled-components'

export const BalanceWrapper = styled(Row)`
	padding: 0.25rem;
`

export const BalanceContent = styled.div`
	-webkit-box-align: center;
	align-items: center;
	display: flex;
`

export const BalanceImage = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	min-width: 48px;
	min-height: 48px;
	border-radius: 40px;
	background-color: ${(props) => props.theme.color.primary[200]};

	img {
		height: 34px;
		text-align: center;
		min-width: 34px;
		margin: auto;
	}
`

export const BalanceSpacer = styled.div`
	height: 8px;
	min-height: 8px;
	min-width: 8px;
	width: 8px;
`

export const BalanceText = styled.div`
	display: block;
	flex: 1 1 0%;
`

export const BalanceValue = styled.div`
	font-size: 24px;
	font-weight: 700;
`
