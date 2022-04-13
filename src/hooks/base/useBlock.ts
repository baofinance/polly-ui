import { useEffect, useState } from 'react'
import useBao from './useBao'

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const bao = useBao()

  useEffect(() => {
    // const setBlockDebounced = debounce(setBlock, 300)
    if (!bao) return

    // const subscription = new Web3(ethereum).eth.subscribe(
    //   'newBlockHeaders',
    //   (error, result) => {
    //     if (!error) {
    //       setBlockDebounced(result.number)
    //     }
    //   },
    // )

    const interval = setInterval(async () => {
      const latestBlockNumber = await bao.web3.eth.getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [bao, block])

  return block
}

export default useBlock
