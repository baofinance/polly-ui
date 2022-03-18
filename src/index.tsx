import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactProvider } from '@web3-react/core'
import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import { provider } from 'web3-core'
import App from './App'

function getLibrary(provider: provider, connector: any) {
	return new Web3(provider)
}

ReactDOM.render(
	<React.StrictMode>
		<Web3ReactProvider getLibrary={getLibrary}>
			<App />
		</Web3ReactProvider>
	</React.StrictMode>,
	document.getElementById('root'),
)
