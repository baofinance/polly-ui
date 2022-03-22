import { Bao } from 'bao'
import React, { createContext, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Config from 'bao/lib/config'

export interface BaoContext {
	bao?: typeof Bao
}

export const Context = createContext<BaoContext>({
	bao: undefined,
})

declare global {
	interface Window {
		baosauce: any
		bao: any
		ethereum?: any
	}
}

const BaoProvider: React.FC = ({ children }) => {
	const wallet = useWeb3React()
	const { library, activate }: any = wallet
	const [bao, setBao] = useState<any>()

	// if (library) library.on('chainChanged', () => window.location.reload())

	window.bao = bao

	useEffect(() => {
		// const { ethereum: windowEth } = window
		// if (windowEth && !ethereum) {
		// 	// Check if user has connected to the webpage before
		// 	const mmWeb3 = new Web3Provider(windowEth)
		// 	mmWeb3.eth.getAccounts().then((accounts: string[]) => {
		// 		if (accounts.length > 0) activate('injected')
		// 	})
		// }

		const baoLib = new Bao(library, Config.networkId, {
			defaultConfirmations: 1,
			autoGasMultiplier: 1.05,
			defaultGas: '300000',
			defaultGasPrice: '20000000000',
			ethereumNodeTimeout: 10000,
		})
		setBao(baoLib)
		window.baosauce = baoLib
	}, [library])

	return <Context.Provider value={{ bao }}>{children}</Context.Provider>
}

export default BaoProvider
