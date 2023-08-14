import { Bao } from '@/bao/Bao'
import { getNetworkConnector } from '@/bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from '@/bao/lib/hooks'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'
import { useWeb3React } from '@web3-react/core'
import React, { createContext, PropsWithChildren, useEffect } from 'react'
import { useBlock } from './useBlock'

export interface BaoContext {
	bao: Bao
	block: number
}

interface BaoProviderProps {
	children: React.ReactNode
}

export const BaoContext = createContext<BaoContext>({
	bao: null,
	block: 0,
})

const BaoProvider: React.FC<PropsWithChildren<BaoProviderProps>> = ({ children }) => {
	const { library, account, chainId, active, activate, error } = useWeb3React()

	const triedEager = useEagerConnect()

	useInactiveListener(!triedEager)

	const block = useBlock()

	// always activate the http rpc backup
	useEffect(() => {
		if (triedEager && !active && !error) {
			activate(getNetworkConnector())
		}
	}, [activate, active, triedEager, error])

	const { data: bao } = useQuery(
		['@/contexts/BaoProvider/bao', providerKey(library, account, chainId)],
		async () => {
			return new Bao(library)
		},
		{
			enabled: !!library && active && !!chainId,
			staleTime: Infinity,
			cacheTime: Infinity,
			networkMode: 'always',
		},
	)

	// Wait for a valid baolib and web3 library with chain connection
	if (bao && library && chainId) {
		return <BaoContext.Provider value={{ bao, block }}>{children}</BaoContext.Provider>
	} else {
		return null
	}
}

export default BaoProvider
