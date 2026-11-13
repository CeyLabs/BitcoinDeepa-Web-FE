import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { pageMetadata } from "@/src/lib/seo";
import { PRODUCT_KEYS, getReleases, parseReleaseNotes, type ProductKey } from "@/src/lib/releases";
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
  const raw = await Promise.all(PRODUCT_KEYS.map((key) => getReleases(key)));

  // Parse on the server so the client only receives plain, ready-to-render data.
  const feeds = Object.fromEntries(
    PRODUCT_KEYS.map((key, i) => {
      const { releases, error } = raw[i];
      const view: FeedView = {
        error,
        releases: releases.map((r) => ({
          id: r.id,
          tag: r.tag_name,
          title: r.name && r.name !== r.tag_name ? r.name : null,
          date: r.published_at,
          url: r.html_url,
          notes: parseReleaseNotes(r.body, key),
          assets: r.assets.map((a) => ({ id: a.id, name: a.name, url: a.browser_download_url, size: a.size })),
        })),
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
            href="https://github.com/CeyLabs"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 ${buttonVariants({ variant: "secondary" })}`}
          >
            Follow on GitHub <ArrowUpRight />
          </a>
        </div>
      </div>

      <ReleaseBoard feeds={feeds} />
    </main>
  );
}
