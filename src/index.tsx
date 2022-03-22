import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { provider } from 'web3-core'
import App from './App'

function getLibrary(provider: provider) {
	return new Web3(provider)
}

const Web3ReactProviderReloaded = createWeb3ReactRoot('network')

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ReactProviderReloaded getLibrary={getLibrary}>
				<App />
			</Web3ReactProviderReloaded>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)
