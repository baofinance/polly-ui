import { useWeb3React } from '@web3-react/core'
import { network } from 'bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from 'bao/lib/hooks'
import React, { FC, PropsWithChildren, ReactNode, useEffect } from 'react'

interface Web3ReactManagerProps {
	children: ReactNode
}

export const Web3ReactManager: FC<PropsWithChildren<Web3ReactManagerProps>> = ({
	children,
}) => {
	const { active } = useWeb3React()
	const {
		active: networkActive,
		error: networkError,
		activate: activateNetwork,
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
