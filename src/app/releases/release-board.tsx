"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import {
  KIND_LABEL,
  PRODUCT_KEYS,
  PRODUCTS,
  repoUrl,
  type ChangeKind,
  type ParsedNotes,
  type ProductKey,
} from "@/src/lib/releases";

export interface ReleaseView {
  id: number;
  tag: string;
  title: string | null;
  date: string;
  url: string;
  notes: ParsedNotes;
  assets: Array<{ id: number; name: string; url: string; size: number }>;
}

export type FeedView = { releases: ReleaseView[]; error: string | null };

/** Changes shown before "Show all" on long releases. */
const COLLAPSE_AT = 8;

const KIND_CHIP: Record<ChangeKind, string> = {
  new: "bg-bitcoin text-black",
  improved: "bg-zinc-100 text-black",
  fixed: "bg-zinc-700 text-white",
  maintenance: "bg-zinc-800 text-zinc-300",
  other: "bg-zinc-800 text-zinc-300",
};

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const formatDate = (iso: string) => dateFmt.format(new Date(iso));
const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;

const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\)|https?:\/\/[^\s)]+)/g;
const link = "text-bitcoin underline-offset-4 hover:underline";

/** Minimal, safe inline markdown: `code`, **bold**, [text](url) and bare URLs. */
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i) => {
        if (!part) return null;
        if (part.startsWith("`") && part.endsWith("`"))
          return (
            <code key={i} className="rounded-md bg-zinc-800 px-1.5 py-0.5 font-mono text-[0.85em] text-zinc-100">
              {part.slice(1, -1)}
            </code>
          );
        if (part.startsWith("**") && part.endsWith("**"))
          return (
            <strong key={i} className="font-medium text-white">
              {part.slice(2, -2)}
            </strong>
          );
        const md = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
        if (md)
          return (
            <a key={i} href={md[2]} target="_blank" rel="noopener noreferrer" className={link}>
              {md[1]}
            </a>
          );
        if (/^https?:\/\//.test(part))
          return (
            <a key={i} href={part} target="_blank" rel="noopener noreferrer" className={cn(link, "break-all")}>
              {part.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

function People({ names }: { names: string[] }) {
  return (
    <>
      {names.map((n, i) => (
        <Fragment key={n}>
          {i > 0 && ", "}
          <a href={`https://github.com/${n}`} target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-bitcoin">
            @{n}
          </a>
        </Fragment>
      ))}
    </>
  );
}

function ReleaseEntry({ release, latest }: { release: ReleaseView; latest: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { notes } = release;

  // Collapse across groups, keeping group order.
  let budget = expanded ? Infinity : COLLAPSE_AT;
  const visible = notes.groups
    .map((g) => {
      const items = g.items.slice(0, Math.max(0, budget));
      budget -= items.length;
      return { ...g, items };
    })
    .filter((g) => g.items.length > 0);
  const hidden = notes.total - visible.reduce((n, g) => n + g.items.length, 0);

  return (
    <article className="grid gap-6 border-t border-zinc-800 py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16">
      {/* Version rail */}
      <header className="self-start md:sticky md:top-28">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-medium tracking-[-0.03em] text-white tabular-nums md:text-4xl">{release.tag}</h2>
          {latest && (
            <span className="flex h-7 items-center rounded-md bg-bitcoin px-2.5 text-sm font-medium text-black">Latest</span>
          )}
        </div>
        <time dateTime={release.date} className="mt-2 block text-zinc-400">
          {formatDate(release.date)}
        </time>
        {release.title && <p className="mt-1 text-sm text-zinc-500">{release.title}</p>}
        <a
          href={release.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-bitcoin"
        >
          View on GitHub <ArrowUpRight className="size-3.5" />
        </a>
      </header>

      {/* Changes */}
      <div className="min-w-0">
        {/* Summary chips only help when there's more than one kind of change. */}
        {notes.groups.length > 1 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {notes.groups.map((g) => (
              <span key={g.kind} className={cn("flex h-7 items-center rounded-md px-2.5 text-sm font-medium", KIND_CHIP[g.kind])}>
                {g.items.length}{" "}
                {g.kind === "other" ? (g.items.length === 1 ? "change" : "changes") : KIND_LABEL[g.kind].toLowerCase()}
              </span>
            ))}
          </div>
        )}

        {notes.paragraphs.map((p, i) => (
          <p key={i} className="mt-5 leading-relaxed text-zinc-300">
            <Inline text={p} />
          </p>
        ))}

        {visible.map((g) => (
          <section key={g.kind} className="mt-6 first-of-type:mt-0 md:mt-8">
            <h3 className="type-eyebrow text-zinc-500">{KIND_LABEL[g.kind]}</h3>
            <ul className="mt-3 divide-y divide-zinc-800/70">
              {g.items.map((item, i) => (
                <li key={i} className="flex items-baseline gap-4 py-3 leading-relaxed text-zinc-200">
                  <span className="min-w-0 flex-1">
                    <Inline text={item.text} />
                  </span>
                  {item.pr && (
                    <a
                      href={item.pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 font-mono text-sm text-zinc-500 transition-colors hover:text-bitcoin"
                    >
                      #{item.pr.number}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {hidden > 0 && (
          <Button variant="subtle" size="sm" onClick={() => setExpanded(true)} className="mt-4">
            Show {hidden} more change{hidden === 1 ? "" : "s"} <ChevronDown />
          </Button>
        )}

        {notes.total === 0 && notes.paragraphs.length === 0 && (
          <p className="text-zinc-400">No notes were written for this release.</p>
        )}

        {release.assets.length > 0 && (
          <section className="mt-8">
            <h3 className="type-eyebrow text-zinc-500">Downloads</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {release.assets.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.url}
                    className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-zinc-800"
                  >
                    <Download className="size-4 text-bitcoin" />
                    {a.name}
                    <span className="text-zinc-500 tabular-nums">{formatSize(a.size)}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {(notes.contributors.length > 0 || notes.compareUrl) && (
          <footer className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-zinc-500">
            {notes.contributors.length > 0 && (
              <span>
                By <People names={notes.contributors} />
              </span>
            )}
            {notes.newContributors.length > 0 && (
              <span>
                First contribution from <People names={notes.newContributors} />
              </span>
            )}
            {notes.compareUrl && (
              <a
                href={notes.compareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-zinc-400 transition-colors hover:text-bitcoin"
              >
                Full changelog <ArrowUpRight className="size-3.5" />
              </a>
            )}
          </footer>
        )}
      </div>
    </article>
  );
}

export function ReleaseBoard({ feeds }: { feeds: Record<ProductKey, FeedView> }) {
  const [active, setActive] = useState<ProductKey>("web");

  // Deep links: /releases#bot opens the bot's notes.
  useEffect(() => {
    const sync = () => {
      const fromHash = window.location.hash.slice(1) as ProductKey;
      if (PRODUCT_KEYS.includes(fromHash)) setActive(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const choose = (key: ProductKey) => {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
  };

  const feed = feeds[active];

  return (
    <>
      {/* Product switcher: each card shows that product's latest version. */}
      <div role="tablist" aria-label="Product" className="mt-12 grid gap-2 sm:grid-cols-3 md:mt-16">
        {PRODUCT_KEYS.map((key) => {
          const latest = feeds[key].releases[0];
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="release-timeline"
              onClick={() => choose(key)}
              className={cn(
                "flex min-h-[168px] flex-col rounded-xl p-6 text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-bitcoin",
                selected ? "bg-zinc-800 ring-1 ring-bitcoin ring-inset" : "bg-zinc-900 hover:bg-zinc-800/70",
              )}
            >
              <span className="text-lg font-medium text-white">{PRODUCTS[key].name}</span>
              <span className="mt-1 text-sm leading-snug text-zinc-400">{PRODUCTS[key].blurb}</span>
              <span className="mt-auto flex items-baseline gap-2 pt-5">
                {latest ? (
                  <>
                    <span className="text-xl font-medium tabular-nums text-bitcoin">{latest.tag}</span>
                    <span className="text-sm text-zinc-500">{formatDate(latest.date)}</span>
                  </>
                ) : (
                  <span className="text-sm text-zinc-500">No releases yet</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div id="release-timeline" role="tabpanel" aria-label={`${PRODUCTS[active].full} releases`} className="mt-16 md:mt-20">
        {feed.releases.map((r, i) => (
          <ReleaseEntry key={r.id} release={r} latest={i === 0} />
        ))}

        {feed.releases.length === 0 && (
          <EmptyState>
            {feed.error
              ? "We couldn't load these release notes right now."
              : `${PRODUCTS[active].full} hasn't published a release yet.`}
          </EmptyState>
        )}

        <div className="border-t border-zinc-800 pt-8">
          <a
            href={`${repoUrl(active)}/releases`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-zinc-400 transition-colors hover:text-bitcoin"
          >
            All {PRODUCTS[active].full} releases on GitHub <ArrowUpRight className="size-4" />
          </a>
        </div>
      </div>
    </>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return <p className="border-t border-zinc-800 py-16 text-lg text-zinc-400">{children}</p>;
}
