import immunefi from 'assets/img/immunefi.png'
import React from 'react'
import styled from 'styled-components'

const SecuritySection: React.FC = () => (
	<>
		<a
			href="https://www.immunefi.com/bounty/baofinance"
			target="_blank"
			rel="noreferrer"
		>
			<ImmunefiBanner src={immunefi} />
		</a>
	</>
)

export default SecuritySection

const ImmunefiBanner = styled.img`
	display: block;
	margin-left: auto;
	margin-right: auto;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		max-width: 70%;
		margin: auto;
	}

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		max-width: 80%;
		margin: auto;
	}
`
