import Config from '@/bao/lib/config'
import { ActiveSupportedNest } from '@/bao/lib/types'
import { Experipie__factory, Recipe__factory } from '@/typechain/factories'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'

const useNests = (): ActiveSupportedNest[] => {
	const { chainId, library, account } = useWeb3React()

	const nests = useMemo(() => {
		if (!library) return null
		const signerOrProvider = account ? library.getSigner() : library

		const bs = Config.nests.map(nest => {
			const address = nest.nestAddresses[chainId]
			const recipeAddress = Config.contracts.recipe[chainId].address
			const nestContract = Experipie__factory.connect(address, signerOrProvider)
			const recipeContract = Recipe__factory.connect(recipeAddress, signerOrProvider)
			return Object.assign(nest, { address, nestContract, recipeContract })
		})

		return bs
	}, [library, account, chainId])

	return nests
}

export default useNests
