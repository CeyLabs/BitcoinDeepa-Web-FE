"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useDebounce } from "./use-debounce"


interface ConversionResult {
  sats: number
  usd: number
  btc: number
  lkr: number
  lastUpdated: string
}

interface UseConverterState {
  result: ConversionResult | null
  isUpdating: boolean
  error: string | null
}

export function useSatsConverter(initialSats = 0) {
  const [sats, setSats] = useState<number>(initialSats)
  const [state, setState] = useState<UseConverterState>({
    result: null,
    isUpdating: false,
    error: null,
  })

  const debouncedSats = useDebounce(sats, 500) // Increased to 500ms for better UX

  // Memoize the conversion function to prevent unnecessary re-renders
  const convertSats = useCallback(async (satsAmount: number) => {
    if (satsAmount < 0) return

    // Don't show updating state for small changes
    setState((prev) => ({ ...prev, error: null }))

    try {
      const response = await fetch(`/api/convert-sats?sats=${satsAmount}`, {
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to convert satoshis")
      }

      const data = await response.json()

      setState((prev) => ({
        ...prev,
        result: data,
        isUpdating: false,
        error: null,
      }))
    } catch (err) {
      console.error("Conversion error:", err)
      setState((prev) => ({
        ...prev,
        isUpdating: false,
        error: "Failed to convert satoshis. Please try again.",
      }))
    }
  }, [])

  // Effect for handling conversions
  useEffect(() => {
    convertSats(debouncedSats)
  }, [debouncedSats, convertSats])

  // Memoize the return object to prevent unnecessary re-renders
  const returnValue = useMemo(
    () => ({
      sats,
      setSats,
      result: state.result,
      isUpdating: state.isUpdating,
      error: state.error,
    }),
    [sats, state.result, state.isUpdating, state.error],
  )

  return returnValue
}
