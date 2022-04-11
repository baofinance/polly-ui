import { getNests } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { useEffect, useState } from 'react'
import Context from './context'

const Nests: React.FC = ({ children }) => {
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

export default Nests
