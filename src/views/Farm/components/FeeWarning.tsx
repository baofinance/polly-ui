import React from 'react'
import { StyledDocsWarning } from './styles'

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
