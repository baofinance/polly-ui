import pollyNests from 'assets/img/polly-nests.png'
import Button from 'components/Button'
import Container from 'components/Container'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Spacer from 'components/Spacer'
import WalletProviderModal from 'components/WalletProviderModal'
import useModal from 'hooks/useModal'
import React from 'react'
import { Route, Switch, useRouteMatch, NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Farm from '../Farm'
import Balances from './components/Balances'
import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
	const { path } = useRouteMatch()
	const { account, ethereum }: any = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	return (
		<Switch>
			<Page>
				{account && ethereum.chainId === '0x89' ? (
					<>
						<Route exact path={path}>
							<PageHeader
								icon={pollyNests}
								title="Farms"
								subtitle="Earn POLLY by staking Sushiswap LP and Nest Tokens!"
							/>
							<StyledInfo>
								Be sure to read the{' '}
								<StyledLink
									href="https://docs.bao.finance/franchises/polly"
									target="_blank"
								>
									docs
								</StyledLink>{' '}
								before using the pools so you are familiar with protocol risks
								and fees!
							</StyledInfo>
							<Spacer size="md" />{' '}
							<Container>
								<Balances />
								<Spacer size="md" />
								<StyledInfo>
									❗️{' '}
									<span style={{ fontWeight: 600, color: 'red' }}>
										Attention:
									</span>{' '}
									Please familiarize yourself with the fee structure before
									using PollyChef. Deposits are subject to a 0.75% fee.
									Withdrawal slashing fee of 0.1% - 50 % will be incurred when
									exiting a farm, depending on the length of time your LP was
									staked. Please{' '}
									<StyledLink
										href="https://docs.bao.finance/franchises/polly/polly-fees-penalties"
										target="blank"
									>
										{' '}
										read the docs
									</StyledLink>{' '}
									to familiarize yourself with fees and penalties.
								</StyledInfo>
								<Spacer />
								<StyledInfo>
									❗️ APYs for single-sided pools are not yet accurate.
								</StyledInfo>
								<StyledInfo>
									❗️ APYs are affected by a 7-day average price of POLLY which
									has not yet stabilized.
								</StyledInfo>
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
	color: #bbb;
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
`

const StyledLink = styled.a`
	color: white;
	font-weight: 700;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.blue[400]};
	}
	&.active {
		color: ${(props) => props.theme.color.blue[400]};
	}
	@media (max-width: 400px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

export default Farms
