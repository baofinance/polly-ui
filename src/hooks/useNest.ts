import { useContext } from 'react'
import { Context as NestsContext, Nest } from '../contexts/Nests'

const useNest = (id: string): Nest => {
  const { nests } = useContext(NestsContext)
  const nest = nests.find((nest) => nest.id === id)
  return nest
}

export default useNest
