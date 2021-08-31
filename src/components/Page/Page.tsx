import overlay from 'assets/img/overlay.png'
import React from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

const Page: React.FC = ({ children }) => (
	<StyledPageContainer>
		<StyledPageWrapper>
			<StyledMain>{children}</StyledMain>
			<Footer />
		</StyledPageWrapper>
	</StyledPageContainer>
)

const StyledPageContainer = styled.div`
	display: table;
	position: absolute;
	top: ${(props) => props.theme.topBarSize}px;
	left: 0;
	height: calc(100vh - ${(props) => props.theme.topBarSize}px);
	width: 100%;
`

const StyledPageWrapper = styled.div`
	display: table-cell;
	vertical-align: middle;
	min-height: calc(100vh - ${(props) => props.theme.topBarSize}px);
	background-image: url(${overlay});
	background-size: cover;
	background-repeat: no-repeat;
`

const StyledMain = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

export default Page
