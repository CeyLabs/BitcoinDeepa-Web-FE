import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/src/lib/ceyloncash-fx';

/**
 * API proxy handler to avoid CORS issues with client-side requests
 */
export async function GET() {
  try {
    const response = await fetch(API_CONFIG.DIRECT_API_URL, {
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
    console.error('Error proxying API request:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
