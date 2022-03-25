import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { fetchCalcToNest, getRecipeContract } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { Button } from 'components/Button'
import { SubmitButton } from 'components/Button/Button'
import ExternalLink from 'components/ExternalLink'
import { SpinnerLoader } from 'components/Loader'
import NestTokenInput from 'components/NestTokenInput'
import NestTokenOutput from 'components/NestTokenOutput'
import Spacer from 'components/Spacer'
import TokenInput from 'components/TokenInput'
import Tooltipped from 'components/Tooltipped'
import useAllowancev2 from 'hooks/base/useAllowancev2'
import useApprovev2 from 'hooks/base/useApprovev2'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import useNestIssue from 'hooks/baskets/useNestIssue'
import useNestRate from 'hooks/baskets/useNestRate'
import useNestRedeem from 'hooks/baskets/useNestRedeem'
import React, { useCallback, useMemo, useState } from 'react'
import {
	Col,
	FloatingLabel,
	Form,
	Modal,
	ModalProps,
	Row,
} from 'react-bootstrap'
import styled from 'styled-components'
import { getDisplayBalance, getFullDisplayBalance } from 'utils/numberFormat'
import { Contract } from 'web3-eth-contract'
import { Disclaimer } from './styles'

interface IssueModalProps extends ModalProps {
	nestAddress: string
	nestContract: Contract
	nestName: string
	nestIcon: string
	inputTokenContract: Contract
	inputTokenName: string
	outputTokenContract: Contract
	_inputToken?: string
	_outputToken?: string
	nav: { nav: BigNumber; mainnetNav: BigNumber }
	show: boolean
	onHide: () => void
}

export const IssueModal: React.FC<IssueModalProps> = ({
	nestName,
	nestAddress,
	nestIcon,
	inputTokenName,
	_inputToken,
	_outputToken,
	inputTokenContract,
	nav,
	show,
	onHide,
}) => {
	const { library, account } = useWeb3React()
	const [nestAmount, setNestAmount] = useState('')
	const [wethNeeded, setWethNeeded] = useState('')
	const { pendingTx, handleTx } = useTransactionHandler()
	const [confNo, setConfNo] = useState<number | undefined>()
	const [requestedApproval, setRequestedApproval] = useState(false)
	const [val, setVal] = useState<string>('')

	const navDifferenceTooHigh = useMemo(
		() =>
			nav &&
			nav.nav
				.minus(nav.mainnetNav)
				.div(nav.nav)
				.times(100)
				.abs()
				.gt((nestName === 'nSTBL' && '2') || '5'),
		[nav],
	)

	const fetchRate = async () => {
		return fetchCalcToNest(recipeContract, _outputToken, '1')
	}

	const handleOutputChange = useCallback(
		(e) => {
			const updateInput = (inputAmount: string) => {
				fetchRate().then((val) =>
					setWethNeeded(val.times(inputAmount).times(1.05).toFixed(18)),
				)
			}

			if (typeof e === 'string') {
				return updateInput(e)
			}

			const inputAmount = e.currentTarget.value

			if (inputAmount.length === 0) {
				setNestAmount('')
				setWethNeeded('')
				return
			}
			if (
				isNaN(parseFloat(inputAmount)) ||
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return

			setNestAmount(inputAmount)
			updateInput(inputAmount)
		},
		[setNestAmount],
	)

	const handleInputChange = useCallback(
		(e) => {
			const updateInput = (inputAmount: string) => {
				fetchRate().then((val: BigNumber) =>
					setNestAmount(new BigNumber(inputAmount).div(val).toFixed(18)),
				)
			}

			if (typeof e === 'string') {
				return updateInput(e)
			}

			const inputAmount = e.currentTarget.value

			if (e.currentTarget.value.length === 0) {
				setNestAmount('')
				setWethNeeded('')
				return
			}
			if (
				isNaN(parseFloat(inputAmount)) ||
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return

			setWethNeeded(inputAmount)
			updateInput(inputAmount)
		},
		[setWethNeeded],
	)

	const hideModal = useCallback(() => {
		onHide()
		setVal('')
	}, [onHide])

	const bao = useBao()
	const issueAllowance = useAllowancev2(
		Config.addressMap.WETH,
		bao.getContract('recipe').options.address,
	)
	const { onApprove: onApproveIssue } = useApprovev2(
		bao.getNewContract('erc20.json', Config.addressMap.WETH),
		bao.getContract('recipe'),
	)
	const { wethPerIndex } = useNestRate(nestAddress)
	const recipeContract = getRecipeContract(bao)
	const { onIssue } = useNestIssue(nestAddress)
	const wethBalance = useTokenBalance(Config.addressMap.WETH)

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide}>
				<FontAwesomeIcon icon="times" />
			</CloseButton>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<HeaderWrapper>
						Issue <img src={nestIcon} style={{ marginLeft: '10px' }} />{' '}
						<p style={{ fontSize: '0.875rem', verticalAlign: 'top' }}>
							<Tooltipped
								placement="right"
								content="Polly uses your wETH to buy the underlying assets for you from SushiSwap. Minting transactions send 5% more wETH to avoid unexpected errors like slippage, any unused WETH is returned."
							/>
						</p>
					</HeaderWrapper>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{navDifferenceTooHigh && (
					<Disclaimer>
						<p style={{ fontSize: '0.875rem' }}>
							`The difference between NAV on mainnet ($$
							{getDisplayBalance(nav.mainnetNav, 0)}) and NAV on MATIC ($$
							{getDisplayBalance(nav.nav, 0)}) is greater than ($
							{(nestName === 'nSTBL' && '2%') || '5%'}). Minting from the UI is
							disabled until underlying asset prices are arbitraged within the
							(${(nestName === 'nSTBL' && '2%') || '5%'}) range in order to
							prevent loss of funds.`
						</p>
					</Disclaimer>
				)}
				{nestName === 'nSTBL' && (
					<>
						<Disclaimer>
							<p style={{ fontSize: '0.875rem' }}>
								Due to low liquidity, there is a mint limit in place for 10,000
								nSTBL. As liquidity for RAI on Polygon goes up, the limit will
								increase.
							</p>
						</Disclaimer>{' '}
					</>
				)}
				<BalanceWrapper>
					<Col xs={4}>
						<LabelStart>
							<MaxLabel>Mint {nestName}</MaxLabel>
						</LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<AssetLabel>
									1 {nestName} ={' '}
									<>
										{(wethPerIndex && getDisplayBalance(wethPerIndex, 0)) || (
											<SpinnerLoader />
										)}{' '}
										<FontAwesomeIcon icon={['fab', 'ethereum']} />
									</>
								</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</BalanceWrapper>
				<NestTokenOutput
					icon={nestIcon}
					value={nestAmount}
					onChange={handleOutputChange}
					symbol={nestName}
					_outputToken={_outputToken}
					addInput={(n: number) => {
						const result = new BigNumber(
							nestAmount === '' ? 0 : nestAmount,
						).plus(n)
						if (result.toNumber() >= 0) {
							setNestAmount(result.toString())
							handleOutputChange(result.toString())
						}
					}}
				/>
				<Spacer />
				<BalanceWrapper>
					<Col xs={4}>
						<LabelStart>
							<MaxLabel>wETH Needed</MaxLabel>
						</LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<MaxLabel>Balance:</MaxLabel>
								<AssetLabel>
									{(wethBalance && getDisplayBalance(wethBalance)) || (
										<SpinnerLoader />
									)}
								</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</BalanceWrapper>
				<NestTokenInput
					setValue={(num: string) => {
						setWethNeeded(num)
						handleInputChange(num)
					}}
					value={wethNeeded}
					onChange={handleInputChange}
					symbol={inputTokenName}
					_inputToken={_inputToken}
					wethBalance={wethBalance}
				/>
			</Modal.Body>
			<Modal.Footer>
				<SubmitButton onClick={onHide}>Cancel</SubmitButton>
				{issueAllowance && !issueAllowance.gt(0) ? (
					<SubmitButton
						disabled={requestedApproval}
						onClick={() => {
							handleTx(onApproveIssue(), `Approve ${inputTokenName}`)
						}}
					>
						Approve {inputTokenName}
					</SubmitButton>
				) : (
					<>
						{_outputToken === Config.addressMap.nPOLY ? (
							<>
								{pendingTx ? (
									<SubmitButton disabled={true}>
										{typeof pendingTx === 'string' ? (
											<ExternalLink
												href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`}
												target="_blank"
											>
												Pending Transaction{' '}
												<FontAwesomeIcon icon="external-link-alt" />
											</ExternalLink>
										) : (
											'Pending Transaction'
										)}
									</SubmitButton>
								) : (
									<SubmitButton
										disabled={
											wethNeeded.slice(-1) === '.' ||
											nestAmount.slice(-1) === '.' ||
											isNaN(parseFloat(wethNeeded)) ||
											isNaN(parseFloat(nestAmount)) ||
											parseFloat(wethNeeded) === 0 ||
											parseFloat(wethNeeded) < 0 ||
											parseFloat(wethNeeded) >
												wethBalance.div(10 ** 18).toNumber()
										}
										onClick={async () => {
											const encodedAmountData = await recipeContract.methods
												.encodeData(
													new BigNumber(nestAmount).times(10 ** 18).toString(),
												)
												.call()

											handleTx(
												onIssue(new BigNumber(wethNeeded), encodedAmountData),
												`Issue ${nestAmount} ${nestName}`,
											)
										}}
									>
										Issue {nestName}
									</SubmitButton>
								)}
							</>
						) : (
							<>
								{pendingTx ? (
									<SubmitButton disabled={true}>
										{typeof pendingTx === 'string' ? (
											<ExternalLink
												href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`}
												target="_blank"
											>
												Pending Transaction{' '}
												<FontAwesomeIcon icon="external-link-alt" />
											</ExternalLink>
										) : (
											'Pending Transaction'
										)}
									</SubmitButton>
								) : (
									<SubmitButton
										disabled={
											wethNeeded.slice(-1) === '.' ||
											nestAmount.slice(-1) === '.' ||
											isNaN(parseFloat(wethNeeded)) ||
											isNaN(parseFloat(nestAmount)) ||
											parseFloat(wethNeeded) === 0 ||
											parseFloat(wethNeeded) < 0 ||
											parseFloat(wethNeeded) >
												wethBalance.div(10 ** 18).toNumber() ||
											!nav ||
											navDifferenceTooHigh ||
											(nestName === 'nSTBL' && parseFloat(nestAmount) > 10000)
										}
										onClick={async () => {
											const encodedAmountData = await recipeContract.methods
												.encodeData(
													new BigNumber(nestAmount).times(10 ** 18).toString(),
												)
												.call()

											handleTx(
												onIssue(new BigNumber(wethNeeded), encodedAmountData),
												`Issue ${nestAmount} ${nestName}`,
											)
										}}
									>
										Issue {nestName}
									</SubmitButton>
								)}
							</>
						)}
					</>
				)}
			</Modal.Footer>
		</Modal>
	)
}

interface RedeemModalProps extends ModalProps {
	max: BigNumber
	nestName: string
	nestIcon: string
	nestContract: Contract
	nid: number
	show: boolean
	onHide: () => void
}

export const RedeemModal: React.FC<RedeemModalProps> = ({
	max,
	nid,
	nestName,
	nestIcon,
	nestContract,
	show,
	onHide,
}) => {
	const [val, setVal] = useState('')
	const { pendingTx, handleTx } = useTransactionHandler()
	const [redeemToWeth, setRedeemToWeth] = useState(true)
	const [confNo, setConfNo] = useState<number | undefined>()

	const bao = useBao()

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const [requestedApproval, setRequestedApproval] = useState(false)

	const { onNestRedeem } = useNestRedeem(nid, redeemToWeth)
	// TODO: make one contract that can redeem all nests
	const redeemAllowance = useAllowancev2(
		nestContract.options.address,
		bao.getContract('nestRedeem').options.address,
	)
	const { onApprove: onApproveRedeem } = useApprovev2(
		nestContract,
		bao.getContract('nestRedeem'),
	)

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			const inputAmount = e.currentTarget.value
			if (inputAmount.length === 0) setVal('')
			if (
				(inputAmount.slice(-1) !== '.' && !/(\d*\.)?\d+$/.test(inputAmount)) ||
				(inputAmount.slice(-1) === '.' &&
					inputAmount.slice(0, inputAmount.length - 1).includes('.'))
			)
				return
			setVal(inputAmount)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
	}, [fullBalance, setVal])

	const handleSelectHalf = useCallback(() => {
		setVal(
			max
				.div(10 ** 18)
				.div(2)
				.toString(),
		)
	}, [fullBalance, setVal])

	const hideModal = useCallback(() => {
		onHide()
		setVal('')
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide}>
				<FontAwesomeIcon icon="times" />
			</CloseButton>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<HeaderWrapper>
						Redeem <img src={nestIcon} style={{ marginLeft: '10px' }} />
					</HeaderWrapper>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<FloatingLabel
					controlId="floatingSelect"
					label="Redeem To"
					style={{ marginBottom: '16px', fontSize: '0.875rem' }}
				>
					<RedeemToChoice
						aria-label="Redeem To"
						onChange={(e: any) =>
							setRedeemToWeth(e.currentTarget.value === 'wETH')
						}
					>
						<option>wETH</option>
						<option>Underlying Tokens</option>
					</RedeemToChoice>
				</FloatingLabel>
				<BalanceWrapper>
					<Col xs={4}>
						<LabelStart></LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<MaxLabel>Balance:</MaxLabel>
								<AssetLabel>
									{fullBalance} {nestName}{' '}
								</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</BalanceWrapper>
				<TokenInput
					onSelectMax={handleSelectMax}
					onSelectHalf={handleSelectHalf}
					onChange={handleChange}
					value={val}
					max={fullBalance}
					symbol={nestName}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button text="Cancel" onClick={onHide} />
				{redeemToWeth && redeemAllowance && !redeemAllowance.gt(0) ? (
					<SubmitButton
						disabled={requestedApproval}
						onClick={() => {
							handleTx(onApproveRedeem(), `Approve ${nestName}`)
						}}
					>
						Approve {nestName}
					</SubmitButton>
				) : (
					<>
						{pendingTx ? (
							<SubmitButton disabled={true}>
								{typeof pendingTx === 'string' ? (
									<ExternalLink
										href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`}
										target="_blank"
									>
										Pending Transaction{' '}
										<FontAwesomeIcon icon="external-link-alt" />
									</ExternalLink>
								) : (
									'Pending Transaction'
								)}
							</SubmitButton>
						) : (
							<SubmitButton
								disabled={
									val.slice(-1) === '.' ||
									isNaN(parseFloat(val)) ||
									parseFloat(val) === 0 ||
									parseFloat(val) < 0 ||
									parseFloat(val) > max.div(10 ** 18).toNumber()
								}
								onClick={async () => {
									handleTx(
										onNestRedeem(val),
										`Redeem ${parseFloat(val)} ${nestName}`,
									)
								}}
							>
								Redeem {nestName}
							</SubmitButton>
						)}
					</>
				)}
			</Modal.Footer>
		</Modal>
	)
}

interface NavModalProps extends ModalProps {}

export const NavModal: React.FC<NavModalProps> = ({ show, onHide }) => {
	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered>
			<CloseButton onClick={onHide}>
				<FontAwesomeIcon icon="times" />
			</CloseButton>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<HeaderWrapper>
						<p>NAV vs. Price</p>
					</HeaderWrapper>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<ModalStack>
					<p
						style={{ textAlign: 'left', fontSize: '1.25rem', fontWeight: 500 }}
					>
						NAV
					</p>
					<p style={{ textAlign: 'left' }}>
						The net asset value (NAV) of a Nest represents the market value of
						each share’s portion of the Nest's underlying assets. The NAV is
						determined by adding up the value of all assets in the Nest and then
						dividing that value by the number of outstanding shares in the Nest.
					</p>

					<p
						style={{ textAlign: 'left', fontSize: '1.25rem', fontWeight: 500 }}
					>
						Price
					</p>
					<p style={{ textAlign: 'left' }}>
						The Nest's market price is the price at which shares in the Nests
						can be bought or sold on the exchanges. The market price can
						fluctuate throughout the day as buyers and sellers interact with one
						another and trade. For this reason, at times the price can differ
						from the NAV, making it more convenient to buy or mint according to
						market fluctuations.
					</p>
				</ModalStack>
			</Modal.Body>
			<Modal.Footer></Modal.Footer>
		</Modal>
	)
}

const RedeemToChoice = styled(Form.Select)`
	background-color: ${(props) => props.theme.color.transparent[100]};
	color: ${(props) => props.theme.color.text[100]};
	border: none;
	border-radius: ${(props) => props.theme.borderRadius}px;
	height: 72px;

	&:active,
	&:focus {
		outline: none;
		box-shadow: none;
	}

	option {
		background-color: ${(props) => props.theme.color.secondary[400]};
	}
`

export const HeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: row;
	min-width: 6rem;
	font-size: ${(props) => props.theme.fontSize.xl};
	font-family: 'Rubik', sans-serif;
	font-weight: ${(props) => props.theme.fontWeight.strong};

	img {
		vertical-align: middle;
		height: 30px;
		width: 30px;
	}

	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin: 0px;
		margin-top: 0px;
		margin-inline: 0.5rem 0.5rem;
		margin-bottom: 0px;
		color: ${(props) => props.theme.color.text[100]};
		font-weight: ${(props) => props.theme.fontWeight.medium};
	}
`

export const CloseButton = styled.a`
	float: right;
	top: ${(props) => props.theme.spacing[3]}px;
	right: ${(props) => props.theme.spacing[4]}px;
	font-size: 1.5rem;
	position: absolute;
	color: ${(props) => props.theme.color.text[100]};
	&:hover {
		cursor: pointer;
	}
`

export const ModalStack = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	width: 100%;
`

export const LabelEnd = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
	width: 100%;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem !important;
	}
`

export const LabelStart = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: flex-start;
	width: 100%;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem !important;
	}
`

export const FeeLabel = styled.p`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 0.875rem;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	margin-bottom: 0px;

	@media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
		font-size: 0.75rem;
	}
`

export const LabelStack = styled.span`
	display: flex;
	align-items: flex-end;
	flex-direction: row;
`

export const MaxLabel = styled.span`
	color: ${(props) => props.theme.color.text[200]};
	font-size: 0.875rem;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	margin-bottom: 0px;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem;
	}
`

export const AssetLabel = styled.span`
	color: ${(props) => props.theme.color.text[100]};
	font-size: 0.875rem;
	font-weight: ${(props) => props.theme.fontWeight.medium};
	margin-inline-start: 0.25rem;
	margin-bottom: 0px;
	vertical-align: middle;

	@media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem;
	}
`

const ButtonStack = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const BalanceWrapper = styled(Row)`
	padding: 0.25rem;
`
