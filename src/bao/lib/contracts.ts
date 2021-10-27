import BigNumber from 'bignumber.js/bignumber'
import Web3 from 'web3'
import { provider } from 'web3-core/types'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { BaoOptions } from '../Bao'
import ERC20Abi from './abi/erc20.json'
import ExperipieAbi from './abi/experipie.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import Config from './config'
import * as Types from './types'

export class Contracts {
  networkId: number
  web3: Web3
  defaultConfirmations: number
  autoGasMultiplier: number
  confirmationType: number
  defaultGas: string
  defaultGasPrice: string
  contracts: Types.ContractsConfig
  pools: Types.FarmableSupportedPool[]
  nests: Types.ActiveSupportedNest[]
  blockGasLimit: any
  notifier: any

  constructor(
    provider: string | provider,
    networkId: number,
    web3: Web3,
    options: BaoOptions,
  ) {
    this.networkId = networkId
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.1
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.contracts = Config.contracts
    Object.keys(Config.contracts).forEach((contractName) => {
      this.contracts[contractName][networkId].contract = this.getNewContract(
        this.contracts[contractName][networkId].abi,
      )
    })

    this.pools =
      networkId === Config.networkId
        ? Config.farms.map((pool) =>
            Object.assign(pool, {
              lpAddress: pool.lpAddresses[networkId],
              tokenAddress: pool.tokenAddresses[networkId],
              lpContract: this.getNewContract(UNIV2PairAbi),
              tokenContract: this.getNewContract(ERC20Abi),
            }),
          )
        : undefined

    this.nests =
      networkId === Config.networkId
        ? Config.nests.map((nest) =>
            Object.assign(nest, {
              nestAddress: nest.nestAddresses[networkId],
              nestContract: this.getNewContract(ExperipieAbi),
            }),
          )
        : undefined

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider: provider, networkId: number): void {
    const setProvider = (contract: Contract, address: string) => {
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    if (networkId === Config.networkId) {
      Object.keys(this.contracts).forEach((contractName) => {
        setProvider(
          this.contracts[contractName][networkId].contract,
          this.contracts[contractName][networkId].address,
        )
      })

      if (this.pools) {
        this.pools.forEach(
          ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
            setProvider(lpContract, lpAddress)
            setProvider(tokenContract, tokenAddress)
          },
        )
      }
      if (this.nests) {
        this.nests.forEach(({ nestAddress, nestContract }) =>
          setProvider(nestContract, nestAddress),
        )
      }
    }
  }

  setDefaultAccount(account: string): void {
    this.getContract('polly').options.from = account
    this.getContract('masterChef').options.from = account
    this.getContract('recipe').options.from = account
  }

  getContract(contractName: string, networkId = this.networkId): Contract {
    return this.contracts[contractName][networkId].contract
  }

  getNewContract(abi: string | unknown, address?: string): Contract {
    return new this.web3.eth.Contract(
      (typeof abi === 'string' ? require(`./abi/${abi}`) : abi) as AbiItem[],
      address,
    )
  }

  async callContractFunction(method: any, options: any) {
    const { confirmations, confirmationType, autoGasMultiplier, ...txOptions } =
      options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        const g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error: Error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash: string) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error: Error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber: number, receipt: string) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt: string) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method: any, options: any) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - 100000
  }
}
