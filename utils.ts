import { Alchemy, Network } from 'alchemy-sdk'

// Add this check at the top of the file
if (
  process.env.NODE_ENV === 'production' &&
  !process.env.REACT_APP_ALCHEMY_API_KEY
) {
  console.error(
    'BUILD ERROR: REACT_APP_ALCHEMY_API_KEY is not defined in production environment',
  )
}

const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY
if (!ALCHEMY_API_KEY) {
  console.error('Runtime Error: Alchemy API key is not defined')
}

const settings = {
  apiKey: ALCHEMY_API_KEY,
  network: Network.MATIC_MAINNET,
}

const alchemy = new Alchemy(settings)

const cache = new Map()
const CACHE_DURATION = 30000 // 30 seconds

async function fetchWithRetry(method: string, params: any[]) {
  const cacheKey = JSON.stringify({ method, params })

  // Check cache
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }

  let retries = 3
  let delay = 1000 // Start with 1s delay

  while (retries > 0) {
    try {
      if (!ALCHEMY_API_KEY) {
        throw new Error('Alchemy API key is not configured')
      }

      const result = await alchemy.core.send(method, params)

      // Update cache
      cache.set(cacheKey, {
        timestamp: Date.now(),
        data: result,
      })

      return result
    } catch (error) {
      console.error(`API call failed (${retries} retries left):`, error)
      retries--
      if (retries === 0) throw error

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2 // Exponential backoff
    }
  }
}

export { fetchWithRetry }
