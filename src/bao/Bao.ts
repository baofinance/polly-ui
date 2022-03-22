import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { Multicall as MC } from 'ethereum-multicall'
import { Contract } from 'ethers'
import { Contracts } from './lib/contracts'

export interface BaoOptions {
  confirmationType?: number
  defaultConfirmations: number
  autoGasMultiplier: number
  defaultGas: string
  defaultGasPrice: string
  ethereumNodeTimeout: number
}

export interface SetsNetworkId {
  setNetworkId(networkId: number): void
}

export class Bao {
  public readonly networkId: number
  public readonly contracts: Contracts
  public readonly web3: Web3Provider
  public readonly multicall: MC
  operation: SetsNetworkId

  constructor(provider: Web3Provider, networkId: number, options: BaoOptions) {
    const { chainId, library } = useWeb3React()

    this.networkId = chainId
    this.web3 = library
    this.multicall = new MC({
      web3Instance: this.web3,
      tryAggregate: true,
    })

    this.contracts = new Contracts(chainId, provider, options)
  }

  // account is not optional
  getSigner(library: Web3Provider, account: string): JsonRpcSigner {
    return library.getSigner(account).connectUnchecked()
  }

  // account is optional
  getProviderOrSigner(
    library: Web3Provider,
    account?: string,
  ): Web3Provider | JsonRpcSigner {
    return account ? this.getSigner(library, account) : library
  }

  getNewContract(
    address: string,
    ABI: any,
    library: Web3Provider,
    account?: string,
  ): Contract {
    return new Contract(
      address,
      ABI,
      this.getProviderOrSigner(library, account),
    )
  }
}
