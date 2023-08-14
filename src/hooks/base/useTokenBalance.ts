import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { useQuery } from '@tanstack/react-query'
import useContract from '@/hooks/base/useContract'
import { useBlockUpdater } from './useBlock'
import { useTxReceiptUpdater } from './useTransactionProvider'
import { providerKey } from '@/utils/index'
import type { Erc20 } from '@/typechain/index'

export const useEthBalance = () => {
	const { library, chainId, account } = useWeb3React<Web3Provider>()
	const enabled = !!library && !!chainId && !!account
	const { data: balance, refetch } = useQuery(
		['@/hooks/base/useEthBalance', providerKey(library, account, chainId), { enabled }],
		async () => {
			return await library.getBalance(account)
		},
		{
			enabled,
			placeholderData: BigNumber.from(0),
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return balance ?? BigNumber.from(0)
}

const useTokenBalance = (tokenAddress: string) => {
	const { library, chainId, account } = useWeb3React<Web3Provider>()
	const contract = useContract<Erc20>('Erc20', tokenAddress)
	const enabled = !!chainId && !!account && !!contract
	const { data: balance, refetch } = useQuery(
		['@/hooks/base/useTokenBalance', providerKey(library, account, chainId), { enabled, tokenAddress }],
		async () => {
			const _balance = await contract.balanceOf(account)
			return _balance
		},
		{
			enabled,
			placeholderData: BigNumber.from(0),
		},
	)

	const _refetch = () => {
		if (enabled) refetch()
	}
	useTxReceiptUpdater(_refetch)
	useBlockUpdater(_refetch, 10)

	return balance ?? BigNumber.from(0)
}

export default useTokenBalance
