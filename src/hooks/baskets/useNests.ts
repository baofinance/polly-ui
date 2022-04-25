import { Context as NestsContext } from 'contexts/Nests'
import { useContext } from 'react'

const useNests = () => {
  const { nests } = useContext(NestsContext)
  return nests
}

export default useNests
