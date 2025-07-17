import { getBitcoinPrice } from "@/src/lib/coingecko"
import { NextResponse } from "next/server"


export async function GET() {
  try {
    const price = await getBitcoinPrice()

    return NextResponse.json(price, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Bitcoin price API error:", error)

    return NextResponse.json({ error: "Failed to fetch Bitcoin price" }, { status: 500 })
  }
}
