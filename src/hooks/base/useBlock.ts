import { useContext, useState, useEffect, useRef } from 'react'
import { BaoContext } from '@/contexts/BaoProvider'

const useBlock = (): number => {
	const { block } = useContext(BaoContext)
	return block
}

/**
 * #### Summary
 * A hook that invokes an update callback function based on update options and ethers network state (i.e. block number)
 *
 * @param interval The number of blocks that should pass before calling the callback
 * @param callback Function to call when the proper number of blocks have passed
 * @param allowUpdate Switch the callback interval on or off
 */
export const useBlockUpdater = (callback: (() => void) | (() => Promise<void>), interval = 1, allowUpdate = true): void => {
	const block = useBlock()
	const updateNumberRef = useRef<number>(block)
	const [firstRender, setFirstRender] = useState(true)

	// FIXME: so it won't render every remount cuz race conditions or something
	useEffect(() => {
		setFirstRender(false)
	}, [setFirstRender])

	if (allowUpdate) {
		// number that only increases every (X * options.blockNumberInterval) blocks
		const blockNumberFilter = block > 0 ? Math.floor(block / (interval ?? 1)) : undefined
		if (blockNumberFilter && blockNumberFilter !== updateNumberRef.current) {
			updateNumberRef.current = blockNumberFilter
			if (!firstRender) {
				callback()
			}
		}
	}
}

export default useBlock
