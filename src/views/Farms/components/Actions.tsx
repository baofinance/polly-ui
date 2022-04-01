import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import baoIcon from 'assets/img/logo.svg'
import Config from 'bao/lib/config'
import { approvev2, getMasterChefContract, getRefUrl } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SubmitButton } from 'components/Button/Button'
import ExternalLink from 'components/ExternalLink'
import { SpinnerLoader } from 'components/Loader'
import TokenInput from 'components/TokenInput'
import { PoolType } from 'contexts/Farms/types'
import { ethers } from 'ethers'
import useAllowance from 'hooks/base/useAllowance'
import useApprove from 'hooks/base/useApprove'
import useBao from 'hooks/base/useBao'
import useBlockDiff from 'hooks/base/useBlockDiff'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import useEarnings from 'hooks/farms/useEarnings'
import useFees from 'hooks/farms/useFees'
import useStakedBalance from 'hooks/farms/useStakedBalance'
import { useUserFarmInfo } from 'hooks/farms/useUserFarmInfo'
import { default as React, useCallback, useMemo, useState } from 'react'
import { Col, Modal, ModalBody, Row } from 'react-bootstrap'
import styled from 'styled-components'
import {
	exponentiate,
	getDisplayBalance,
	getFullDisplayBalance,
} from 'utils/numberFormat'
import { QuestionIcon } from 'views/Nest/components/styles'
import { Contract } from 'web3-eth-contract'
import { FarmWithStakedValue } from './FarmList'
import { FeeModal } from './Modals'

interface RewardsProps {
	pid: number
}

export const Rewards: React.FC<RewardsProps> = ({ pid }) => {
	const bao = useBao()
	const earnings = useEarnings(pid)
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()
	const masterChefContract = getMasterChefContract(bao)

	return (
		<>
			<FarmModalBody>
				<EarningsWrapper>
					<BalanceContent>
						<BalanceImage>
							<img src={baoIcon} />
						</BalanceImage>
						<BalanceSpacer />
						<BalanceText>
							<BalanceValue>{getDisplayBalance(earnings)}</BalanceValue>
						</BalanceText>
					</BalanceContent>
				</EarningsWrapper>
			</FarmModalBody>
			<Modal.Footer>
				<ButtonStack>
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
								disabled={!earnings.toNumber()}
								onClick={async () => {
									let harvestTx

									harvestTx = masterChefContract.methods
										.claimReward(pid)
										.send({ from: account })

									handleTx(
										harvestTx,
										`Harvest ${getDisplayBalance(earnings)} POLLY`,
									)
								}}
							>
								Harvest POLLY
							</SubmitButton>
						)}
					</>
				</ButtonStack>
			</Modal.Footer>
		</>
	)
}

interface FarmListItemProps {
	farm: FarmWithStakedValue
	operation: string
}

interface StakeProps {
	lpContract: Contract
	lpTokenAddress: string
	pid: number
	max: BigNumber
	tokenName?: string
	poolType: PoolType
	ref?: string
	pairUrl: string
	onHide?: () => void
}

export const Stake: React.FC<StakeProps> = ({
	lpContract,
	lpTokenAddress,
	pid,
	poolType,
	max,
	tokenName = '',
	ref = '',
	pairUrl = '',
	onHide,
}) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const [val, setVal] = useState('')
	const { pendingTx, handleTx } = useTransactionHandler()

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
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

	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(lpContract)
	const { onApprove } = useApprove(lpContract)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	const masterChefContract = getMasterChefContract(bao)

	return (
		<>
			<FarmModalBody>
				<BalanceWrapper>
					<Col xs={4}>
						<LabelStart>
							<MaxLabel>Fee:</MaxLabel>
							<AssetLabel>0.75%</AssetLabel>
						</LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<MaxLabel>Balance:</MaxLabel>
								<AssetLabel>
									{fullBalance}{' '}
									<ExternalLink href={pairUrl}>
										{' '}
										{tokenName}{' '}
										<FontAwesomeIcon
											icon="external-link-alt"
											style={{ height: '.75rem' }}
										/>
									</ExternalLink>
								</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</BalanceWrapper>
				<Row>
					<Col xs={12}>
						<TokenInput
							onSelectMax={handleSelectMax}
							onSelectHalf={handleSelectHalf}
							onChange={handleChange}
							value={val}
							max={fullBalance}
							symbol={tokenName}
						/>
					</Col>
				</Row>
			</FarmModalBody>
			<Modal.Footer>
				<ButtonStack>
					{!allowance.toNumber() ? (
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
									disabled={requestedApproval}
									onClick={async () => {
										handleTx(
											approvev2(lpContract, masterChefContract, account),
											`Approve ${tokenName}`,
										)
									}}
								>
									Approve {tokenName}
								</SubmitButton>
							)}
						</>
					) : (
						<>
							{poolType !== PoolType.ARCHIVED ? (
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
												!val ||
												!bao ||
												isNaN(val as any) ||
												parseFloat(val) > max.toNumber()
											}
											onClick={async () => {
												let stakeTx

												stakeTx = masterChefContract.methods
													.deposit(
														pid,
														ethers.utils.parseUnits(val.toString(), 18),
														getRefUrl(),
													)
													.send({ from: account })

												handleTx(
													stakeTx,
													`Deposit ${parseFloat(val).toFixed(4)} ${tokenName}`,
												)
											}}
										>
											Deposit {tokenName}
										</SubmitButton>
									)}
								</>
							) : (
								<SubmitButton
									disabled={true}
									onClick={async () => {
										let stakeTx

										stakeTx = masterChefContract.methods
											.deposit(
												pid,
												ethers.utils.parseUnits(val.toString(), 18),
												getRefUrl(),
											)
											.send({ from: account })
										handleTx(
											stakeTx,
											`Deposit ${parseFloat(val).toFixed(4)} ${tokenName}`,
										)
									}}
								>
									Pool Archived
								</SubmitButton>
							)}
						</>
					)}
				</ButtonStack>
			</Modal.Footer>
		</>
	)
}

interface UnstakeProps {
	farm: FarmWithStakedValue
	max: BigNumber
	tokenName?: string
	pid: number
	ref?: string
	pairUrl: string
	lpTokenAddress: string
	onHide?: () => void
}

export const Unstake: React.FC<UnstakeProps> = ({
	farm,
	max,
	tokenName = '',
	pid = null,
	ref = '',
	pairUrl = '',
	lpTokenAddress = '',
	onHide,
}) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const [val, setVal] = useState('')
	const { pendingTx, handleTx } = useTransactionHandler()

	const stakedBalance = useStakedBalance(pid)

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
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

	const userInfo = useUserFarmInfo(pid)
	const blockDiff = useBlockDiff(userInfo)
	const fees = useFees(blockDiff)

	const masterChefContract = getMasterChefContract(bao)

	const [showFeeModal, setShowFeeModal] = useState(false)

	return (
		<>
			<FarmModalBody>
				<BalanceWrapper>
					<Col xs={4}>
						<LabelStart>
							<LabelStack>
								<MaxLabel>Fee:</MaxLabel>{' '}
								<AssetLabel>
									{fees ? `${(fees * 100).toFixed(2)}%` : <SpinnerLoader />}{' '}
									<span>
										<QuestionIcon
											icon="question-circle"
											onClick={() => setShowFeeModal(true)}
										/>
									</span>
								</AssetLabel>
							</LabelStack>
						</LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<MaxLabel>Balance:</MaxLabel>
								<AssetLabel>
									{fullBalance}{' '}
									<ExternalLink href={pairUrl}>
										{' '}
										{tokenName}{' '}
										<FontAwesomeIcon
											icon="external-link-alt"
											style={{ height: '.75rem' }}
										/>
									</ExternalLink>
								</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</BalanceWrapper>
				<Row>
					<Col xs={12}>
						<TokenInput
							onSelectMax={handleSelectMax}
							onSelectHalf={handleSelectHalf}
							onChange={handleChange}
							value={val}
							max={fullBalance}
							symbol={tokenName}
						/>
					</Col>
				</Row>
			</FarmModalBody>
			<Modal.Footer>
				<ButtonStack>
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
									!val ||
									!bao ||
									isNaN(val as any) ||
									parseFloat(val) > parseFloat(fullBalance) ||
									stakedBalance.eq(new BigNumber(0))
								}
								onClick={async () => {
									let unstakeTx

									const amount =
										val && isNaN(val as any)
											? exponentiate(val, 18)
											: new BigNumber(0).toFixed(4)

									unstakeTx = masterChefContract.methods
										.withdraw(
											pid,
											ethers.utils.parseUnits(val, 18),
											getRefUrl(),
										)
										.send({ from: account })

									handleTx(unstakeTx, `Withdraw ${amount} ${tokenName}`)
								}}
							>
								Withdraw {tokenName}
							</SubmitButton>
						)}
					</>
				</ButtonStack>
			</Modal.Footer>
			<FeeModal
				pid={pid}
				show={showFeeModal}
				onHide={() => setShowFeeModal(false)}
			/>
		</>
	)
}

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

const FarmModalBody = styled(ModalBody)`
	height: 120px;
`

const EarningsWrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`

const BalanceContent = styled.div`
	-webkit-box-align: center;
	align-items: center;
	display: flex;
`

const BalanceImage = styled.div`
	display: flex;
	-webkit-box-pack: center;
	justify-content: center;
	min-width: 48px;
	min-height: 48px;
	border-radius: 40px;
	background-color: ${(props) => props.theme.color.primary[200]};

	img {
		height: 34px;
		text-align: center;
		min-width: 34px;
		margin: auto;
	}
`

const BalanceSpacer = styled.div`
	height: 8px;
	min-height: 8px;
	min-width: 8px;
	width: 8px;
`

const BalanceText = styled.div`
	display: block;
	flex: 1 1 0%;
`

const BalanceValue = styled.div`
	font-size: 24px;
	font-weight: 700;
`
