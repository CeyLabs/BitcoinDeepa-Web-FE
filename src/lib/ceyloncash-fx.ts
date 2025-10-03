/**
 * Currency Constants - Centralized location for all exchange rate constants
 * This file contains configurations and constants used throughout the application
 */

// Default empty values for loading states - using zeros instead of fallback estimates
export const EMPTY_RATES = {
  // SATS rates
  SATS_TO_USD: 0,  // Will show as 0 during loading/error
  SATS_TO_LKR: 0,  // Will show as 0 during loading/error
  SATS_TO_BTC: 0,  // Will show as 0 during loading/error
  
  // BTC rates
  BTC_TO_USD: 0,   // Will show as 0 during loading/error
  BTC_TO_LKR: 0,   // Will show as 0 during loading/error
}

// Known conversion constants (these are fixed mathematical conversions, not estimates)
export const CONVERSION_CONSTANTS = {
  SATS_TO_BTC: 1.0e-8,  // 1 Satoshi = 10^-8 BTC (fixed mathematical conversion)
}

// API configuration
export const API_CONFIG = {
  CACHE_DURATION: 30000,    // 30 seconds cache
  PROXY_BASE_URL: "/api/bitcoin-price",
  DIRECT_API_URL: "https://fx.ceyloncash.com/currency"
}

// Currency descriptions
export const CURRENCY_DESCRIPTIONS = {
  SATS: "SATOSHI",
  BTC: "BITCOIN",
  USD: "US DOLLARS",
}
