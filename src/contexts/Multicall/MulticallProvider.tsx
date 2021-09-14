import React, { createContext, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import useBao from '../../hooks/useBao'
import { Multicall } from 'ethereum-multicall'

export interface MulticallContext {
	multicall?: Multicall
}

export const Context = createContext<MulticallContext>({
	multicall: undefined,
})

const MulticallProvider: React.FC = ({ children }) => {
	const { ethereum, account } = useWallet()
	const bao = useBao()
	const [multicall, setMulticall] = useState<Multicall | undefined>()

	useEffect(() => {
		if (!(ethereum && bao && bao.web3)) return

		setMulticall(new Multicall({ web3Instance: bao.web3, tryAggregate: true }))
	}, [ethereum, account, bao])

	return <Context.Provider value={{ multicall }}>{children}</Context.Provider>
}

export default MulticallProvider
