import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import { ActiveSupportedNest } from '../../bao/lib/types'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useTxReceiptUpdater } from '@/hooks/base/useTransactionProvider'
import { useBlockUpdater } from '@/hooks/base/useBlock'

export type NestInfo = {
	totalSupply: BigNumber
}

const useNestInfo = (nest: ActiveSupportedNest): NestInfo => {
	const { library, account, chainId } = useWeb3React()

	const enabled = !!library && !!nest && !!nest.nestContract
	const { data: nestInfo, refetch } = useQuery(
		['@/hooks/nests/useNestInfo', providerKey(library, account, chainId), { enabled, nid: nest.nid }],
		async () => {
			const supply = await nest.nestContract.totalSupply()
			return {
				totalSupply: supply,
			}
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

	return nestInfo
}

export default useNestInfo
