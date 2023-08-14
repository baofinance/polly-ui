import Config from '@/bao/lib/config'
import { Erc20__factory, Uni_v2_lp__factory } from '@/typechain/factories'
import { useWeb3React } from '@web3-react/core'
import React, { PropsWithChildren, useMemo } from 'react'

import Context from './context'

interface FarmsProps {
	children: React.ReactNode
}

const Farms: React.FC<PropsWithChildren<FarmsProps>> = ({ children }) => {
	const { chainId, library, account } = useWeb3React()

	const farms = useMemo(() => {
		if (!library || !chainId) return []
		return Config.farms.map(pool => {
			const signerOrProvider = account ? library.getSigner() : library
			const lpAddress = pool.lpAddresses[chainId]
			const lpContract = Uni_v2_lp__factory.connect(lpAddress, signerOrProvider)
			const tokenAddress = pool.tokenAddresses[chainId]
			const tokenContract = Erc20__factory.connect(lpAddress, signerOrProvider)
			return Object.assign(pool, {
				id: pool.symbol,
				lpToken: pool.symbol,
				lpAddress,
				lpTokenAddress: lpAddress,
				lpContract,
				tokenAddress,
				tokenContract,
				earnToken: 'BAO',
				earnTokenAddress: Config.contracts.Bao[chainId].address,
			})
		})
	}, [library, account, chainId])

	return (
		<Context.Provider
			value={{
				farms,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Farms
