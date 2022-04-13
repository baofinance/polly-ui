import pollyIcon from 'assets/img/polly.svg'
import { CloseButton, NavButtons } from 'components/Button'
import { IconContainer, StyledIcon } from 'components/Icon'
import { SpinnerLoader } from 'components/Loader'
import { StatBlock } from 'components/Stats'
import useBao from 'hooks/base/useBao'
import useBlockDiff from 'hooks/base/useBlockDiff'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useFees from 'hooks/farms/useFees'
import useStakedBalance from 'hooks/farms/useStakedBalance'
import { useUserFarmInfo } from 'hooks/farms/useUserFarmInfo'
import React, { useCallback, useMemo, useState } from 'react'
import { Modal, ModalProps, Row } from 'react-bootstrap'
import { getContract } from 'utils/erc20'
import { Rewards, Stake, Unstake } from './Actions'
import { FarmWithStakedValue } from './FarmList'

type FarmModalProps = ModalProps & {
	farm: FarmWithStakedValue
	show: boolean
	onHide: () => void
}

export const FarmModal: React.FC<FarmModalProps> = ({ farm, show, onHide }) => {
	const operations = ['Stake', 'Unstake', 'Rewards']
	const [operation, setOperation] = useState(operations[0])
	const { pid } = farm
	const bao = useBao()

	const lpTokenAddress = farm.lpTokenAddress

	const lpContract = useMemo(() => {
		return getContract(bao, lpTokenAddress)
	}, [bao, lpTokenAddress])

	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(pid)

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered dialogClassName="modal-50h">
			<CloseButton onHide={hideModal} onClick={onHide} />
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{operation}{' '}
					{operation !== 'Rewards' ? (
						<>
							<IconContainer style={{ marginLeft: '10px' }}>
								<StyledIcon src={farm.iconA} />
								{farm.iconB !== null && <StyledIcon src={farm.iconB} />}
							</IconContainer>
						</>
					) : (
						<IconContainer style={{ marginLeft: '10px' }}>
							<StyledIcon src={pollyIcon} />
						</IconContainer>
					)}
				</Modal.Title>
			</Modal.Header>
			<NavButtons
				options={operations}
				active={operation}
				onClick={setOperation}
			/>
			{operation === 'Stake' && (
				<Stake
					lpContract={lpContract}
					lpTokenAddress={lpTokenAddress}
					pid={farm.pid}
					tokenName={farm.lpToken.toUpperCase()}
					poolType={farm.poolType}
					max={tokenBalance}
					pairUrl={farm.pairUrl}
					onHide={onHide}
				/>
			)}
			{operation === 'Unstake' && (
				<Unstake
					farm={farm}
					pid={farm.pid}
					tokenName={farm.lpToken.toUpperCase()}
					max={stakedBalance}
					pairUrl={farm.pairUrl}
					lpTokenAddress={farm.lpTokenAddress}
					onHide={onHide}
				/>
			)}
			{operation === 'Rewards' && <Rewards pid={farm.pid} />}
		</Modal>
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
			<CloseButton onHide={hideModal} onClick={onHide} />
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<p style={{ fontWeight: 700 }}>Fee Details</p>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ paddingTop: '0' }}>
				<p style={{ textAlign: 'center' }}><span role="img" aria-label="important">❗</span>BE AWARE OF WITHDRAWAL FEES<span role="img" aria-label="important">❗</span></p>
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
						<a href="https://docs.bao.finance/" target="_blank" rel="noopener noreferrer">
							docs
						</a>{' '}
						before using the farms so you are familiar with protocol risks and
						fees!
					</p>
				</Row>
			</Modal.Body>
		</Modal>
	)
}
