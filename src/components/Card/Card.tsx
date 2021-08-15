import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
	background: ${(props) => lighten(0.05, props.theme.color.darkGrey[200])};
	border: 1px solid ${(props) => props.theme.color.darkGrey[200]};
	border-radius: 12px;
	display: flex;
	flex: 1;
	flex-direction: column;
`

export default Card
