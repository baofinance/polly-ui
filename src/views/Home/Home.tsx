import React from 'react'
import styled from 'styled-components'
import pollyBanner from '../../assets/img/polly.svg'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Hero from './components/Hero'

const Home: React.FC = () => {
	return (
		<Page>
			<PageHeader
				icon={pollyBanner}
				title="PollyChef is Ready"
				subtitle="Stake Sushiswap and Baoswap LP tokens to earn BAO!"
			/>
			<StyledInfo>
				Be sure to read <a href="https://docs.bao.finance">docs.bao.finance</a>{' '}
				before using the pools so you are familiar with protocol risks and fees!
			</StyledInfo>
			<Spacer size="md" />
			<StyledInfo>
				Please note this is the MATIC version of Bao, Polly. For mainnet, visit{' '}
				<a href="https://bao.finance">bao.finance</a>{' '}
			</StyledInfo>
			<HeroContainer>
				<Hero />
			</HeroContainer>
		</Page>
	)
}

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	max-width: 900px;

	> b {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

const HeroContainer = styled.div`
	height: 300px;
	max-width: 900px;
`

export default Home
