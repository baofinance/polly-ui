import { useWeb3React } from '@web3-react/core'
import useContract from '@/hooks/base/useContract'
import type { Masterchef } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

export const useUserFarmInfo = (pid: number) => {
	const { library, account, chainId } = useWeb3React()
	const Masterchef = useContract<Masterchef>('masterChef')

	const enabled = !!account && !!Masterchef
	const { data: userInfo, refetch } = useQuery(
		['@/hooks/farms/useUserFarmInfo', providerKey(library, account, chainId), { enabled, pid }],
		async () => {
			const _userInfo = await Masterchef.userInfo(pid, account)
			return _userInfo
		},
		{
			enabled,
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return userInfo
}

export default useUserFarmInfo
