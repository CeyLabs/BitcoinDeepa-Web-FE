"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Rss, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { NewsPost } from "@/src/lib/news";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Colombo",
});

function NewsCard({ post, priority }: { post: NewsPost; priority: boolean }) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-xl bg-zinc-900 outline-none transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-bitcoin"
    >
      <div className="relative aspect-[1.91/1] overflow-hidden bg-zinc-800">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Image src="/assets/brand/kit/04-Yaka-Symbol/Yaka.svg" alt="" width={72} height={88} />
          </div>
        )}
        {post.tags[0] && (
          <span className="absolute top-3 left-3 flex h-7 items-center rounded-md bg-zinc-900 px-2.5 text-xs font-medium text-zinc-200">
            {post.tags[0]}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h2 className="line-clamp-2 text-xl leading-snug font-medium text-white transition-colors group-hover:text-bitcoin">
          {post.title}
        </h2>
        {post.excerpt && <p className="mt-2 line-clamp-3 leading-relaxed text-zinc-400">{post.excerpt}</p>}
        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-zinc-500">
          <span>
            <time dateTime={post.publishedAt}>{dateFmt.format(new Date(post.publishedAt))}</time>
            {post.readingTime ? ` · ${post.readingTime} min read` : null}
          </span>
          <ArrowUpRight className="size-4 transition-colors group-hover:text-bitcoin" aria-hidden />
        </div>
      </div>
    </a>
  );
}

/** Category filters, search and the post grid (client-side; posts come from the server). */
export function NewsGrid({ posts, rssUrl }: { posts: NewsPost[]; rssUrl: string }) {
  const categories = useMemo(() => {
    const seen = new Map<string, number>();
    for (const p of posts) for (const t of p.tags) seen.set(t, (seen.get(t) ?? 0) + 1);
    return [...seen.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
  }, [posts]);

  const [category, setCategory] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (!category || p.tags.includes(category)) &&
        (!q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)),
    );
  }, [posts, category, query]);

  const tab = (label: string, value: string | null) => (
    <button
      key={label}
      type="button"
      role="tab"
      aria-selected={category === value}
      onClick={() => setCategory(value)}
      className={cn(
        "shrink-0 text-lg transition-colors md:text-xl",
        category === value ? "text-white" : "text-zinc-500 hover:text-zinc-300",
      )}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Categories" className="hide-scrollbar flex gap-6 overflow-x-auto md:gap-8">
          {tab("All", null)}
          {categories.map((c) => tab(c, c))}
        </div>
        <div className="flex items-center gap-3">
          <label className="relative block w-full md:w-72">
            <span className="sr-only">Search news</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-11 w-full rounded-xl bg-zinc-900 pr-4 pl-10 text-white placeholder:text-zinc-500 outline-none focus-visible:ring-2 focus-visible:ring-bitcoin"
            />
          </label>
          <a
            href={rssUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="RSS feed"
            title="RSS feed"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-bitcoin"
          >
            <Rss className="size-5" />
          </a>
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <NewsCard key={post.id} post={post} priority={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-900 p-8 text-zinc-400">
          {posts.length === 0
            ? "We couldn't load the latest news right now. Please check back soon."
            : "No posts match your search."}
        </div>
      )}
    </>
  );
}
