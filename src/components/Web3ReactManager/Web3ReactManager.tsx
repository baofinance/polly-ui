import { useWeb3React } from '@web3-react/core'
import React, { useEffect } from 'react'

import { getNetworkConnector } from '@/bao/lib/connectors'
import { useEagerConnect, useInactiveListener } from '@/bao/lib/hooks'

const network = getNetworkConnector()

export const Web3ReactManager = ({ children }: { children: JSX.Element }) => {
	const { active } = useWeb3React()
	const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React('network')

	// try to eagerly connect to an injected provider, if it exists and has granted access already
	const triedEager = useEagerConnect()

	// after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
	useEffect(() => {
		const activate = async () => {
			if (triedEager && !networkActive && !networkError && !active) {
				// const Cookies = (await import('js-cookie')).default
				// network.changeChainId(Number(Cookies.get('chain-id')))
				activateNetwork(network)
			}
		}
		activate()
	}, [triedEager, networkActive, networkError, activateNetwork, active])

	// when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
	useInactiveListener(!triedEager)

	// on page load, do nothing until we've tried to connect to the injected connector
	if (!triedEager) {
		return null
	}

	// if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
	if (!active && networkError) {
		return (
			<div className='flex h-80 items-center justify-center'>
				<div className='text-pollyGreen'>
					<p>Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device</p>
				</div>
			</div>
		)
	}

	return children
}

export default Web3ReactManager
