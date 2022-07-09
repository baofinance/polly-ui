import React, { PropsWithChildren, ReactNode } from 'react'
import styled from 'styled-components'

interface WalletModalCardProps {
	children: ReactNode
}

const WalletModalCard: React.FC<PropsWithChildren<WalletModalCardProps>> = ({
	children,
}) => {
	return <StyledCard>{children}</StyledCard>
}

const StyledCard = styled.div`
	background: ${(props) => props.theme.color.transparent[100]};
	border: 1px solid ${(props) => props.theme.color.primary[200]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	flex: 1;
	flex-direction: column;
`

export default WalletModalCard
