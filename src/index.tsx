import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function getLibrary(provider: any) {
	return new Web3Provider(provider)
}

const Web3ReactNetworkProvider = createWeb3ReactRoot('network')

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<Web3ReactNetworkProvider getLibrary={getLibrary}>
				<App />
			</Web3ReactNetworkProvider>
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)
