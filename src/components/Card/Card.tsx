import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
	background: ${(props) => props.theme.color.primary[400]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	flex: 1;
	flex-direction: column;
`

export default Card
