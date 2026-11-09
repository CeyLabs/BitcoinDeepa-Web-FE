import { NextResponse } from "next/server"

const REPOS = {
  web: { owner: "CeyLabs", repo: "BitcoinDeepa-Web-FE", isPrivate: false },
  bot: { owner: "CeyLabs", repo: "BitcoinDeepaBot", isPrivate: false },
  tma: { owner: "CeyLabs", repo: "BitcoinDeepaBot-TMA", isPrivate: false },
} as const

type RepoKey = keyof typeof REPOS

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const repoKey = (searchParams.get("repo") || "web") as RepoKey

    const targetRepo = REPOS[repoKey]
    if (!targetRepo) {
      return NextResponse.json({ error: "Invalid repo" }, { status: 400 })
    }

    if (targetRepo.isPrivate && !process.env.GITHUB_TOKEN) {
      return NextResponse.json({ error: "Missing GitHub token" }, { status: 401 })
    }

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "X-Github-Api-Version": "2022-11-28",
    }

    if (targetRepo.isPrivate && process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const res = await fetch(
      `https://api.github.com/repos/${targetRepo.owner}/${targetRepo.repo}/releases?per_page=10`,
      {
        headers,
        next: { revalidate: 300 },
      }
    )

    if (!res.ok) {
      console.error(`GitHub API failed for ${targetRepo.repo}: ${res.status}`)
      throw new Error(`GitHub API returned ${res.status}`)
    }

    const releases = await res.json()
    const published = releases.filter((r: any) => !r.prerelease && !r.draft)

    return NextResponse.json(published, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (err) {
    console.error("Failed to fetch releases:", err)
    return NextResponse.json({ error: "Failed to load releases" }, { status: 500 })
  }
}
