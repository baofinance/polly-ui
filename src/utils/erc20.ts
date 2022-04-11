import Web3 from 'web3'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import CreamABI from 'bao/lib/abi/creamLending.json'
import ERC20ABI from 'bao/lib/abi/erc20.json'
import { Bao } from 'bao'

export const getContract = (bao: Bao, address: string) => {
  return bao && bao.web3 && new bao.web3.eth.Contract(ERC20ABI as unknown as AbiItem, address)
}

export const getCreamContract = (bao: Bao, address: string) => {
  return bao && bao.web3 && new bao.web3.eth.Contract(CreamABI as unknown as AbiItem, address)
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
  bao: Bao,
  tokenAddress: string,
  userAddress: string,
): Promise<string> => {
  const tokenContract = getContract(bao, tokenAddress)
  try {
    return await tokenContract.methods.balanceOf(userAddress).call()
  } catch (e) {
    return '0'
  }
}

export const getDecimals = async (
  bao: Bao,
  tokenAddress: string,
): Promise<string> => {
  const tokenContract = getContract(bao, tokenAddress)
  return await tokenContract.methods.decimals().call()
}
