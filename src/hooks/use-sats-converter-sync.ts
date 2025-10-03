"use client"

import { useState, useEffect, useCallback } from "react"
import { CONVERSION_CONSTANTS, API_CONFIG } from '@/src/lib/ceyloncash-fx'

// API Response Types
interface CurrencyResponse {
  description: string
  buying_rate_lkr?: number | null
  selling_rate_lkr?: number | null
  avg_rate_lkr?: number | null
  usd_price?: number | null
  btc_equivalent?: number | null
  buying_rate?: number | null
  selling_rate?: number | null
  _error?: boolean
  _loading?: boolean
}

export interface ConversionResult {
  sats: number
  usd: number
  btc: number
  lkr: number
}

// Exchange rates cache
let exchangeRates: {
  usdRate: number
  lkrRate: number
  btcRate: number
} | null = null

let ratesPromise: Promise<void> | null = null

const isFiniteNumber = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value)

const deriveSatsFromRate = (value: number, rate: number): number | null => {
  if (!isFiniteNumber(value) || value < 0) {
    return null
  }

  if (!isFiniteNumber(rate) || rate <= 0) {
    return value === 0 ? 0 : null
  }

  const satsEstimate = value / rate
  if (!Number.isFinite(satsEstimate)) {
    return null
  }

  return Math.max(Math.round(satsEstimate), 0)
}

// Fetch rates once and cache them
async function loadExchangeRates(): Promise<void> {
  try {
    // Use proxy API endpoints to avoid CORS issues
    const [btcResponse, usdResponse] = await Promise.all([
      fetch(`${API_CONFIG.PROXY_BASE_URL}/btc`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      }),
      fetch(`${API_CONFIG.PROXY_BASE_URL}/usd`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      }),
    ])

    if (!btcResponse.ok) {
      throw new Error(`BTC API error: ${btcResponse.status}`)
    }

    if (!usdResponse.ok) {
      throw new Error(`USD API error: ${usdResponse.status}`)
    }

    const [btcData, usdData]: [CurrencyResponse, CurrencyResponse] = await Promise.all([
      btcResponse.json(),
      usdResponse.json(),
    ])

    if (btcData._error || btcData._loading) {
      throw new Error('BTC API returned error or loading state')
    }

    if (usdData._error || usdData._loading) {
      throw new Error('USD API returned error or loading state')
    }

    const btcUsdPrice = isFiniteNumber(btcData.usd_price) ? btcData.usd_price : null
    const btcAvgLkr = isFiniteNumber(btcData.avg_rate_lkr) ? btcData.avg_rate_lkr : null
    const usdBuyingRate = isFiniteNumber(usdData.buying_rate) ? usdData.buying_rate : null
    const usdSellingRate = isFiniteNumber(usdData.selling_rate) ? usdData.selling_rate : null

    const usdPerSat = btcUsdPrice !== null
      ? btcUsdPrice * CONVERSION_CONSTANTS.SATS_TO_BTC
      : null

    // Prefer selling rate for conversions so end users see the worst-case spend
    const usdToLkrRate = (() => {
      if (usdSellingRate !== null) {
        return usdSellingRate
      }
      if (usdBuyingRate !== null) {
        return usdBuyingRate
      }
      return null
    })()

    const lkrPerSatFromUsd =
      usdPerSat !== null && usdToLkrRate !== null
        ? usdPerSat * usdToLkrRate
        : null

    const lkrPerSatFromBtc = btcAvgLkr !== null
      ? btcAvgLkr * CONVERSION_CONSTANTS.SATS_TO_BTC
      : null

    exchangeRates = {
      usdRate: usdPerSat ?? 0,
      lkrRate: lkrPerSatFromUsd ?? lkrPerSatFromBtc ?? 0,
      // Only the BTC conversion is fixed and always correct
      btcRate: CONVERSION_CONSTANTS.SATS_TO_BTC,
    }
  } catch (error) {
    console.error("Failed to load exchange rates:", error)
    // Set zeros to trigger loading states in UI
    exchangeRates = {
      usdRate: 0,
      lkrRate: 0,
      btcRate: CONVERSION_CONSTANTS.SATS_TO_BTC, // Only keep mathematical conversion
    }
  }
}

// Synchronous conversion using cached rates
function convertSatsSync(sats: number): ConversionResult & { isLoading: boolean; hasError: boolean } {
  if (!exchangeRates) {
    // Return zeros with loading state if rates not loaded yet
    return { 
      sats, 
      usd: 0, 
      btc: sats * CONVERSION_CONSTANTS.SATS_TO_BTC, // Always calculate BTC correctly
      lkr: 0, 
      isLoading: true,
      hasError: false
    }
  }
  
  // Check if we're in a loading state (rates are 0)
  const isLoading = exchangeRates.usdRate === 0 || exchangeRates.lkrRate === 0;
  
  return {
    sats,
    usd: sats * exchangeRates.usdRate,
    lkr: sats * exchangeRates.lkrRate,
    btc: sats * exchangeRates.btcRate,
    isLoading,
    hasError: isLoading && sats > 0 // Only show error if we have sats to convert
  }
}

export function useSatsConverterSync(initialSats = 0) {
  const [sats, setSatsState] = useState<number>(initialSats)
  const [result, setResult] = useState<ConversionResult & { isLoading: boolean; hasError: boolean }>({
    sats: initialSats,
    usd: 0,
    btc: 0,
    lkr: 0,
    isLoading: true,
    hasError: false
  })
  const [isReady, setIsReady] = useState(false)

  // Load exchange rates on first use
  useEffect(() => {
    if (!ratesPromise) {
      ratesPromise = loadExchangeRates().then(() => {
        setIsReady(true)
        // Convert initial value once rates are loaded
        setResult(convertSatsSync(initialSats))
      })
    } else {
      // Rates already loading or loaded
      if (exchangeRates) {
        setIsReady(true)
        setResult(convertSatsSync(initialSats))
      } else {
        ratesPromise.then(() => {
          setIsReady(true)
          setResult(convertSatsSync(initialSats))
        })
      }
    }
  }, [initialSats])

  // Convert instantly when sats change (synchronous)
  useEffect(() => {
    if (isReady && exchangeRates) {
      const newResult = convertSatsSync(sats)
      setResult(newResult)
    }
  }, [sats, isReady])

  const setSats = useCallback((nextSats: number) => {
    if (!Number.isFinite(nextSats) || nextSats < 0) {
      setSatsState(0)
      return
    }

    setSatsState(Math.round(nextSats))
  }, [setSatsState])

  const setFromUsd = useCallback((usdValue: number) => {
    if (!exchangeRates) {
      if (usdValue === 0) {
        setSatsState(0)
      }
      return
    }

    const satsFromUsd = deriveSatsFromRate(usdValue, exchangeRates.usdRate)
    if (satsFromUsd === null) {
      return
    }

    setSatsState(satsFromUsd)
  }, [setSatsState])

  const setFromLkr = useCallback((lkrValue: number) => {
    if (!exchangeRates) {
      if (lkrValue === 0) {
        setSatsState(0)
      }
      return
    }

    const satsFromLkr = deriveSatsFromRate(lkrValue, exchangeRates.lkrRate)
    if (satsFromLkr === null) {
      return
    }

    setSatsState(satsFromLkr)
  }, [setSatsState])

  const setFromBtc = useCallback((btcValue: number) => {
    const btcRate = CONVERSION_CONSTANTS.SATS_TO_BTC
    const satsFromBtc = deriveSatsFromRate(btcValue, btcRate)
    if (satsFromBtc === null) {
      return
    }

    setSatsState(satsFromBtc)
  }, [setSatsState])

  return {
    sats,
    setSats,
    setFromUsd,
    setFromLkr,
    setFromBtc,
    result,
    isReady, // Can be used to show loading only for initial load
  }
}
