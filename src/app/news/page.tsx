import type { Metadata } from "next";
import { JsonLd } from "@/src/components/seo/json-ld";
import { getNewsPosts, NEWS_BLOG_URL, NEWS_RSS_URL } from "@/src/lib/news";
import { pageMetadata } from "@/src/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/src/lib/site";
import { NewsGrid } from "./news-grid";

// Rebuilt in the background at most every 15 minutes (matches NEWS_REVALIDATE),
// so new blog posts appear without a deploy.
export const revalidate = 900;

const DESCRIPTION =
  "News from Bitcoin Deepa: meetups, events, Bitcoin education and stories from Sri Lanka's grassroots Bitcoin community.";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description: DESCRIPTION,
  path: "/news",
});

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <main className="relative isolate overflow-x-clip bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `News | ${SITE_NAME}`,
          url: absoluteUrl("/news"),
          description: DESCRIPTION,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.slice(0, 20).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: p.url,
              name: p.title,
            })),
          },
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-radial-[ellipse_at_top] from-bitcoin/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 pt-36 pb-24 sm:px-6 md:pt-44 lg:px-8 lg:pb-32">
        <header className="mb-12 md:mb-16">
          <h1 className="type-display text-white">News</h1>
          <p className="mt-5 max-w-2xl type-lede text-zinc-400">
            Meetups, events and stories from the community. Read more on{" "}
            <a
              href={NEWS_BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin underline decoration-bitcoin/40 underline-offset-4 hover:decoration-bitcoin"
            >
              our blog
            </a>
            .
          </p>
        </header>

        <NewsGrid posts={posts} rssUrl={NEWS_RSS_URL} />
      </div>
    </main>
  );
}
