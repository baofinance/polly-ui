import { getFarms } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { PropsWithChildren, ReactNode, useState } from 'react'
import Context from './context'

interface FarmsProviderProps {
	children: ReactNode
}

const FarmsProvider: React.FC<PropsWithChildren<FarmsProviderProps>> = ({
	children,
}) => {
	const [unharvested, setUnharvested] = useState(0)

	const bao = useBao()

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

export default FarmsProvider
