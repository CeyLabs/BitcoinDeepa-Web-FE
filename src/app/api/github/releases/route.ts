import { NextResponse } from "next/server"

// Repository configurations
const REPOSITORIES = {
  web: {
    owner: "CeyLabs",
    repo: "BitcoinDeepa-Web-FE",
    isPrivate: true,
  },
  bot: {
    owner: "CeyLabs",
    repo: "BitcoinDeepaBot",
    isPrivate: false,
  },
  tma: {
    owner: "CeyLabs",
    repo: "BitcoinDeepaBot-TMA",
    isPrivate: false,
  },
}

const PER_PAGE = 10

/**
 * GET handler for fetching GitHub releases from multiple repositories
 * Supports query parameter: ?repo=web|bot|tma
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const repoParam = searchParams.get("repo") || "web"

    // Validate repository parameter
    if (!Object.keys(REPOSITORIES).includes(repoParam)) {
      return NextResponse.json({ error: "Invalid repository specified" }, { status: 400 })
    }

    const repoConfig = REPOSITORIES[repoParam as keyof typeof REPOSITORIES]

    // Check if GitHub token is required and available
    if (repoConfig.isPrivate && !process.env.GITHUB_TOKEN) {
      return NextResponse.json({ error: "GitHub token required for private repository" }, { status: 401 })
    }

    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "X-Github-Api-Version": "2022-11-28",
    }

    // Add authorization header if token is available (required for private repos)
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(
      `https://api.github.com/repos/${repoConfig.owner}/${repoConfig.repo}/releases?per_page=${PER_PAGE}`,
      {
        headers,
        // Add caching for better performance
        next: { revalidate: 300 }, // Cache for 5 minutes
      },
    )

    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("GitHub API error:", {
        repo: `${repoConfig.owner}/${repoConfig.repo}`,
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      })
      throw new Error(`Failed to fetch releases: ${response.status}`)
    }

    const data = await response.json()

    // Filter out pre-releases and drafts before sending to client
    const filteredData = data.filter((release: any) => !release.prerelease && !release.draft)

    return NextResponse.json(filteredData, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    })
  } catch (error) {
    console.error("Error fetching GitHub releases:", error)
    return NextResponse.json({ error: "Failed to load GitHub releases" }, { status: 500 })
  }
}
