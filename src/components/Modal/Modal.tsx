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
	max-width: 512px;

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		flex: 1;
		top: 90%;
		right: 0;
		left: 0;
		max-height: 100vh;
		animation: ${mobileKeyframes} 0.3s forwards ease-out;
		max-width: 90%;
	}
`

const StyledModal = styled.div`
	padding: 0 ${(props) => props.theme.spacing[3]}px;
	background: radial-gradient(
		circle at center top,
		${(props) => props.theme.color.darkGrey[800]},
		${(props) => props.theme.color.darkGrey[900]}
	);
	border: 1px solid ${(props) => props.theme.color.primary[400]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	min-height: 0;
`

export default Modal
