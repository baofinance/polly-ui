import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../components/Button'
import Page from '../../components/Page'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import Nest from '../Nest'
import NestCards from './components/NestCards'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import pollyNests from '../../assets/img/polly-nests.png'

const Nests: React.FC = () => {
	const { path } = useRouteMatch()
	const { account } = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account ? (
					<>
						<PageHeader
							icon={pollyNests}
							title="Build Your Nest!"
							subtitle="Stake Sushiswap and Baoswap LP tokens to earn BAO!"
						/>
						<StyledInfo>
							Be sure to read{' '}
							<a href="https://docs.bao.finance">docs.bao.finance</a> before
							using the pools so you are familiar with protocol risks and fees!
						</StyledInfo>
						<Spacer size="md" />
						<StyledInfo>
							Please note this is the MATIC version of Bao, Polly. For mainnet,
							visit <a href="https://bao.finance">bao.finance</a>{' '}
						</StyledInfo>
						<Spacer size="md" />

						<Route exact path={path}>
							<NestCards />
						</Route>
						<Route path={`${path}/:nestId`}>
							<Nest />
						</Route>
					</>
				) : (
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						<Button
							onClick={onPresentWalletProviderModal}
							text="🔓 Unlock Wallet"
						/>
					</div>
				)}
			</Page>
		</Switch>
	)
}

const StyledHeader = styled.h1`
	font-size: 64px;
	font-family: 'Kaushan Script', sans-serif;
	color: ${(props) => props.theme.color.grey[500]};
	width: 20%;
	text-align: center;
	border-bottom: 2px solid ${(props) => props.theme.color.grey[500]};
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;

	> b {
		color: ${(props) => props.theme.color.grey[600]};
	}
`

export default Nests
