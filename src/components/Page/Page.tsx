import overlay from 'assets/img/overlay.png'
import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
	<StyledPage>
		<StyledMain>{children}</StyledMain>
		<Footer />
	</StyledPage>
)

const StyledPage = styled.div`
	content: '';
	background-image: url(${overlay});
	background-size: cover;
	background-repeat: no-repeat;
	top: 0;
	left: 0;
`

const StyledMain = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px);
`

export default Page
