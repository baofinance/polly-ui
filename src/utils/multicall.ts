import { ContractCallContext, ContractCallResults } from 'ethereum-multicall'
import { Contract } from 'web3-eth-contract'
import _ from 'lodash'

interface ContractCalls {
  contract: Contract
  ref: string
  calls: Array<ContractCall>
}

interface ContractCall {
  ref?: string
  method: string
  params?: Array<any>
}

const createCallContext = (contracts: ContractCalls[]): ContractCallContext[] =>
  _.map(contracts, (contract: ContractCalls) => {
    return {
      reference: contract.ref,
      contractAddress: contract.contract.options.address,
      abi: contract.contract.options.jsonInterface,
      calls: _.map(contract.calls, (call) => ({
        reference: call.ref,
        methodName: call.method,
        methodParameters: call.params || [],
      })),
    }
  })

const parseCallResults = (call: ContractCallResults): any => {
  const result: any = {}
  _.each(Object.keys(call.results), (key) => {
    result[key] = _.map(
      call.results[key].callsReturnContext,
      (returnValue) => ({
        method: returnValue.methodName,
        ref: returnValue.reference,
        values: returnValue.returnValues,
      }),
    )
  })
  return result
}

export default { createCallContext, parseCallResults }
