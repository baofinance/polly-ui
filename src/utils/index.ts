import { Web3Provider } from '@ethersproject/providers'
export { default as formatAddress } from './formatAddress'

type ProviderKey = {
	provider: string
	signer: string
	chainId: number
}
/*
 * Get a react-query query key for an ethers provider or signer.
 * */
export const providerKey = (library?: Web3Provider, account?: string, chainId?: number): ProviderKey | null => {
	if (library == null) return null
	const connection_url = library?.connection.url.substring(0, 25)
	return {
		//provider: `${library?.network?.chainId}_${library?.network?.name}_${connection_url}`,
		provider: connection_url,
		signer: account || null,
		chainId,
	}
}
