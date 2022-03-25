import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider, createWeb3ReactRoot } from '@web3-react/core'
import Web3ReactManager from 'components/Web3ReactManager'
import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { provider } from 'web3-core'
import App from './App'

function getLibrary(provider: provider) {
	return new Web3(provider)
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
