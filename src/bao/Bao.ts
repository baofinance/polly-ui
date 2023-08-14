import { Multicall as MC } from 'ethereum-multicall'
import { Provider } from '@ethersproject/providers'

export class Bao {
	public readonly provider: Provider
	public readonly multicall: MC

	constructor(provider: Provider) {
		this.multicall = new MC({
			ethersProvider: provider,
			tryAggregate: true,
		})
	}
}
