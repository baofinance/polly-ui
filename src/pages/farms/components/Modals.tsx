import Loader from '@/components/Loader'
import Modal from '@/components/Modal'
import { FeeBlock } from '@/components/Stats'
import Typography from '@/components/Typography'
import useBlockDiff from '@/hooks/base/useBlockDiff'
import useContract from '@/hooks/base/useContract'
import useFees from '@/hooks/farms/useFees'
import useStakedBalance from '@/hooks/farms/useStakedBalance'
import { useUserFarmInfo } from '@/hooks/farms/useUserFarmInfo'
import type { Erc20 } from '@/typechain/index'
import Image from 'next/future/image'
import React, { useCallback, useState } from 'react'
import Actions from './Actions'
import { FarmWithStakedValue } from './FarmList'

type FarmModalProps = {
	farm: FarmWithStakedValue
	show: boolean
	onHide: () => void
}

const FarmModal: React.FC<FarmModalProps> = ({ farm, show, onHide }) => {
	const operations = ['Unstake']
	const [operation, setOperation] = useState(operations[0])
	const { pid } = farm

	const lpContract = useContract<Erc20>('Erc20', !farm ? null : farm.lpTokenAddress)

	const stakedBalance = useStakedBalance(pid)

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal isOpen={show} onDismiss={hideModal}>
			<Modal.Header
				onClose={hideModal}
				header={
					<>
						<Typography variant='xl' className='mr-1 inline-block font-semibold'>
							{operation}
						</Typography>
						{operation !== 'Rewards' ? (
							<>
								<Image className='z-10 inline-block select-none duration-200' src={farm.iconA} width={32} height={32} alt={farm.name} />
								{farm.iconB !== null && (
									<Image
										className='z-20 -ml-2 inline-block select-none duration-200'
										width={32}
										height={32}
										src={farm.iconB}
										alt={farm.name}
									/>
								)}
							</>
						) : (
							<Image
								className='z-10 inline-block select-none duration-200'
								src='/images/tokens/BAO.png'
								width={32}
								height={32}
								alt={farm.name}
							/>
						)}
					</>
				}
			/>
			<Actions
				farm={farm}
				pid={farm.pid}
				tokenName={farm.lpToken.toUpperCase()}
				max={stakedBalance}
				pairUrl={farm.pairUrl}
				lpTokenAddress={farm.lpTokenAddress}
				onHide={onHide}
				lpContract={lpContract}
				poolType={farm.poolType}
				operation={operation}
			/>
		</Modal>
	)
}

export default FarmModal

interface FeeModalProps {
	pid: number
	show: boolean
	onHide: () => void
}

export const FeeModal: React.FC<FeeModalProps> = ({ pid, show, onHide }) => {
	const userInfo = useUserFarmInfo(pid)
	const blockDiff = useBlockDiff(userInfo)
	const fees = useFees(blockDiff)
	const lastInteraction = blockDiff && new Date(new Date().getTime() - 1000 * (blockDiff * 3)).toLocaleString()

	const hideModal = useCallback(() => {
		onHide()
	}, [onHide])

	return (
		<Modal isOpen={show} onDismiss={hideModal}>
			<Modal.Header header='Fee Details' onBack={hideModal} />
			<Modal.Body>
				<Typography className='mb-2 text-center'>
					<span role='img' aria-label='important'>
						❗
					</span>
					BE AWARE OF WITHDRAWAL FEES
					<span role='img' aria-label='important'>
						❗
					</span>
				</Typography>
				<FeeBlock
					label=''
					stats={[
						{
							label: 'Current Fee:',
							value: `${fees ? `${(fees * 100).toFixed(2)}%` : <Loader />}`,
						},
						{
							label: 'Last interaction:',
							value: `
						${lastInteraction ? lastInteraction.toString() : <Loader />}
						`,
						},
						{
							label: 'Blocks passed:',
							value: `${blockDiff ? blockDiff : <Loader />}`,
						},
						{
							label: 'Last withdraw block:',
							value: `
						${userInfo ? userInfo.lastWithdrawBlock.eq(0) ? 'Never Withdrawn' : userInfo.lastWithdrawBlock.toNumber() : <Loader />}
						`,
						},
					]}
				/>
				<Typography variant='p' className='mt-2'>
					Your first deposit activates and each withdraw resets the timer for penalities and fees, this is pool based. Be sure to read the{' '}
					<a
						href='https://info.bao.finance/docs/franchises/polly'
						target='_blank'
						rel='noopener noreferrer'
						className='font-semibold hover:text-pollyGreen'
					>
						docs
					</a>{' '}
					before using the farms so you are familiar with protocol risks and fees!
				</Typography>
			</Modal.Body>
		</Modal>
	)
}
