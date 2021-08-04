import React from 'react'
import styled from 'styled-components'
import pollyBanner from '../../assets/img/polly.svg'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Hero from './components/Hero'
import HeroText from './components/HeroText'

const Home: React.FC = () => {
	return (
		<Page>
			<HeroText />
			<Hero />
		</Page>
	)
}

export default Home
