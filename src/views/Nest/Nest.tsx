import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import useNest from '../../hooks/useNest'
import { getContract } from '../../utils/erc20'
import Button from '../../components/Button'
import useModal from '../../hooks/useModal'
import useTokenBalance from '../../hooks/useTokenBalance'
import useNestRedeem from '../../hooks/useNestRedeem'
import IssueModal from './components/IssueModal'
import RedeemModal from './components/RedeemModal'
import BigNumber from 'bignumber.js'


const infoIcon =
	'https://raw.githubusercontent.com/pie-dao/brand/eaee121300a4c64c1293bb0f80723539357696c5/misc/Infoicon.svg'
const nestIcon =
	'https://raw.githubusercontent.com/pie-dao/brand/master/PIE%20Tokens/PLAY.svg'

const Nest: React.FC = () => {
	const { nestId }: any = useParams()
	const { nid, nestToken, nestTokenAddress, inputTokenAddress, name, icon } =
		useNest(nestId)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { ethereum } = useWallet()

	const nestContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const inputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, inputTokenAddress)
	}, [ethereum, inputTokenAddress])

	const outputTokenContract = useMemo(() => {
		return getContract(ethereum as provider, nestTokenAddress)
	}, [ethereum, nestTokenAddress])

	const nestTokenName = useMemo(() => {
		return nestToken.toUpperCase()
	}, [nestToken])

	const tokenBalance = useTokenBalance(nestContract.options.address)

	const _inputToken = inputTokenContract.options.address
	const _outputToken = outputTokenContract.options.address

	const [onPresentDeposit] = useModal(
		<IssueModal
			nestName={nestToken}
			nestAddress={nestTokenAddress}
			inputTokenName="WETH"
			_inputToken={_inputToken}
			_outputToken={_outputToken}
			nestContract={nestContract}
			inputTokenContract={inputTokenContract}
			outputTokenContract={outputTokenContract}
		/>,
	)

	const { onNestRedeem } = useNestRedeem(nid)
	const [onPresentRedeem] = useModal(
		<RedeemModal
			max={tokenBalance}
			onConfirm={onNestRedeem}
			nestName={nestToken}
			nestContract={nestContract}
			nid={nid}
		/>,
	)

	return (
		<>
			<NestContent>
				<NestHeader>
					<NestSummary>
						<NestInfo>
							<NestIcon>
								<Icon src={nestIcon} alt={nestToken} />
							</NestIcon>
							<NestMeta>
								<NestSymbol>{nestToken}</NestSymbol>
								<NestName>{name}</NestName>
								<NestPriceInfo>
									<NestPrice>$1.00 </NestPrice>
									<NestPercentChange>+5%</NestPercentChange>
								</NestPriceInfo>
							</NestMeta>
						</NestInfo>

						<NestButtons>
							<Button text="Issue" onClick={onPresentDeposit} width="210px" />
							<Spacer />
							<Button
								disabled={tokenBalance.eq(new BigNumber(0))}
								text="Redeem"
								onClick={onPresentRedeem}
								width="210px"
							/>
						</NestButtons>
					</NestSummary>
				</NestHeader>

				<NestPerformance>
					<NestNav>
						<NavPrice>$1.00</NavPrice>
						<NavText>
							NAV
							<img src={infoIcon} alt={nestToken} />
						</NavText>
					</NestNav>

					<NestPremium>
						<PremiumPercent>0%</PremiumPercent>
						<PremiumText>Premium</PremiumText>
					</NestPremium>

					<NestAPY>
						<APYPercent>40%</APYPercent>
						<APYText>Tot APY 🔥</APYText>
					</NestAPY>

					<NestCap>
						<CapNumber>$1,000,000</CapNumber>
						<CapText>Market Cap</CapText>
					</NestCap>
				</NestPerformance>
			</NestContent>
		</>
	)
}

const NestContent = styled.div`
	-webkit-text-size-adjust: 100%;
	line-height: inherit;
	font-family: Rubik, sans-serif;
	align-items: center;
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 1280px;
	overflow: hidden;
	padding-bottom: 20px;
	padding-top: 20px;
	width: 96%;
`

const NestHeader = styled.div`
	width: 100%;
	justify-content: space-between;
	align-items: center;
	display: flex;
`

const NestSummary = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	align-content: space-between;
	justify-content: space-between;
	width: 100%;
`

const NestInfo = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const NestIcon = styled.div`
	height: 80px;
	display: inline;
`

const Icon = styled.img`
	vertical-align: middle;
	max-width: 100%;
	display: inline;
	height: 80px;
`

const NestMeta = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 0.75rem;
	margin-right: 0.75rem;
`

const NestSymbol = styled.h1`
	font-family: 'Kaushan Script', sans-serif;
	margin: 0;
	font-weight: inherit;
	font-size: 2.3rem;
	line-height: 1;
	width: 100%;
`

const NestName = styled.h2`
	margin: 0;
	font-weight: inherit;
	font-size: 1rem;
	line-height: 1;
	margin-bottom: 4px;
`

const NestPriceInfo = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
`

const NestPrice = styled.div`
	font-weight: 100;
	font-size: 2.3rem;
	line-height: 1;
	white-space: nowrap;
	width: fit-content;
`

const NestPercentChange = styled.span`
	font-size: 1.1rem;
	margin-left: 0.5rem;
	white-space: nowrap;
	width: fit-content;
`

const NestChange = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: fit-content;
	color: #24d897;
`

const NestButtons = styled.div`
	flex-direction: row-reverse;
	align-items: center;
	flex-grow: 1;
	margin-right: 0px;
	display: flex;
	justify-content: flex-start;
	margin-top: 0px;
	margin-bottom: 0px;
`

const NestPerformance = styled.div`
	width: 100%;
	display: flex;
	margin-top: 2rem;
`

const NestNav = styled.div`
	align-self: flex-start;
	flex: 0 1 auto;
	margin-right: 2rem;
	padding: 0px;
`

const NavPrice = styled.div`
	color: #ec1ea0;
	font-size: 1rem;
`

const NavText = styled.div`
	display: flex;
	align-items: center;
	font-weight: 500;
	color: #ec1ea0;
	font-size: 1.1rem;
`

const NestPremium = styled.div`
	align-self: flex-start;
	flex: 0 1 auto;
	margin-right: 2rem;
	padding: 0px;
`

const PremiumPercent = styled.div`
	color: rgba(0, 0, 0, var(--tw-text-opacity));
	font-size: 1rem;
`

const PremiumText = styled.div`
	font-weight: 100;
	color: rgba(0, 0, 0, var(--tw-text-opacity));
	font-size: 1.1rem;
`

const NestAPY = styled.div`
	align-self: flex-start;
	flex: 0 1 auto;
	margin-right: 2rem;
	padding: 0px;
`

const APYPercent = styled.div`
	font-weight: 500;
	color: rgba(0, 0, 0);
	font-size: 1rem;
`

const APYText = styled.div`
	font-weight: 100;
	--tw-text-opacity: 1;
	color: rgba(0, 0, 0);
	font-size: 1.1rem;
`

const NestCap = styled.div`
	align-self: flex-start;
	flex: 0 1 auto;
	margin-right: 1.5rem;
	padding: 0px;
`

const CapNumber = styled.div`
	font-size: 1rem;
`

const CapText = styled.div`
	font-weight: 100;
	font-size: 1.1rem;
`

export default Nest
