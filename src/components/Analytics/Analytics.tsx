import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

export const AnalyticsContainer = styled(Row)`
	display: flex;
	flex-direction: row;
	border-radius: ${(props) => props.theme.borderRadius}px;
	background-color: ${(props) => props.theme.color.transparent[100]};
	backdrop-filter: blur(5px);
	margin-top: 200px; // bubble container is 600px high with 100 px margin top/bottom
	position: absolute;
	width: 80%;
	left: 50%;
	transform: translateX(-50%);
	height: 125px;

	@media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
		flex-direction: column;
		margin: ${(props) => props.theme.spacing[6]}px auto;
		position: relative;
		width: auto;
		min-height: 133px;
		height: auto;
	}

	@media (min-width: ${(props) => props.theme.breakpoints.uhd}px) {
		position: relative;
		margin: ${(props) => props.theme.spacing[5]}px auto;
		left: 0;
		transform: none;
	}
`

export const Analytics = styled(Col)`
	margin: auto;
	text-align: center;
	height: 75%;
	display: flex;
	-webkit-box-align: center;
	align-items: center;
	-webkit-box-pack: center;
	justify-content: center;
	flex: 1 1;
	padding: ${(props) => props.theme.spacing[5]}px;
	border-right: 1px solid ${(props) => props.theme.color.transparent[200]};

	&:first-child {
	}

	&:last-child {
		border-right: none;
	}

	span > h2 {
		font-family: 'Rubik', sans-serif;
		font-weight: ${(props) => props.theme.fontWeight.medium};
	}

	@media (max-width: ${(props) => props.theme.breakpoints.fhd}px) {
		border-right: none;
		border-bottom: 1px solid ${(props) => props.theme.color.transparent[200]};
		flex: auto !important;
		padding-bottom: ${(props) => props.theme.spacing[3]}px;
		padding-top: ${(props) => props.theme.spacing[3]}px;

		&:first-child {
		}

		&:last-child {
			border-bottom: none;
		}
	}
`
