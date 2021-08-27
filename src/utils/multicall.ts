import { ContractCallContext } from 'ethereum-multicall'
import { Contract } from 'web3-eth-contract'
import _ from 'lodash'

interface ContractCalls {
  contract: Contract
  ref: string
  calls: Array<ContractCall>
}

interface ContractCall {
  ref: string
  method: string
  params: Array<any>
}

export const createCallContext = (
  contracts: ContractCalls[],
): ContractCallContext[] =>
  _.map(contracts, (contract: ContractCalls) => {
    return {
      reference: contract.ref,
      contractAddress: contract.contract.options.address,
      abi: contract.contract.options.jsonInterface,
      calls: _.map(contract.calls, (call) => ({
        reference: call.ref,
        methodName: call.method,
        methodParameters: call.params,
      })),
    }
  })
