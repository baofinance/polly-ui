import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import pollyIcon from 'assets/img/polly.svg'
import { NavButtons } from 'components/Button'
import ExternalLink from 'components/ExternalLink'
import { SpinnerLoader } from 'components/Loader'
import { StatBlock } from 'components/Stats'
import useBao from 'hooks/base/useBao'
import useBlockDiff from 'hooks/base/useBlockDiff'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import useFees from 'hooks/farms/useFees'
import useStakedBalance from 'hooks/farms/useStakedBalance'
import { useUserFarmInfo } from 'hooks/farms/useUserFarmInfo'
import React, { useCallback, useMemo, useState } from 'react'
import { Modal, ModalProps, Row } from 'react-bootstrap'
import { getContract } from 'utils/erc20'
import { provider } from 'web3-core'
import { Rewards, Stake, Unstake } from './Actions'
import { FarmIcon, FarmIconContainer, FarmWithStakedValue } from './FarmList'
import { CloseButton, HeaderWrapper } from './styles'

type FarmModalProps = ModalProps & {
	farm: FarmWithStakedValue
	show: boolean
	onHide: () => void
}

export const FarmModal: React.FC<FarmModalProps> = ({ farm, show, onHide }) => {
	const operations = ['Stake', 'Unstake', 'Rewards']
	const [operation, setOperation] = useState(operations[0])
	const { pid } = farm
	const [val, setVal] = useState<string>('')
	const bao = useBao()
	const { account, library } = useWeb3React()
	const { txSuccess } = useTransactionHandler()

	const lpTokenAddress = farm.lpTokenAddress

	const lpContract = useMemo(() => {
		return getContract(library as provider, lpTokenAddress)
	}, [library, lpTokenAddress])

	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(pid)

	const handleChange = useCallback(
		(e: React.FormEvent<HTMLInputElement>) => {
			if (e.currentTarget.value.length < 20) setVal(e.currentTarget.value)
		},
		[setVal],
	)

	const hideModal = useCallback(() => {
		onHide()
		setVal('')
	}, [onHide])

	return (
		<Modal show={show} onHide={hideModal} centered dialogClassName="modal-50h">
			<CloseButton onClick={onHide}>
				<FontAwesomeIcon icon="times" />
			</CloseButton>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<HeaderWrapper>
						{operation}{' '}
						{operation !== 'Rewards' ? (
							<>
								<FarmIconContainer style={{ marginLeft: '10px' }}>
									<FarmIcon src={farm.iconA} />
									{farm.iconB !== null && <FarmIcon src={farm.iconB} />}
								</FarmIconContainer>
							</>
						) : (
							<FarmIconContainer style={{ marginLeft: '10px' }}>
								<FarmIcon src={pollyIcon} />
							</FarmIconContainer>
						)}
					</HeaderWrapper>
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
