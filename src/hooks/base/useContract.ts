import { useWeb3React } from '@web3-react/core'
//import { Signer } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import Config from '@/bao/lib/config'
import { providerKey } from '@/utils/index'
import { useQuery } from '@tanstack/react-query'

/*
 * Provides a connected `typechain` contract instance from the generated factories, looking
 * up its public key for from this project's config file.
 * @param contractName string The name of the typechain class for a smart contract.
 * @param address? string Manual override for the public key to connect the contract to.
 * @returns T | Contract | undefined
 * */
const useContract = <T = Contract>(contractName: string, address?: string): T => {
	const { library, account, chainId } = useWeb3React()
	const {
		data: contract,
		//refetch,
		//status,
	} = useQuery(
		['@/hooks/base/useContract', providerKey(library, account, chainId), { contractName, address }],
		async () => {
			if (address === 'ETH') return null
			let contractAddr
			try {
				contractAddr = address || Config.contracts[contractName][chainId].address
			} catch (e) {
				throw new Error(`No contract address given and cannot find ${contractName} in Config.contracts.`)
			}
			const factory = require(`@/typechain/factories`)[`${contractName}__factory`]
			const providerOrSigner = account ? library.getSigner() : library
			const _contract: T = factory.connect(contractAddr, providerOrSigner)
			return _contract
		},
		{
			enabled: !!library && !!chainId && address !== null,
			staleTime: Infinity,
			cacheTime: Infinity,
			networkMode: 'always',
		},
	)

	return contract as T
}

export default useContract
