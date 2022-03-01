import { getNests } from 'bao/utils'
import useBao from 'hooks/base/useBao'
import React, { useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import Context from './context'

const Nests: React.FC = ({ children }) => {
	const bao = useBao()
	const { ethereum } = useWallet()

	const [nests, setNests] = useState(getNests(bao))
	useEffect(() => setNests(getNests(bao)), [ethereum, bao])

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
