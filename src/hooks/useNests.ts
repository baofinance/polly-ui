import { useContext } from 'react'
import { Context as NestsContext } from '../contexts/Nests'

const useNests = () => {
  const { nests } = useContext(NestsContext)
  return [nests]
}

export default useNests
