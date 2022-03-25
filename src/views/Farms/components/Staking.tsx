import BigNumber from 'bignumber.js'
import Config from 'bao/lib/config'
import Label from 'components/Label'
import { SpinnerLoader } from 'components/Loader'
import { PoolType } from 'contexts/Farms/types'
import useAllowance from 'hooks/base/useAllowance'
import useApprove from 'hooks/base/useApprove'
import useBao from 'hooks/base/useBao'
import useBlockDiff from 'hooks/base/useBlockDiff'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useFees from 'hooks/farms/useFees'
import useStake from 'hooks/farms/useStake'
import useStakedBalance from 'hooks/farms/useStakedBalance'
import useUnstake from 'hooks/farms/useUnstake'
import { useUserFarmInfo } from 'hooks/farms/useUserFarmInfo'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, Col, Modal, ModalBody, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { getContract } from 'utils/erc20'
import {
	decimate,
	exponentiate,
	getDisplayBalance,
	getFullDisplayBalance,
} from 'utils/numberFormat'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { FarmWithStakedValue } from './FarmList'
import { BalanceInput } from 'components/Input'
import { Button } from 'components/Button'
import { SubmitButton } from 'components/Button/Button'
import ExternalLink from 'components/ExternalLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import { approvev2, getMasterChefContract } from 'bao/utils'
import { ethers } from 'ethers'
import { size } from 'lodash'
import Tooltipped from 'components/Tooltipped'
import { QuestionIcon } from 'views/Nest/components/styles'
import { FeeModal } from './Harvest'
import Multicall from 'utils/multicall'
import useAllFarmTVL from 'hooks/farms/useAllFarmTVL'

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
}

export const Stake: React.FC<StakeProps> = ({
	lpContract,
	lpTokenAddress,
	pid,
	poolType,
	max,
	tokenName = '',
	ref = '0x0000000000000000000000000000000000000000',
	pairUrl = '',
}) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const [val, setVal] = useState('')
	const { pendingTx, handleTx } = useTransactionHandler()

	const fullBalance = useMemo(() => {
		return getFullDisplayBalance(max)
	}, [max])

	const walletBalance = useTokenBalance(lpTokenAddress)

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const handleSelectMax = useCallback(() => {
		setVal(fullBalance)
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
						<BalanceInput
							onMaxClick={handleSelectMax}
							onChange={handleChange}
							value={val}
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
														ref,
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
												ref,
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
}

export const Unstake: React.FC<UnstakeProps> = ({
	farm,
	max,
	tokenName = '',
	pid = null,
	ref = '0x0000000000000000000000000000000000000000',
	pairUrl = '',
	lpTokenAddress = '',
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
						<BalanceInput
							onMaxClick={handleSelectMax}
							onChange={handleChange}
							value={val}
						/>
					</Col>
				</Row>{' '}
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
										.withdraw(pid, ethers.utils.parseUnits(val, 18), ref)
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
