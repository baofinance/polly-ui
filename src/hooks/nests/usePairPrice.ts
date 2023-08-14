import Config from '@/bao/lib/config'
import { getOraclePrice } from '@/bao/utils'
import useBao from '@/hooks/base/useBao'
import useBlock from '@/hooks/base/useBlock'
import useContract from '@/hooks/base/useContract'
import useTransactionProvider from '@/hooks/base/useTransactionProvider'
import type { Chainoracle } from '@/typechain/index'
import GraphClient from '@/utils/graph'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import { ActiveSupportedNest } from '../../bao/lib/types'
import { BigNumber } from 'ethers'

const usePairPrice = (nest: ActiveSupportedNest) => {
	const { chainId } = useWeb3React()
	const [res, setRes] = useState<BigNumber | undefined>()
	const bao = useBao()
	const { transactions } = useTransactionProvider()
	const block = useBlock()

	const wethOracle = useContract<Chainoracle>('Chainoracle', Config.contracts.wethPrice[chainId].address)

	const querySubgraph = useCallback(async () => {
		if (!(nest && nest.address && bao)) return

		const wethPrice = await getOraclePrice(bao, wethOracle)
		const pairPrice = await GraphClient.getPriceFromPair(parseFloat(wethPrice.toString()), nest.address)
		setRes(BigNumber.from(pairPrice))
	}, [bao, nest])

	useEffect(() => {
		querySubgraph()
	}, [bao, nest, transactions, block])

	return res
}

export default usePairPrice
