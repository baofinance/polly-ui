import React, { useCallback, useMemo, useState } from 'react'
import { NavButtons } from 'components/Button'
import { BalanceInput } from 'components/Input'
import { Modal, ModalProps } from 'react-bootstrap'
import useBao from 'hooks/base/useBao'
import BigNumber from 'bignumber.js'
import {
	HeaderWrapper,
	ModalStack,
	InputStack,
	LabelFlex,
	LabelStack,
	MaxLabel,
	AssetLabel,
	AssetStack,
	IconFlex,
	CloseButton,
} from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FarmIcon, FarmIconContainer, FarmWithStakedValue } from './FarmList'
import { Stake, Unstake } from './Staking'
import { Earnings } from './Harvest'
import { getContract } from 'utils/erc20'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useStakedBalance from 'hooks/farms/useStakedBalance'
import { provider } from 'web3-core'
import pollyIcon from 'assets/img/polly.svg'

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
									<FarmIcon src={farm.iconB} />
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
				/>
			)}
			{operation === 'Rewards' && <Earnings pid={farm.pid} />}
		</Modal>
	)
}
