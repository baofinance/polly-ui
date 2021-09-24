import { Multicall as MC } from 'ethereum-multicall'
import Web3 from 'web3'
import { provider } from 'web3-core/types'
import { Contract } from 'web3-eth-contract'
import Config from './lib/config'
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
  public readonly web3: Web3
  public readonly multicall: MC
  operation: SetsNetworkId

  constructor(
    provider: string | provider,
    networkId: number,
    options: BaoOptions,
  ) {
    let realProvider

    if (typeof provider === 'string') {
      if (provider.includes('wss')) {
        realProvider = new Web3.providers.WebsocketProvider(
          provider as string,
          {
            timeout: options.ethereumNodeTimeout || 100000,
          },
        )
      } else {
        realProvider = new Web3.providers.HttpProvider(provider, {
          timeout: options.ethereumNodeTimeout || 100000,
        })
      }
    } else if (provider) {
      realProvider = provider
    } else {
      realProvider = new Web3.providers.HttpProvider(
        Config.defaultRpc.rpcUrls[0],
      )
    }

    this.networkId = networkId
    this.web3 = new Web3(realProvider)
    this.multicall = new MC({
      web3Instance: this.web3,
      tryAggregate: true,
    })

    this.contracts = new Contracts(realProvider, networkId, this.web3, options)
  }

  getContract(contractName: string, networkId = this.networkId): Contract {
    return this.contracts.getContract(contractName, networkId)
  }

  getNewContract(abi: string | unknown, address?: string): Contract {
    return this.contracts.getNewContract(abi, address)
  }

  async hasAccounts(): Promise<boolean> {
    return (await this.web3.eth.getAccounts()).length > 0
  }

  setProvider(provider: provider, networkId: number): void {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    this.operation.setNetworkId(networkId)
  }
}
