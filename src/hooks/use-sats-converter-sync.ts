"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { EMPTY_RATES, CONVERSION_CONSTANTS, API_CONFIG } from '@/src/lib/ceyloncash-fx'

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

// Fetch rates once and cache them
async function loadExchangeRates(): Promise<void> {
  try {
    // Use proxy API endpoint to avoid CORS issues
    const response = await fetch(`${API_CONFIG.PROXY_BASE_URL}/sats`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data: CurrencyResponse = await response.json()
    
    // Check if API returned error flag
    if (data._error || data._loading) {
      throw new Error("API returned error or loading state");
    }
    
    exchangeRates = {
      usdRate: data.usd_price || 0,
      lkrRate: data.avg_rate_lkr || 0,
      // Only the BTC conversion is fixed and always correct
      btcRate: data.btc_equivalent || CONVERSION_CONSTANTS.SATS_TO_BTC,
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
  const [sats, setSats] = useState<number>(initialSats)
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

  return {
    sats,
    setSats,
    result,
    isReady, // Can be used to show loading only for initial load
  }
}
