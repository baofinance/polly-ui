import Web3 from 'web3'
import { Contracts } from './lib/contracts'
import { Account } from './lib/accounts.js'
import { EVM } from './lib/evm.js'
import { contractAddresses } from './lib/constants'
import { provider, AddAccount } from 'web3-core/types'

export interface BaoOptions {
  confirmationType?: number
  defaultAccount: string
  defaultConfirmations: number
  autoGasMultiplier: number
  testing: boolean
  defaultGas: string
  defaultGasPrice: string
  accounts: Account[]
  ethereumNodeTimeout: number
}

export interface SetsNetworkId {
  setNetworkId(networkId: number): void
}

export class Bao {
  public readonly accounts: Account[]
  public readonly contracts: Contracts
  public readonly web3: Web3
  public readonly testing: EVM | null | undefined
  public readonly snapshot: Promise<string> | null | undefined
  public readonly pollyAddress: string
  public readonly masterChefAddress: string
  public readonly wethAddress: string
  operation: SetsNetworkId

  constructor(
    provider: string | provider,
    networkId: number,
    testing: boolean,
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
    } else {
      realProvider = provider
    }

    this.web3 = new Web3(realProvider)

    if (testing) {
      this.testing = new EVM(realProvider)
      this.snapshot = this.testing.snapshot()
    }

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount
    }
    this.contracts = new Contracts(realProvider, networkId, this.web3, options)
    if (networkId == 137) {
      this.pollyAddress = contractAddresses.polly[networkId]
      this.masterChefAddress = contractAddresses.masterChef[networkId]
      this.wethAddress = contractAddresses.weth[networkId]
    }
    console.log(`network Id: ${networkId}`, contractAddresses)
  }

  async resetEVM(): Promise<void> {
    if (this.snapshot && this.testing) {
      this.testing.resetEVM(await this.snapshot)
    }
  }

  addAccount(address: string, number: number): void {
    this.accounts.push(new Account(this.contracts, address))
  }

  setProvider(provider: provider, networkId: number): void {
    this.web3.setProvider(provider)
    this.contracts.setProvider(provider, networkId)
    this.operation.setNetworkId(networkId)
  }

  setDefaultAccount(account: string): void {
    this.web3.eth.defaultAccount = account
    this.contracts.setDefaultAccount(account)
  }

  getDefaultAccount(): string {
    return this.web3.eth.defaultAccount
  }

  loadAccount(account: AddAccount): void {
    const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey)

    if (
      !newAccount ||
      (account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase())
    ) {
      throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${
        newAccount ? newAccount.address : null
      }`)
    }
  }
}
