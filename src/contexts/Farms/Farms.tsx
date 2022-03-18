import { getFarms } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Context from './context'

const Farms: React.FC = ({ children }) => {
	const [unharvested, setUnharvested] = useState(0)

	const bao = useBao()
	const { account } = useWeb3React()

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
