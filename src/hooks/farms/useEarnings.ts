import { BigNumber } from 'ethers'
import { useWeb3React } from '@web3-react/core'
import useContract from '@/hooks/base/useContract'
import type { Masterchef } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

const useEarnings = (pid: number) => {
	const { library, account, chainId } = useWeb3React()
	const Masterchef = useContract<Masterchef>('masterChef')

	const enabled = !!account && !!Masterchef
	const { data: balance, refetch } = useQuery(
		['@/hooks/farms/useEarnings', providerKey(library, account, chainId), { enabled, pid }],
		async () => {
			const _balance = await Masterchef.pendingReward(pid, account)
			return _balance
		},
		{
			enabled,
			placeholderData: BigNumber.from('0'),
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return balance
}

export default useEarnings
