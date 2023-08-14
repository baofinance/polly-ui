import { ContractCallResults } from 'ethereum-multicall'
import _ from 'lodash'
import { BigNumber as BN } from 'ethers'
import { Contract } from '@ethersproject/contracts'

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

const createCallContext = (contracts: ContractCalls[]): any[] =>
	_.map(contracts, (contract: ContractCalls) => {
		return {
			reference: contract.ref,
			contractAddress: contract.contract.address,
			abi: JSON.parse(contract.contract.interface.format('json') as string),
			calls: _.map(contract.calls, call => ({
				reference: call.ref,
				methodName: call.method,
				methodParameters: call.params || [],
			})),
		}
	})

const parseCallResults = (call: ContractCallResults): any => {
	const result: any = {}
	_.each(Object.keys(call.results), key => {
		result[key] = _.map(call.results[key].callsReturnContext, returnValue => {
			const values = returnValue.returnValues.map(x => {
				//if (x.type === 'BigNumber') {
				//return new BigNumber(BN.from(x).toString())
				//} else {
				//return x
				//}
				if (x.type === 'BigNumber') {
					return BN.from(x)
				} else {
					return x
				}
			})
			return {
				method: returnValue.methodName,
				ref: returnValue.reference,
				values,
			}
		})
	})
	return result
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { createCallContext, parseCallResults }
