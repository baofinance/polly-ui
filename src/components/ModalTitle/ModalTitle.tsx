import React from 'react'
import styled from 'styled-components'

interface ModalTitleProps {
	text?: string
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text }) => (
	<StyledModalTitle>{text}</StyledModalTitle>
)

const StyledModalTitle = styled.div`
	align-items: center;
	text-align: center;
	color: ${(props) => props.theme.color.primary[100]};
	display: flex;
	font-size: 18px;
	font-weight: ${(props) => props.theme.fontWeight.strong};
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: center;
`

export default ModalTitle
