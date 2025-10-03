import { NextResponse } from 'next/server';
import { EMPTY_RATES, API_CONFIG, CURRENCY_DESCRIPTIONS } from '@/src/lib/ceyloncash-fx';

/**
 * API proxy handler for BTC price data
 */
export async function GET() {
  try {
    const response = await fetch(`${API_CONFIG.DIRECT_API_URL}/BTC`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: Math.floor(API_CONFIG.CACHE_DURATION / 1000) }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying BTC API request:', error);
    
    // Return error response to trigger loading state in UI
    return NextResponse.json({
      description: CURRENCY_DESCRIPTIONS.BTC,
      usd_price: null,
      avg_rate_lkr: null,
      _error: true,
      _loading: true
    }, { status: 200 }); // Return 200 with error flag to prevent unnecessary error logging in client
  }
}
