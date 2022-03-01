import { getFarms } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { useState } from 'react'
import { useWallet } from 'use-wallet'
import Context from './context'

const Farms: React.FC = ({ children }) => {
	const [unharvested, setUnharvested] = useState(0)

	const bao = useBao()
	const { account } = useWallet()

	const farms = getFarms(bao)

	return (
		<Context.Provider
			value={{
				farms,
				unharvested,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Farms
