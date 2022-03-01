import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import CreamABI from 'bao/lib/abi/creamLending.json'
import ERC20ABI from 'bao/lib/abi/erc20.json'

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(ERC20ABI as unknown as AbiItem, address)
}

export const getCreamContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  return new web3.eth.Contract(CreamABI as unknown as AbiItem, address)
}

export const getAllowance = async (
  contract: Contract,
  owner: string,
  spender: string,
): Promise<string> => {
  try {
    return await contract.methods.allowance(owner, spender).call()
  } catch (e) {
    return '0'
  }
}

export const getBalance = async (
  provider: provider,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  const tokenContract = getContract(provider, tokenAddress)
  try {
    return await tokenContract.methods.balanceOf(userAddress).call()
  } catch (e) {
    return '0'
  }
}

export const getDecimals = async (
  provider: provider,
  tokenAddress: string,
): Promise<string> => {
  const tokenContract = getContract(provider, tokenAddress)
  return await tokenContract.methods.decimals().call()
}
