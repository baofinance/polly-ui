import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import useContract from '@/hooks/base/useContract'
import type { Polly } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

const useLockedEarnings = () => {
	const { library, account, chainId } = useWeb3React()
	const baoContract = useContract<Polly>('Polly')

	const enabled = !!account && !!baoContract
	const { data: balance, refetch } = useQuery(
		['@/hooks/farms/useLockedEarnings', providerKey(library, account, chainId), { enabled }],
		async () => {
			const _balance = await baoContract.lockOf(account)
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

export default useLockedEarnings
