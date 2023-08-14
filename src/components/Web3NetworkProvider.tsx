import { createWeb3ReactRoot } from '@web3-react/core'
import { FC, PropsWithChildren } from 'react'

interface Web3NetworkProviderProps {
	children: any
	getLibrary: any
}

const Web3ReactRoot = createWeb3ReactRoot('network')

export const Web3NetworkProvider: FC<PropsWithChildren<Web3NetworkProviderProps>> = ({ getLibrary, children }) => {
	return <Web3ReactRoot getLibrary={getLibrary}>{children}</Web3ReactRoot>
}

export default Web3NetworkProvider
