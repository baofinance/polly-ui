import { getNests } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
import Context from './context'

interface NestsProviderProps {
	children: ReactNode
}
const NestsProvider: React.FC<PropsWithChildren<NestsProviderProps>> = ({
	children,
}) => {
	const bao = useBao()

	const [nests, setNests] = useState(getNests(bao))
	useEffect(() => setNests(getNests(bao)), [bao])

	return (
		<Context.Provider
			value={{
				nests,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default NestsProvider
