import { useWeb3React } from '@web3-react/core'
import { network } from 'bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from 'bao/lib/hooks'
import React, { FC, useEffect } from 'react'

export const Web3ReactManager: FC = ({ children }) => {
	const { active } = useWeb3React()
	const {
		active: networkActive,
		error: networkError,
		activate: activateNetwork,
		chainId,
	} = useWeb3React()

	const triedEager = useEagerConnect()

	useEffect(() => {
		const activate = async () => {
			if (triedEager && !networkActive && !networkError && !active) {
				activateNetwork(network)
			}
		}
		activate()
	}, [triedEager, networkActive, networkError, activateNetwork, active])

	useInactiveListener(!triedEager)

	return <>{children}</>
}

export default Web3ReactManager
