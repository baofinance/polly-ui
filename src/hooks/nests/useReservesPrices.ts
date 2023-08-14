import { useCallback, useEffect, useState } from 'react'
import useFarms from '../farms/useFarms'
import Multicall from '../../utils/multicall'
import useBao from '../base/useBao'
import { BigNumber, ethers } from 'ethers'
import { getOraclePrice } from '@/bao/utils'
import useContract from '@/hooks/base/useContract'
import Config from '@/bao/lib/config'
import { Chainoracle } from '@/typechain/Chainoracle'
import { Uni_v2_lp } from '@/typechain/Uni_v2_lp'
import { useWeb3React } from '@web3-react/core'

type Prices = {
	[address: string]: BigNumber
}

const useReservesPrices = () => {
	const { library, account, chainId } = useWeb3React()
	const [prices, setPrices] = useState<Prices | undefined>()
	const bao = useBao()
	const farms = useFarms()
	const wethOracle = useContract<Chainoracle>('Chainoracle', Config.contracts.wethPrice[chainId].address)
	const signerOrProvider = account ? library.getSigner() : library

	console.log('farms', farms)

	const fetchPrices = useCallback(async () => {
		const wethPrice = await getOraclePrice(bao, wethOracle)

		// TODO: Remove hard-coding of PID-nest map
		const NEST_PIDS: { [pid: number]: string } = {
			16: '0xd3f07EA86DDf7BAebEfd49731D7Bbd207FedC53B',
			24: '0x9Bf320bd1796a7495BB6187f9EB4Db2679b74eD3',
			25: '0x14bbe7D3826B5f257B7dde0852036BC94C323ccA',
			26: '0x6B1E22bC4d28DAc283197CF44347639c8360ECE6',
		}

		const contracts = Object.keys(NEST_PIDS).map(
			pid =>
				new ethers.Contract(
					farms.find(farm => farm.pid.toString().toLowerCase() === pid.toLowerCase()).lpAddress.toLowerCase(),
					'uni_v2_lp.json',
					signerOrProvider,
				),
		)

		console.log('contracts', contracts)
		const ctx = Multicall.createCallContext(
			contracts.map(lp => ({
				contract: lp,
				ref: lp.address,
				calls: [{ method: 'getReserves' }, { method: 'token0' }, { method: 'token1' }],
			})),
		)
		const res = await Multicall.parseCallResults(await bao.multicall.call(ctx))

		const prices = Object.keys(res).reduce((prev: any, cur: any, i) => {
			const addresses = [res[cur][1].values[0], res[cur][2].values[0]]
			const wethIdx = addresses[0].toLowerCase() === NEST_PIDS[parseInt(Object.keys(NEST_PIDS)[i])].toLowerCase() ? 1 : 0

			const reserves: BigNumber[] = [0, 1].map(j => BigNumber.from(res[cur][0].values[j].hex))
			return {
				...prev,
				[addresses[wethIdx ? 0 : 1].toLowerCase()]: reserves[wethIdx].div(reserves[wethIdx ? 0 : 1]).mul(wethPrice),
			}
		}, {})

		setPrices(prices)
	}, [bao, farms])

	useEffect(() => {
		if (farms && bao) fetchPrices()
	}, [bao, farms])

	return prices
}

export default useReservesPrices
