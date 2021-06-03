import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'
import { default as React, useEffect, useMemo, useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { provider } from 'web3-core'
import baoicon from '../../assets/img/bao-icon.svg'
import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import useBao from '../../hooks/useBao'
import { contractAddresses } from '../../bao/lib/constants'
import { gettBaoSupply } from '../../bao/utils'
import { getContract } from '../../utils/erc20'
import { getBalanceNumber } from '../../utils/formatBalance'
import StakeBao from '../Staking/components/StakeBao'
import UnstaketBao from '../Staking/components/UnstakeBao'

const Staking: React.FC = () => {
	const { path } = useRouteMatch()
	const { account } = useWallet()
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	const { tokenAddress } = {
		tokenAddress: contractAddresses.tbao[100],
	}

	const [totalSupply, setTotalSupply] = useState<BigNumber>()

	const bao = useBao()
	const { ethereum } = useWallet()

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		async function fetchTotalSupply() {
			const supply = await gettBaoSupply(bao)
			setTotalSupply(supply)
		}
		if (bao) {
			fetchTotalSupply()
		}
	}, [bao, setTotalSupply])

	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, tokenAddress)
	}, [ethereum, tokenAddress])

	return (
		<Switch>
			<Page>
				{account ? (
					<>
						<Route exact path={path}>
							<PageHeader
								icon={baoicon}
								title="Welcome to the Tea House"
								subtitle="Stake BAOcx and earn with tBAO!!"
							/>
						</Route>
						<StyledFarm>
							<StyledCardsWrapper>
								<StyledCardWrapper>
									<UnstaketBao lpContract={lpContract} />
								</StyledCardWrapper>
								<Spacer />
								<StyledCardWrapper>
									<StakeBao />
								</StyledCardWrapper>
							</StyledCardsWrapper>
							<Spacer size="lg" />
							<StyledInfo>
								ℹ️️ You will earn a portion of the swaps fees based on the
								amount of tBao held relative the weight of the staking. tBao can
								be minted by staking Baocx. To redeem Baocx staked plus swap fees
								convert tBao back to Baocx. Note that the ratio of Baocx:tBao is not 1:1 and will change over time. {' '}
								{totalSupply
									? `There are currently ${getBalanceNumber(
											totalSupply,
									  )} tBao in existence.`
									: ''}
							</StyledInfo>
						</StyledFarm>
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

const StyledFarm = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.grey[500]};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	@media (max-width: 900px) {
		width: 90%;
	}
	width: 900px;
`

export default Staking
