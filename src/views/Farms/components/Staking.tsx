import BigNumber from 'bignumber.js'
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
import React, { useCallback, useMemo, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { getContract } from 'utils/erc20'
import { getFullDisplayBalance } from 'utils/numberFormat'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { FarmWithStakedValue } from './FarmList'
import { AccordionCard } from './styles'
import { BalanceInput } from 'components/Input'
import { Button } from 'components/Button'

interface FarmListItemProps {
	farm: FarmWithStakedValue
	operation: string
}

export const Staking: React.FC<FarmListItemProps> = ({ farm, operation }) => {
	const { account, library } = useWeb3React()
	const { pid } = farm
	const bao = useBao()

	const lpTokenAddress = farm.lpTokenAddress

	const lpContract = useMemo(() => {
		return getContract(library as provider, lpTokenAddress)
	}, [library, lpTokenAddress])

	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(pid)

	const { onStake } = useStake(pid)
	const { onUnstake } = useUnstake(pid)

	return (
		<>
			{operation === 'Unstake' ? (
				<Unstake
					pid={farm.pid}
					tokenName={farm.lpToken.toUpperCase()}
					max={stakedBalance}
					onConfirm={onUnstake}
				/>
			) : (
				<Stake
					lpContract={lpContract}
					lpTokenAddress={lpTokenAddress}
					pid={farm.pid}
					tokenName={farm.lpToken.toUpperCase()}
					poolType={farm.poolType}
					max={tokenBalance}
					onConfirm={onStake}
				/>
			)}
		</>
	)
}

interface StakeProps {
	lpContract: Contract
	lpTokenAddress: string
	pid: number
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
	poolType: PoolType
}

const Stake: React.FC<StakeProps> = ({
	lpContract,
	lpTokenAddress,
	pid,
	poolType,
	max,
	onConfirm,
	tokenName = '',
}) => {
	const bao = useBao()
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

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

	return (
		<AccordionCard>
			<Card.Body>
				<Row>
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
								<AssetLabel>{`${fullBalance} ${tokenName}`}</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<BalanceInput
							onMaxClick={handleSelectMax}
							onChange={handleChange}
							value={val}
						/>
					</Col>
				</Row>
			</Card.Body>
			<Card.Footer>
				{!allowance.toNumber() ? (
					<Button
						disabled={requestedApproval}
						onClick={handleApprove}
						text={`Approve ${tokenName}`}
					/>
				) : (
					<>
						{poolType !== PoolType.ARCHIVED ? (
							<Button
								disabled={
									!val ||
									!bao ||
									isNaN(val as any) ||
									parseFloat(val) > max.toNumber() ||
									pendingTx
								}
								text={pendingTx ? 'Pending Confirmation' : 'Deposit'}
								onClick={async () => {
									setPendingTx(true)
									await onConfirm(val)
									setPendingTx(false)
								}}
							/>
						) : (
							<Button
								disabled={true}
								text={'Pool Archived'}
								onClick={async () => {
									setPendingTx(true)
									await onConfirm(val)
									setPendingTx(false)
								}}
							/>
						)}
					</>
				)}
			</Card.Footer>
		</AccordionCard>
	)
}

interface UnstakeProps {
	max: BigNumber
	onConfirm: (amount: string) => void
	tokenName?: string
	pid: number
}

const Unstake: React.FC<UnstakeProps> = ({
	onConfirm,
	max,
	tokenName = '',
	pid = null,
}) => {
	const bao = useBao()
	const [val, setVal] = useState('')
	const [pendingTx, setPendingTx] = useState(false)

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

	return (
		<AccordionCard>
			<Card.Body>
				<Row>
					<Col xs={4}>
						<LabelStart>
							<MaxLabel>Fee:</MaxLabel>
							<AssetLabel>
								{fees ? `${(fees * 100).toFixed(2)}%` : <SpinnerLoader />}
							</AssetLabel>
						</LabelStart>
					</Col>
					<Col xs={8}>
						<LabelEnd>
							<LabelStack>
								<MaxLabel>Balance:</MaxLabel>
								<AssetLabel>{`${fullBalance} ${tokenName}`}</AssetLabel>
							</LabelStack>
						</LabelEnd>
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						<BalanceInput
							onMaxClick={handleSelectMax}
							onChange={handleChange}
							value={val}
						/>
					</Col>
				</Row>{' '}
			</Card.Body>
			<Card.Footer>
				<Button
					disabled={
						!val ||
						!bao ||
						isNaN(val as any) ||
						parseFloat(val) > parseFloat(fullBalance) ||
						stakedBalance.eq(new BigNumber(0)) ||
						pendingTx
					}
					text={pendingTx ? 'Pending Confirmation' : 'Withdraw'}
					onClick={async () => {
						setPendingTx(true)
						await onConfirm(val)
						setPendingTx(false)
					}}
				/>
			</Card.Footer>
		</AccordionCard>
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

export const LabelStack = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
`

export const MaxLabel = styled.p`
  color: ${(props) => props.theme.color.text[200]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem;
	}
`

export const AssetLabel = styled.p`
  color: ${(props) => props.theme.color.text[100]};
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  margin-inline-start: 0.25rem;
  margin-bottom: 0px;

  @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
		font-size: 0.75rem;
	}
`

