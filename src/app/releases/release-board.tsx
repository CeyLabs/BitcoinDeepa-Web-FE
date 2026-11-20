"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  CircleDot,
  Copy,
  Download,
  FileCode2,
  GitCompare,
  Link2,
  Rss,
  Scale,
  Star,
} from "lucide-react";
import { copyText } from "@/src/app/brand/components/clipboard";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import {
  KIND_LABEL,
  PRODUCT_KEYS,
  PRODUCTS,
  repoSlug,
  repoUrl,
  type ChangeKind,
  type ParsedNotes,
  type ProductKey,
  type RepoMeta,
} from "@/src/lib/releases";

export interface ReleaseView {
  id: number;
  tag: string;
  title: string | null;
  date: string;
  url: string;
  /** Repo tree at this tag. */
  sourceUrl: string;
  /** Diff against the previous release, when there is one. */
  compare: { from: string; url: string } | null;
  notes: ParsedNotes;
  assets: Array<{ id: number; name: string; url: string; size: number }>;
}

export type FeedView = { releases: ReleaseView[]; error: string | null; meta: RepoMeta | null };

/** Anchor for one release: /releases#bot-v1.10.0 */
const releaseAnchor = (key: ProductKey, tag: string) => `${key}-${tag}`;

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

/** Small copy button that confirms with a tick. */
function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={done ? "Copied" : label}
      title={label}
      onClick={async () => {
        await copyText(text);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:ring-2 focus-visible:ring-bitcoin focus-visible:outline-none",
        className,
      )}
    >
      {done ? <Check className="size-4 text-bitcoin" /> : <Copy className="size-4" />}
    </button>
  );
}

const devLink =
  "inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-bitcoin";

/** Copies a deep link to one release. */
function PermalinkButton({ anchor }: { anchor: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label={done ? "Link copied" : "Copy link to this release"}
      title="Copy link to this release"
      onClick={async () => {
        const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
        await copyText(url);
        window.history.replaceState(null, "", `#${anchor}`);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className="inline-flex size-8 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white focus-visible:ring-2 focus-visible:ring-bitcoin focus-visible:outline-none"
    >
      {done ? <Check className="size-4 text-bitcoin" /> : <Link2 className="size-4" />}
    </button>
  );
}

/** Repo facts and shortcuts for the selected product. */
function RepoBar({ product, meta }: { product: ProductKey; meta: RepoMeta | null }) {
  const url = repoUrl(product);
  const clone = `git clone ${url}.git`;
  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between md:p-5">
      <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="font-mono text-sm font-medium text-white hover:text-bitcoin">
          {repoSlug(product)}
        </a>
        {meta?.language && (
          <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400">
            <FileCode2 className="size-4" /> {meta.language}
          </span>
        )}
        {meta?.license && (
          <span className="inline-flex items-center gap-1.5 text-sm text-zinc-400">
            <Scale className="size-4" /> {meta.license}
          </span>
        )}
        {meta && (
          <a href={`${url}/stargazers`} target="_blank" rel="noopener noreferrer" className={devLink}>
            <Star className="size-4" /> <span className="tabular-nums">{meta.stars}</span>
          </a>
        )}
        <a href={`${url}/issues`} target="_blank" rel="noopener noreferrer" className={devLink}>
          <CircleDot className="size-4" />
          {meta ? <span className="tabular-nums">{meta.openIssues} open issues</span> : "Issues"}
        </a>
        <a href={`${url}/releases.atom`} target="_blank" rel="noopener noreferrer" className={devLink}>
          <Rss className="size-4" /> Atom feed
        </a>
      </div>
      <div className="flex min-w-0 items-center gap-1 rounded-md bg-black py-1 pr-1 pl-3">
        <code className="min-w-0 flex-1 truncate font-mono text-sm text-zinc-300">
          <span className="select-none text-zinc-600">$ </span>
          {clone}
        </code>
        <CopyButton text={clone} label="Copy clone command" />
      </div>
    </div>
  );
}

function ReleaseEntry({ product, release, latest }: { product: ProductKey; release: ReleaseView; latest: boolean }) {
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
    <article
      id={releaseAnchor(product, release.tag)}
      className="grid scroll-mt-28 gap-6 border-t border-zinc-800 py-12 md:grid-cols-[220px_1fr] md:gap-12 md:py-16"
    >
      {/* Version rail */}
      <header className="self-start md:sticky md:top-28">
        <div className="group/tag flex items-center gap-2">
          <h2 className="font-mono text-3xl font-medium tracking-[-0.04em] text-white tabular-nums md:text-4xl">{release.tag}</h2>
          {latest && (
            <span className="flex h-7 items-center rounded-md bg-bitcoin px-2.5 text-sm font-medium text-black">Latest</span>
          )}
          <PermalinkButton anchor={releaseAnchor(product, release.tag)} />
        </div>
        <time dateTime={release.date} className="mt-2 block text-zinc-400">
          {formatDate(release.date)}
        </time>
        {release.title && <p className="mt-1 text-sm text-zinc-500">{release.title}</p>}
        <ul className="mt-5 space-y-2">
          <li>
            <a href={release.url} target="_blank" rel="noopener noreferrer" className={devLink}>
              <ArrowUpRight className="size-4" /> Release on GitHub
            </a>
          </li>
          <li>
            <a href={release.sourceUrl} target="_blank" rel="noopener noreferrer" className={devLink}>
              <FileCode2 className="size-4" /> Source at <span className="font-mono">{release.tag}</span>
            </a>
          </li>
          {release.compare && (
            <li>
              <a href={release.compare.url} target="_blank" rel="noopener noreferrer" className={devLink}>
                <GitCompare className="size-4" />
                <span className="font-mono">
                  {release.compare.from}…{release.tag}
                </span>
              </a>
            </li>
          )}
        </ul>
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
                    {item.breaking && (
                      <span className="mr-2 inline-flex h-6 items-center rounded-md bg-[#8D183A] px-2 align-[1px] text-xs font-medium text-white">
                        Breaking
                      </span>
                    )}
                    {item.scope && (
                      <span className="mr-2 inline-flex h-6 items-center rounded-md bg-zinc-800 px-2 align-[1px] font-mono text-xs text-zinc-300">
                        {item.scope}
                      </span>
                    )}
                    <Inline text={item.text} />
                    {item.author && (
                      <a
                        href={`https://github.com/${item.author}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-sm whitespace-nowrap text-zinc-500 hover:text-bitcoin"
                      >
                        @{item.author}
                      </a>
                    )}
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

        {notes.contributors.length > 0 && (
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
          </footer>
        )}
      </div>
    </article>
  );
}

export function ReleaseBoard({ feeds }: { feeds: Record<ProductKey, FeedView> }) {
  const [active, setActive] = useState<ProductKey>("web");
  // Release anchor to scroll to once the matching product's list has rendered.
  const [pendingAnchor, setPendingAnchor] = useState<string | null>(null);

  // Deep links: /releases#bot opens the bot's notes; /releases#bot-v1.10.0 jumps to one release.
  useEffect(() => {
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const key = PRODUCT_KEYS.find((k) => hash === k || hash.startsWith(`${k}-`));
      if (!key) return;
      setActive(key);
      if (hash !== key) setPendingAnchor(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (!pendingAnchor) return;
    // Wait a beat: the smooth-scroll layer starts after this component's
    // effects and would otherwise reset the position.
    const id = setTimeout(() => {
      const el = document.getElementById(pendingAnchor);
      setPendingAnchor(null);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112 });
    }, 250);
    return () => clearTimeout(id);
  }, [pendingAnchor, active]);

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
              <span className="mt-3 font-mono text-xs text-zinc-500">{repoSlug(key)}</span>
              <span className="mt-auto flex items-baseline gap-2 pt-4">
                {latest ? (
                  <>
                    <span className="font-mono text-xl font-medium tabular-nums text-bitcoin">{latest.tag}</span>
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

      <RepoBar product={active} meta={feed.meta} />

      <div id="release-timeline" role="tabpanel" aria-label={`${PRODUCTS[active].full} releases`} className="mt-12 md:mt-16">
        {feed.releases.map((r, i) => (
          <ReleaseEntry key={r.id} product={active} release={r} latest={i === 0} />
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
