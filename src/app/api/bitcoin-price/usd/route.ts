import { NextResponse } from 'next/server'
import { API_CONFIG, CURRENCY_DESCRIPTIONS } from '@/src/lib/ceyloncash-fx'

/**
 * API proxy handler for USD price data
 */
export async function GET() {
  try {
    const response = await fetch(`${API_CONFIG.DIRECT_API_URL}/USD`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: Math.floor(API_CONFIG.CACHE_DURATION / 1000) }
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error proxying USD API request:', error)

    return NextResponse.json({
      description: CURRENCY_DESCRIPTIONS.USD ?? 'USD',
      buying_rate: null,
      selling_rate: null,
      _error: true,
      _loading: true
    }, { status: 200 })
  }
}
