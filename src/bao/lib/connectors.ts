import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'

const RPC_URLS: { [chainId: number]: string } = {
  137: 'https://polygon-rpc.com/'
}

export const injected = new InjectedConnector({ supportedChainIds: [137] })

export const network = new NetworkConnector({
  urls: { 137: RPC_URLS[137] },
  defaultChainId: 137
})