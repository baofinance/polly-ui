import { useWeb3React } from '@web3-react/core'
import useContract from '@/hooks/base/useContract'
import type { Erc20 } from '@/typechain/index'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

const useAllowance = (tokenAddress: string, spenderAddress: string) => {
	const { library, chainId, account } = useWeb3React()
	const contract = useContract<Erc20>('Erc20', tokenAddress)

	const enabled = !!account && !!contract
	const { data: allowance, refetch } = useQuery(
		['@/hooks/base/useAllowance', providerKey(library, account, chainId), contract?.address, spenderAddress],
		async () => {
			const _allowance = await contract.allowance(account, spenderAddress)
			return _allowance
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

	return allowance
}

export default useAllowance
