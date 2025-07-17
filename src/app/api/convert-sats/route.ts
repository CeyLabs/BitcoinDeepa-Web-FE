import { convertSatoshis, getBitcoinPrice } from "@/src/lib/coingecko"
import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"


const querySchema = z.object({
  sats: z.string().transform((val) => {
    const num = Number.parseInt(val, 10)
    if (isNaN(num) || num < 0) {
      throw new Error("Invalid satoshi amount")
    }
    return num
  }),
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = querySchema.parse({
      sats: searchParams.get("sats") || "0",
    })

    const bitcoinPrice = await getBitcoinPrice()
    const result = convertSatoshis(query.sats, bitcoinPrice)

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Convert sats API error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input parameters" }, { status: 400 })
    }

    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
