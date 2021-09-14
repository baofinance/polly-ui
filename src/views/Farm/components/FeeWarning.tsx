import React from 'react'
import styled from 'styled-components'

const FeeWarning: React.FC = () => {
	return (
		<StyledDocsWarning>
			<p>First Deposit Block:</p>
			<p>Last Withdraw Block:</p>
			<p>Current Block:</p>
			<p>Withdraw Fee:</p>
		</StyledDocsWarning>
	)
}

export default FeeWarning

const StyledDocsWarning = styled.span`
	background-color: ${(props) => props.theme.color.primary[300]};
	font-size: 16px;
	margin: 1rem;
	padding: 0.5rem;
	text-align: start;
	border-left: 3px solid ${(props) => props.theme.color.green};
	width: 90%;
`