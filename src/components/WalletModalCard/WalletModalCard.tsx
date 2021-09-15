import React from 'react'
import styled from 'styled-components'

const WalletModalCard: React.FC = ({ children }) => (
	<StyledCard>{children}</StyledCard>
)

const StyledCard = styled.div`
	background: ${(props) => props.theme.color.transparent[100]};
	border: 1px solid ${(props) => props.theme.color.darkGrey[200]};
	border-radius: 12px;
	display: flex;
	flex: 1;
	flex-direction: column;
`

export default WalletModalCard
