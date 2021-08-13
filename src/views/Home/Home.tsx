import React, { useRef } from 'react'
import Page from '../../components/Page'
import { Surface, Spacer, Container } from 'react-neu'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import {
	BubbleWrap,
	BubbleContainer,
	BubbleOverlayText,
	HeroText,
	HeroHeader,
	HeroSubHeader,
} from './components/styles'

import FullPage from './components/FullPage'
import SectionTwo from './components/SectionTwo'
import SectionOne from './components/SectionOne'
import SectionThree from './components/SectionThree'

const Home: React.FC = () => {
	return (
		<Page>
			<Container size="lg">
				<SectionOne />
				<Spacer size='lg' />
				<h1 style={{textAlign: 'center'}}>BUBBLES HERE</h1>
				<Spacer size='lg' />
				<SectionTwo />
				<Spacer size='lg' />
				<SectionThree />
			</Container>
		</Page>
	)
}

export default Home
