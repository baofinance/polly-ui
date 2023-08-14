import { useWeb3React } from '@web3-react/core'
import useContract from '@/hooks/base/useContract'
import type { Masterchef } from '@/typechain/index'
import useFarms from './useFarms'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

const useAllEarnings = () => {
	const { library, account, chainId } = useWeb3React()
	const farms = useFarms()
	const Masterchef = useContract<Masterchef>('masterChef')

	const enabled = !!account && !!farms && !!Masterchef
	const pids = farms.map(farm => farm.pid)
	const { data: balances, refetch } = useQuery(
		['@/hooks/farms/useAllEarnings', providerKey(library, account, chainId), { enabled, pids }],
		async () => {
			const _balances = farms.map(({ pid }) => Masterchef.pendingReward(pid, account))
			return await Promise.all(_balances)
		},
		{
			enabled,
			placeholderData: [],
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return balances
}

export default useAllEarnings
