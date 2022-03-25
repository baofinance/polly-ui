import Config from 'bao/lib/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baoIcon from 'assets/img/logo.svg'
import { getMasterChefContract } from 'bao/utils'
import { Button } from 'components/Button'
import { SubmitButton } from 'components/Button/Button'
import ExternalLink from 'components/ExternalLink'
import Label from 'components/Label'
import { SpinnerLoader } from 'components/Loader'
import Tooltipped from 'components/Tooltipped'
import Value from 'components/Value'
import useBao from 'hooks/base/useBao'
import useBlockDiff from 'hooks/base/useBlockDiff'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import useEarnings from 'hooks/farms/useEarnings'
import useFees from 'hooks/farms/useFees'
import useLockedEarnings from 'hooks/farms/useLockedEarnings'
import useReward from 'hooks/farms/useReward'
import { useUserFarmInfo } from 'hooks/farms/useUserFarmInfo'
import React, { useCallback, useState } from 'react'
import { Card, Col, Modal, ModalBody, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { getDisplayBalance } from 'utils/numberFormat'
import { AccordionCard, CloseButton, HeaderWrapper } from './styles'
import { useWeb3React } from '@web3-react/core'
import { StatBlock } from 'components/Stats'

interface HarvestProps {
	pid: number
	operation: string
}

interface EarningsProps {
	pid: number
}

export const Earnings: React.FC<EarningsProps> = ({ pid }) => {
	const bao = useBao()
	const earnings = useEarnings(pid)
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()
	const masterChefContract = getMasterChefContract(bao)

	return (
		<>
			<FarmModalBody>
				<BalanceWrapper>
					<BalanceContent>
						<BalanceImage>
							<img src={baoIcon} />
						</BalanceImage>
						<BalanceSpacer />
						<BalanceText>
							<BalanceValue>{getDisplayBalance(earnings)}</BalanceValue>
						</BalanceText>
					</BalanceContent>
				</BalanceWrapper>
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

interface FeeModalProps {
	pid: number
	show: boolean
	onHide: () => void
}

export const FeeModal: React.FC<FeeModalProps> = ({ pid, show, onHide }) => {
	const userInfo = useUserFarmInfo(pid)
	const blockDiff = useBlockDiff(userInfo)
	const fees = useFees(blockDiff)
	const lastInteraction =
		blockDiff &&
		new Date(new Date().getTime() - 1000 * (blockDiff * 3)).toLocaleString()

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
						<p style={{ fontWeight: 700 }}>Fee Details</p>
					</HeaderWrapper>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ paddingTop: '0' }}>
				<p style={{ textAlign: 'center' }}>❗BE AWARE OF WITHDRAWAL FEES❗</p>
				<StatBlock
					label=""
					stats={[
						{
							label: 'Current Fee:',
							value: `${
								fees ? `${(fees * 100).toFixed(2)}%` : <SpinnerLoader />
							}`,
						},
						{
							label: 'Last interaction:',
							value: `
						${lastInteraction ? lastInteraction.toString() : <SpinnerLoader />}
						`,
						},
						{
							label: 'Blocks passed:',
							value: `${blockDiff ? blockDiff : <SpinnerLoader />}`,
						},
						{
							label: 'Last withdraw block:',
							value: `
						${
							userInfo ? (
								userInfo.lastWithdrawBlock === '0' ? (
									'Never Withdrawn'
								) : (
									userInfo.lastWithdrawBlock
								)
							) : (
								<SpinnerLoader />
							)
						}
						`,
						},
					]}
				/>
				<Row>
					<p style={{ textAlign: 'center' }}>
						Your first deposit activates and each withdraw resets the timer for
						penalities and fees, this is pool based. Be sure to read the{' '}
						<ExternalLink href="https://docs.bao.finance/" target="_blank">
							docs
						</ExternalLink>{' '}
						before using the farms so you are familiar with protocol risks and
						fees!
					</p>
				</Row>
			</Modal.Body>
		</Modal>
	)
}

const BalancesContainer = styled(Col)`
	display: flex;
	padding: 24px;
`

const BalancesWrapper = styled.div`
	display: flex;
	width: 100%;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
`

const BalanceContainer = styled.div`
	flex: 1 1 0%;
	display: block;
`

const BalanceWrapper = styled.div`
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

const BalanceSpacerBig = styled.div`
	height: 24px;
	min-height: 24px;
	min-width: 24px;
	width: 24px;
`

const BalanceText = styled.div`
	display: block;
	flex: 1 1 0%;
`

const BalanceValue = styled.div`
	font-size: 24px;
	font-weight: 700;
`

const ButtonStack = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`

const FeeWrapper = styled(Row)`
	background: ${(props) => props.theme.color.transparent[100]};
	border-radius: ${(props) => props.theme.borderRadius}px;
	padding: 1rem;
`

const FarmModalBody = styled(ModalBody)`
	height: 120px;
`
