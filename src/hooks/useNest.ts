import { useContext } from 'react'
import { Context as NestContext, Nest } from '../contexts/Nests'

const useNest = (id: string): Nest => {
  const { nests } = useContext(NestContext)
  const nest = nests.find((nest) => nest.id === id)
  return nest
}

export default useNest
