import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'

import CreamABI from '@/bao/lib/abi/creamLending.json'
import ERC20ABI from '@/bao/lib/abi/erc20.json'

export const getContract = (signerOrProvider: Signer | Provider, address: string) => {
	return signerOrProvider && new Contract(address, ERC20ABI, signerOrProvider)
}

export const getCreamContract = (signerOrProvider: Signer | Provider, address: string) => {
	return signerOrProvider && new Contract(address, CreamABI, signerOrProvider)
}

// NOTE: signer should be set on the Contract here already
export const getAllowance = async (contract: Contract, owner: string, spender: string): Promise<string> => {
	try {
		const allow = await contract.allowance(owner, spender)
		return allow.toString()
	} catch (e) {
		return '0'
	}
}

export const getBalance = async (signerOrProvider: Signer | Provider, tokenAddress: string, userAddress: string): Promise<string> => {
	const tokenContract = getContract(signerOrProvider, tokenAddress)
	try {
		const bal = await tokenContract.balanceOf(userAddress)
		return bal.toString()
	} catch (e) {
		return '0'
	}
}

export const getDecimals = async (signerOrProvider: Signer | Provider, tokenAddress: string): Promise<string> => {
	const tokenContract = getContract(signerOrProvider, tokenAddress)
	return tokenContract.decimals()
}
