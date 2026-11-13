import { NextResponse } from "next/server";
import { PRODUCT_KEYS, getReleases, type ProductKey } from "@/src/lib/releases";

/** Published GitHub releases for one product: ?repo=web|bot|tma. */
export async function GET(req: Request) {
  const key = (new URL(req.url).searchParams.get("repo") || "web") as ProductKey;
  if (!PRODUCT_KEYS.includes(key)) {
    return NextResponse.json({ error: "Invalid repo" }, { status: 400 });
  }

  const { releases, error } = await getReleases(key);
  if (error) {
    return NextResponse.json({ error: "Failed to load releases" }, { status: 502 });
  }
  return NextResponse.json(releases, {
    headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=600" },
  });
}
