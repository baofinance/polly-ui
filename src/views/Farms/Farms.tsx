import pollyNests from 'assets/img/polly-nests.png'
import Button from 'components/Button'
import Container from 'components/Container'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Farm from '../Farm'
import Balances from './components/Balances'
import FarmCards from './components/FarmCards'
import Config from '../../bao/lib/config'

const Farms: React.FC = () => {
	const { path } = useRouteMatch()
	const { account, ethereum }: any = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)

	return (
		<Switch>
			<Page>
				{account && ethereum.chainId === Config.defaultRpc.chainId ? (
					<>
						<Route exact path={path}>
							<PageHeader
								icon={pollyNests}
								title="Farms"
								subtitle="Earn POLLY by staking SushiSwap LP and Nest Tokens!"
							/>
							<Container>
								<StyledInfo>
									❗️{' '}
									<span style={{ fontWeight: 600, color: '#ff3333' }}>
										Attention:
									</span>{' '}
									Be sure to read the{' '}
									<StyledExternalLink
										href="https://docs.bao.finance/franchises/polly"
										target="_blank"
									>
										docs
									</StyledExternalLink>{' '}
									before using the farms so you are familiar with protocol risks
									and fees!
								</StyledInfo>
								<Spacer size="md" />
								<Balances />
								<Spacer size="md" />
							</Container>
							<FarmCards />
						</Route>
						<Route path={`${path}/:farmId`}>
							<Farm />
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

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.text[100]};
	font-size: 1rem;
	font-weight: 400;
	margin: 0;
	padding: 0;
`

const StyledExternalLink = styled.a`
	color: ${(props) => props.theme.color.text[100]};
	font-weight: ${(props) => props.theme.fontWeight.strong};
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.link[100]};
	}
	&.active {
		color: ${(props) => props.theme.color.link[100]};
	}
`

export default Farms
