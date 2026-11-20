/**
 * Release notes for the Bitcoin Deepa products, read from GitHub releases.
 *
 * The repos write notes in different shapes (Keep-a-Changelog sections with
 * emoji, GitHub's auto "What's Changed", bare commit logs with SHAs), so
 * `parseReleaseNotes` normalises them into one structure the page can render
 * consistently, without injecting HTML.
 */

export const PRODUCTS = {
  web: {
    name: "Website",
    full: "Bitcoin Deepa website",
    blurb: "This site: events, news, the converter and the book store.",
    owner: "CeyLabs",
    repo: "BitcoinDeepa-Web-FE",
  },
  bot: {
    name: "BitcoinDeepaBot",
    full: "BitcoinDeepaBot",
    blurb: "The Telegram Lightning wallet and tip bot for group chats.",
    owner: "CeyLabs",
    repo: "BitcoinDeepaBot",
  },
  tma: {
    name: "Mini App",
    full: "BitcoinDeepaBot Mini App",
    blurb: "The Telegram Mini App that goes with the bot.",
    owner: "CeyLabs",
    repo: "BitcoinDeepaBot-TMA",
  },
} as const;

export type ProductKey = keyof typeof PRODUCTS;
export const PRODUCT_KEYS = Object.keys(PRODUCTS) as ProductKey[];

export const repoUrl = (key: ProductKey) => `https://github.com/${PRODUCTS[key].owner}/${PRODUCTS[key].repo}`;

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string | null;
  body: string | null;
  html_url: string;
  published_at: string;
  prerelease: boolean;
  draft?: boolean;
  author: { login: string };
  assets: Array<{ id: number; name: string; download_count: number; browser_download_url: string; size: number }>;
}

export type ReleaseFeed = { releases: GitHubRelease[]; error: string | null };

/** Published releases for one product, cached for five minutes. Never throws. */
export async function getReleases(key: ProductKey): Promise<ReleaseFeed> {
  const { owner, repo } = PRODUCTS[key];
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=20`, {
      headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      next: { revalidate: 300 },
    });
    if (!res.ok) return { releases: [], error: `GitHub returned ${res.status}` };
    const data = (await res.json()) as GitHubRelease[];
    return { releases: data.filter((r) => !r.prerelease && !r.draft), error: null };
  } catch {
    return { releases: [], error: "Couldn't reach GitHub" };
  }
}

/* ------------------------------------------------------------------ */
/* Parsing                                                             */
/* ------------------------------------------------------------------ */

export type ChangeKind = "new" | "improved" | "fixed" | "maintenance" | "other";

export const KIND_ORDER: ChangeKind[] = ["new", "improved", "fixed", "maintenance", "other"];

export const KIND_LABEL: Record<ChangeKind, string> = {
  new: "New",
  improved: "Improved",
  fixed: "Fixed",
  maintenance: "Maintenance",
  other: "Changes",
};

export interface ChangeItem {
  text: string;
  kind: ChangeKind;
  author?: string;
  pr?: { number: string; url: string };
}

export interface ParsedNotes {
  /** Free text that isn't a list item (intros, notes). */
  paragraphs: string[];
  /** Changes grouped by kind, in display order; empty groups omitted. */
  groups: Array<{ kind: ChangeKind; items: ChangeItem[] }>;
  total: number;
  contributors: string[];
  newContributors: string[];
  compareUrl?: string;
}

const EMOJI = /[\p{Extended_Pictographic}️‍]/gu;

function kindFromHeading(title: string): ChangeKind | null {
  const t = title.toLowerCase();
  if (/feature|added|\bnew\b/.test(t)) return "new";
  if (/improve|enhance|changed|refactor|perf|update/.test(t)) return "improved";
  if (/fix|bug|patch/.test(t)) return "fixed";
  if (/chore|maintenance|docs|internal|dependenc/.test(t)) return "maintenance";
  return null;
}

const PREFIX = /^(feat|feature|fix|bugfix|hotfix|perf|refactor|improve|chore|docs|style|test|tests|build|ci|deps)(\([^)]*\))?!?:\s*/i;

function kindFromPrefix(prefix: string): ChangeKind {
  const p = prefix.toLowerCase();
  if (p.startsWith("feat")) return "new";
  if (p.includes("fix")) return "fixed";
  if (p === "perf" || p === "refactor" || p === "improve") return "improved";
  return "maintenance";
}

const capitalise = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

function parseItem(raw: string, sectionKind: ChangeKind | null, base: string): ChangeItem | null {
  let text = raw.trim();
  // Leading commit SHA from generated changelogs.
  text = text.replace(/^[0-9a-f]{7,40}\s+/, "");

  let author: string | undefined;
  let pr: ChangeItem["pr"];

  // "... by @user in https://github.com/.../pull/12" or "in [#12](url)" or "in #12"
  const by = text.match(
    /\s+by\s+@([\w-]+)\s+in\s+(?:\[#(\d+)\]\((\S+?)\)|(https:\/\/github\.com\/\S+?\/pull\/(\d+))|#(\d+))\s*$/,
  );
  if (by) {
    author = by[1];
    const num = by[2] ?? by[5] ?? by[6];
    const url = by[3] ?? by[4] ?? `${base}/pull/${num}`;
    pr = { number: num, url };
    text = text.slice(0, by.index).trim();
  } else {
    // Trailing "(#71)" from squash-merge titles.
    const tail = text.match(/\s*\(#(\d+)\)\s*$/);
    if (tail) {
      pr = { number: tail[1], url: `${base}/pull/${tail[1]}` };
      text = text.slice(0, tail.index).trim();
    }
  }

  let kind: ChangeKind = sectionKind ?? "other";
  const prefix = text.match(PREFIX);
  if (prefix) {
    kind = kindFromPrefix(prefix[1]);
    text = text.slice(prefix[0].length);
  }
  text = capitalise(text.replace(EMOJI, "").replace(/\s{2,}/g, " ").trim());
  if (!text) return null;
  return { text, kind, author, pr };
}

export function parseReleaseNotes(body: string | null | undefined, key: ProductKey): ParsedNotes {
  const base = repoUrl(key);
  const paragraphs: string[] = [];
  const items: ChangeItem[] = [];
  const newContributors: string[] = [];
  let compareUrl: string | undefined;
  let sectionKind: ChangeKind | null = null;
  let inNewContributors = false;

  for (const rawLine of (body ?? "").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) continue;

    const changelog = line.match(/^\**Full Changelog\**:?\**\s*:?\s*(https?:\/\/\S+)/i);
    if (changelog) {
      compareUrl = changelog[1];
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      // A top-level "# [v1.0.0] – date" repeats the release title; skip it.
      if (heading[1].length === 1) continue;
      const title = heading[2].replace(EMOJI, "").trim();
      inNewContributors = /new contributors/i.test(title);
      sectionKind = kindFromHeading(title);
      continue;
    }

    const bullet = line.match(/^[-*+]\s+(.*)$/);
    if (bullet) {
      if (inNewContributors) {
        const who = bullet[1].match(/@([\w-]+)/);
        if (who) newContributors.push(who[1]);
        continue;
      }
      const item = parseItem(bullet[1], sectionKind, base);
      if (item) items.push(item);
      continue;
    }

    if (!inNewContributors) paragraphs.push(line.replace(EMOJI, "").trim());
  }

  const groups = KIND_ORDER.map((kind) => ({ kind, items: items.filter((i) => i.kind === kind) })).filter(
    (g) => g.items.length > 0,
  );
  const contributors = [...new Set(items.map((i) => i.author).filter((a): a is string => !!a))];

  return { paragraphs, groups, total: items.length, contributors, newContributors, compareUrl };
}
