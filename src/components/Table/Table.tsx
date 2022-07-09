import { Table } from 'react-bootstrap'
import styled from 'styled-components'

export const StyledTable = styled(Table)`
	width: 100%;
	margin: 0 auto;
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	color: ${(props) => props.theme.color.text[100]};
	border-color: transparent;

	th {
		padding-top: ${(props) => props.theme.spacing[4]};
		padding-bottom: ${(props) => props.theme.spacing[4]};
	}

	tbody > tr {
		vertical-align: middle;

		&:hover {
			color: ${(props) => props.theme.color.text[100]} !important;
		}
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		width: 100%;

		th.strategy {
			display: none;
		}

		td.strategy {
			display: none;
		}
	}
`
