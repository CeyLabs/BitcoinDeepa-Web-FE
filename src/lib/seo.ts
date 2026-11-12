import type { Metadata } from "next";
import { SITE_NAME } from "./site";

export const TWITTER_HANDLE = "@pearlofsatoshi";

// app/opengraph-image.png is only applied automatically to segments that don't
// set openGraph themselves, so pages that do reference it explicitly.
const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

interface PageMetadataInput {
  /** Page title without the site name; the root layout's template appends it. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/terms". Used for the canonical and og:url. */
  path: string;
  keywords?: string[];
  /** Extra OpenGraph fields (e.g. images) when a page needs its own. */
  openGraph?: Metadata["openGraph"];
  twitter?: Metadata["twitter"];
}

/**
 * Per-page metadata with a canonical URL and complete OpenGraph/Twitter
 * objects. Next.js replaces (not merges) a parent's `openGraph`, so every page
 * sets the full object here instead of a partial one that would drop
 * siteName/url. The default share image comes from app/opengraph-image.png.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  openGraph,
  twitter,
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_LK",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
      ...twitter,
    },
  };
}
