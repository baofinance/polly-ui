import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

const RPC_URLS: { [chainId: number]: string } = {
  137: 'https://polygon-rpc.com/'
}

export const injected = new InjectedConnector({ supportedChainIds: [137] })

export const network = new NetworkConnector({
  urls: { 137: RPC_URLS[137] },
  defaultChainId: 137
})

export const walletConnect = new WalletConnectConnector({ rpc: { 137: 'https://polygon-rpc.com/' } })

export const coinbaseWallet = new WalletLinkConnector({ url: `https://polygon-rpc.com/`, appName: 'polly-ui', supportedChainIds: [137], })

