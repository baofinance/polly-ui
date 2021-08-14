import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
	onDismiss?: () => void
}

const Modal: React.FC = ({ children }) => {
	return (
		<StyledResponsiveWrapper>
			<StyledModal>{children}</StyledModal>
		</StyledResponsiveWrapper>
	)
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	width: 100%;
	max-width: 50%;
	@media (max-width: 411px) {
		flex: 1;
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		max-height: 100vh;
		animation: ${mobileKeyframes} 0.3s forwards ease-out;
	}
`

const StyledModal = styled.div`
	padding: 0 20px;
	background: ${(props) => props.theme.color.darkGrey[200]};
	border: 1px solid ${(props) => props.theme.color.darkGrey[200]};
	border-radius: 12px;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	min-height: 0;
`

const StyledModalContent = styled.div``

export default Modal
