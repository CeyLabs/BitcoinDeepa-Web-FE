import { cache } from "./cache"

export interface BitcoinPrice {
  usd: number
  lkr: number
  lastUpdated: string
}

export interface ConversionResult {
  sats: number
  usd: number
  btc: number
  lkr: number
  lastUpdated: string
}

const COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3"
const CACHE_KEY = "bitcoin-price"
const CACHE_TTL = 30 // 30 seconds

export async function getBitcoinPrice(): Promise<BitcoinPrice> {
  // Try to get from cache first
  const cached = cache.get<BitcoinPrice>(CACHE_KEY)
  if (cached) {
    return cached
  }

  try {
    const apiKey = process.env.COINGECKO_API_KEY
    const url = apiKey
      ? `${COINGECKO_BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd,lkr&x_cg_demo_api_key=${apiKey}`
      : `${COINGECKO_BASE_URL}/simple/price?ids=bitcoin&vs_currencies=usd,lkr`

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "BitcoinDeepa/1.0",
      },
    })

    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }

    const data = await response.json()

    if (!data.bitcoin) {
      throw new Error("Invalid response from CoinGecko API")
    }

    const result: BitcoinPrice = {
      usd: data.bitcoin.usd,
      lkr: data.bitcoin.lkr,
      lastUpdated: new Date().toISOString(),
    }

    // Cache the result
    cache.set(CACHE_KEY, result, CACHE_TTL)

    return result
  } catch (error) {
    console.error("Failed to fetch Bitcoin price:", error)

    // Try to return stale cache data as fallback
    const staleCache = cache.get<BitcoinPrice>(`${CACHE_KEY}-stale`)
    if (staleCache) {
      console.log("Using stale cache data as fallback")
      return staleCache
    }

    // Ultimate fallback with approximate values
    const fallback: BitcoinPrice = {
      usd: 100000, // Approximate fallback price
      lkr: 29000000, // Approximate LKR rate
      lastUpdated: new Date().toISOString(),
    }

    return fallback
  }
}

export function convertSatoshis(sats: number, bitcoinPrice: BitcoinPrice): ConversionResult {
  const btcAmount = sats / 100000000 // 1 BTC = 100,000,000 sats
  const usdAmount = btcAmount * bitcoinPrice.usd
  const lkrAmount = btcAmount * bitcoinPrice.lkr

  return {
    sats,
    usd: usdAmount,
    btc: btcAmount,
    lkr: lkrAmount,
    lastUpdated: bitcoinPrice.lastUpdated,
  }
}
