import { createContext } from 'react'
import { NestsContext } from './types'

const context = createContext<NestsContext>({
  nests: [],
})

export default context
