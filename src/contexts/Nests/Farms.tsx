import React, { useCallback, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import useBao from '../../hooks/useBao'

import { bnToDec } from '../../utils'
import { getMasterChefContract, getEarned } from '../../bao/utils'
import { getNests } from '../../bao/utils'

import Context from './context'
import { Nest } from './types'

const Farms: React.FC = ({ children }) => {

	const bao = useBao()
	const { account } = useWallet()

	const nests = getNests(bao)

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
