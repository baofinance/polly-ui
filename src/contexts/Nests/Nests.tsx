import { getNests } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Context from './context'

const Nests: React.FC = ({ children }) => {
	const bao = useBao()
	const { library } = useWeb3React()

	const [nests, setNests] = useState(getNests(bao))
	useEffect(() => setNests(getNests(bao)), [library, bao])

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

export default Nests
