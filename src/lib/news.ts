// News posts from the Ghost blog (blog.bitcoindeepa.com).
//
// Source order:
//   1. Ghost Content API, when GHOST_API_URL + GHOST_CONTENT_API_KEY are set
//      and the key is accepted (richer data: reading time, featured flag).
//   2. The blog's public RSS feed, which needs no key.
// So the page keeps working while the API key is missing or invalid, and
// upgrades itself once a valid key is configured.

export interface NewsPost {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  image: string | null;
  publishedAt: string;
  tags: string[];
  author: string | null;
  readingTime: number | null;
}

const BLOG_URL = "https://blog.bitcoindeepa.com";
/** Seconds between refreshes of the cached feed. */
export const NEWS_REVALIDATE = 900;

// Ghost's RSS can double-encode (e.g. "&amp;#x201c;"), so &amp; is decoded
// first and numeric entities after it. Zero-width spaces are dropped.
const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/[​-‍﻿]/g, "")
    .trim();

const stripHtml = (s: string) => decode(s).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

function tag(xml: string, name: string): string | null {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]) : null;
}

function parseRss(xml: string): NewsPost[] {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.map((item) => {
    const link = tag(item, "link") ?? BLOG_URL;
    return {
      id: tag(item, "guid") ?? link,
      title: tag(item, "title") ?? "Untitled",
      excerpt: stripHtml(tag(item, "description") ?? ""),
      url: link,
      image: item.match(/<media:content[^>]*url="([^"]+)"/)?.[1] ?? null,
      publishedAt: new Date(tag(item, "pubDate") ?? Date.now()).toISOString(),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1])),
      author: tag(item, "dc:creator"),
      readingTime: null,
    };
  });
}

async function fromRss(): Promise<NewsPost[]> {
  const res = await fetch(`${BLOG_URL}/rss/`, { next: { revalidate: NEWS_REVALIDATE } });
  if (!res.ok) throw new Error(`RSS ${res.status}`);
  return parseRss(await res.text());
}

interface GhostPost {
  id: string;
  title: string;
  url: string;
  excerpt?: string | null;
  custom_excerpt?: string | null;
  feature_image?: string | null;
  published_at: string;
  reading_time?: number;
  tags?: { name: string; visibility?: string }[];
  primary_author?: { name: string } | null;
}

async function fromContentApi(): Promise<NewsPost[] | null> {
  const base = process.env.GHOST_API_URL?.replace(/\/$/, "");
  const key = process.env.GHOST_CONTENT_API_KEY;
  if (!base || !key) return null;
  const params = new URLSearchParams({
    key,
    limit: "all",
    include: "tags,authors",
    fields: "id,title,url,excerpt,custom_excerpt,feature_image,published_at,reading_time",
  });
  const res = await fetch(`${base}/ghost/api/content/posts/?${params}`, {
    headers: { "Accept-Version": "v5.0" },
    next: { revalidate: NEWS_REVALIDATE },
  });
  if (!res.ok) return null; // e.g. 401 with a revoked key: fall back to RSS
  const data: { posts: GhostPost[] } = await res.json();
  return data.posts.map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: (p.custom_excerpt || p.excerpt || "").replace(/\s+/g, " ").trim(),
    url: p.url,
    image: p.feature_image ?? null,
    publishedAt: p.published_at,
    tags: (p.tags ?? []).filter((t) => t.visibility !== "internal").map((t) => t.name),
    author: p.primary_author?.name ?? null,
    readingTime: p.reading_time ?? null,
  }));
}

/** All published posts, newest first. Never throws: returns [] if both sources fail. */
export async function getNewsPosts(): Promise<NewsPost[]> {
  try {
    const posts = (await fromContentApi()) ?? (await fromRss());
    return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  } catch (err) {
    console.error("News: could not load posts", err);
    return [];
  }
}

export const NEWS_RSS_URL = `${BLOG_URL}/rss/`;
export const NEWS_BLOG_URL = BLOG_URL;
