import { NextResponse } from 'next/server';

// GitHub API configuration - these values could be moved to environment variables
// if they need to be different across environments
const REPO_OWNER = 'CeyLabs';
const REPO_NAME = 'BitcoinDeepa-Web-FE';
const PER_PAGE = 10;

/**
 * GET handler for fetching GitHub releases
 * Protects API keys by handling the GitHub API call server-side
 */
export async function GET() {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    // Only add the token if it exists in environment variables
    // Use GITHUB_TOKEN (server-side only) instead of exposing it to the client
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases?per_page=${PER_PAGE}`,
      { headers }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('GitHub API error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData,
      });
      throw new Error(`Failed to fetch releases: ${response.status}`);
    }

    const data = await response.json();
    
    // Filter out pre-releases before sending to client
    const filteredData = data.filter((release: any) => !release.prerelease);
    
    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Error fetching GitHub releases:', error);
    return NextResponse.json(
      { error: 'Failed to load GitHub releases' },
      { status: 500 }
    );
  }
}
