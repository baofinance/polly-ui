import { Alchemy, Network } from 'alchemy-sdk'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
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
      const result = await alchemy.core.send(method, params)

      // Update cache
      cache.set(cacheKey, {
        timestamp: Date.now(),
        data: result,
      })

      return result
    } catch (error) {
      retries--
      if (retries === 0) throw error

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay))
      delay *= 2 // Exponential backoff
    }
  }
}
