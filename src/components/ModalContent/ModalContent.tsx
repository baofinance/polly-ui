import React from 'react'
import styled from 'styled-components'

const ModalContent: React.FC = ({ children }) => {
	return <StyledModalContent>{children}</StyledModalContent>
}

const StyledModalContent = styled.div`
	padding: ${(props) => props.theme.spacing[4]}px;
	font-size: 1rem;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	text-align: center;
	
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		flex: 1;
		overflow: auto;
		padding: ${(props) => props.theme.spacing[2]}px;
		padding-top: 0;
	}
`

export default ModalContent
