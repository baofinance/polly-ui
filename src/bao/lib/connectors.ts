import { WalletConnectV2Connector } from '@/utils/walletconntectV2Connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const supportedChainIds = [137]

// export const network = new NetworkConnector({
//   defaultChainId: 1,
//   urls: RPC,
// })

let network: NetworkConnector

const RPC_URLS: { [chainId: number]: string } = {
	137: process.env.NEXT_PUBLIC_ALCHEMY_API_URL,
}

export const getNetworkConnector = (): NetworkConnector => {
	if (network) {
		return network
	}

	return (network = new NetworkConnector({
		defaultChainId: 137,
		urls: RPC_URLS,
	}))
}

export const injected = new InjectedConnector({
	supportedChainIds,
})

export const walletConnect = new WalletConnectV2Connector({
	projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID,
	rpcMap: RPC_URLS,
	chains: [137],
	showQrModal: true,
	// Decentraland's RPCs don't support the `test` method used for the ping.
	disableProviderPing: true,
	qrModalOptions: {
		themeVariables: {
			// Display the WC modal over other Decentraland UI's modals.
			// Won't be visible without this.
			'--wcm-z-index': '9999',
		},
	},
	// Methods and events based on what is used on the decentraland dapps and the ethereum-provider lib found at:
	// https://github.com/WalletConnect/walletconnect-monorepo/blob/v2.0/providers/ethereum-provider/src/constants/rpc.ts
	// If the wallet doesn't support non optional methods, it will not allow the connection.
	methods: ['eth_sendTransaction', 'personal_sign'],
	optionalMethods: [
		'eth_accounts',
		'eth_requestAccounts',
		'eth_sign',
		'eth_signTypedData_v4',
		'wallet_switchEthereumChain',
		'wallet_addEthereumChain',
	],
	events: ['chainChanged', 'accountsChanged'],
	optionalEvents: ['disconnect'],
})

export const coinbaseWallet = new WalletLinkConnector({
	url: RPC_URLS[137],
	appName: 'bao-app',
	supportedChainIds: [137],
})
