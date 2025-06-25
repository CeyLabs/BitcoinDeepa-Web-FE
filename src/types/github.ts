/**
 * GitHub Release API response types
 */

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  author: {
    login: string;
  };
  assets: Array<{
    id: number;
    name: string;
    download_count: number;
    browser_download_url: string;
  }>;
}
