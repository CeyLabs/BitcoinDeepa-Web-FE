import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Github } from "@/src/components/icons";
import { buttonVariants } from "@/src/components/ui/button";
import { pageMetadata } from "@/src/lib/seo";
import {
  GITHUB_ORG,
  GITHUB_ORG_URL,
  PRODUCT_KEYS,
  getReleases,
  getRepoMeta,
  parseReleaseNotes,
  repoUrl,
  type ProductKey,
} from "@/src/lib/releases";
import { ReleaseBoard, type FeedView } from "./release-board";

export const metadata: Metadata = pageMetadata({
  title: "Release Notes",
  description:
    "Release notes for the Bitcoin Deepa website, BitcoinDeepaBot and Telegram mini app: new features, improvements and fixes from Sri Lanka's Bitcoin community.",
  path: "/releases",
});

// Re-read GitHub at most every five minutes.
export const revalidate = 300;

export default async function ReleasesPage() {
  const [raw, metas] = await Promise.all([
    Promise.all(PRODUCT_KEYS.map((key) => getReleases(key))),
    Promise.all(PRODUCT_KEYS.map((key) => getRepoMeta(key))),
  ]);

  // Parse on the server so the client only receives plain, ready-to-render data.
  const feeds = Object.fromEntries(
    PRODUCT_KEYS.map((key, i) => {
      const { releases, error } = raw[i];
      const repo = repoUrl(key);
      const view: FeedView = {
        error,
        meta: metas[i],
        releases: releases.map((r, j) => {
          const notes = parseReleaseNotes(r.body, key);
          // Releases arrive newest first, so the next one is the previous version.
          const previous = releases[j + 1];
          return {
            id: r.id,
            tag: r.tag_name,
            title: r.name && r.name !== r.tag_name ? r.name : null,
            date: r.published_at,
            url: r.html_url,
            sourceUrl: `${repo}/tree/${encodeURIComponent(r.tag_name)}`,
            compare: previous
              ? { from: previous.tag_name, url: notes.compareUrl ?? `${repo}/compare/${previous.tag_name}...${r.tag_name}` }
              : null,
            notes,
            assets: r.assets.map((a) => ({ id: a.id, name: a.name, url: a.browser_download_url, size: a.size })),
          };
        }),
      };
      return [key, view];
    }),
  ) as Record<ProductKey, FeedView>;

  return (
    <main className="mx-auto max-w-6xl px-4 pt-36 pb-24 sm:px-6 md:pt-44 md:pb-32 lg:px-8">
      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end md:gap-16">
        <h1 className="type-display text-white">
          Release
          <br />
          notes
        </h1>
        <div>
          <p className="type-lede text-zinc-400">
            What&apos;s new across the website, BitcoinDeepaBot and its Telegram Mini App: every feature,
            improvement and fix, straight from our open-source repos.
          </p>
          <a
            href={GITHUB_ORG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 ${buttonVariants({ variant: "secondary" })}`}
          >
            <Github /> github.com/{GITHUB_ORG} <ArrowUpRight />
          </a>
        </div>
      </div>

      <ReleaseBoard feeds={feeds} />
    </main>
  );
}
