import React from 'react'
import { PropsWithChildren } from 'react'
import styled from 'styled-components'
import Footer from '../Footer'

interface PageProps {
	children: any
}

const Page: React.FC<PropsWithChildren<PageProps>> = ({ children }) => (
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
	background-size: cover;
	background-repeat: no-repeat;
	top: 0;
	left: 0;
`

const StyledMain = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 240px);
`

export default Page
