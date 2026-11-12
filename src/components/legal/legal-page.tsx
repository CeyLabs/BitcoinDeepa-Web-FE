import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl, SITE_NAME } from "@/src/lib/site";
import { JsonLd } from "@/src/components/seo/json-ld";
import { LEGAL_DOCS, type LegalSectionRef } from "./legal-docs";
import { LegalShare } from "./legal-share";
import { LegalToc } from "./legal-toc";

interface LegalPageProps {
  title: string;
  /** Short category shown in the pill next to the date. */
  tag: string;
  /** Human date, e.g. "Nov 09, 2026". */
  updated: string;
  /** ISO date for <time dateTime>, e.g. "2026-11-09". */
  updatedIso: string;
  path: string;
  sections: LegalSectionRef[];
  children: ReactNode;
}

/**
 * Shared layout for legal documents: breadcrumb, title block, sticky contents
 * rail on the left, the document in the middle, share and related documents
 * on the right. Content inside uses the `legal-prose` styles in globals.css.
 */
export function LegalPage({ title, tag, updated, updatedIso, path, sections, children }: LegalPageProps) {
  const url = absoluteUrl(path);
  const others = LEGAL_DOCS.filter((d) => d.href !== path);

  return (
    <main className="relative isolate bg-black pt-36 pb-24 md:pt-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: title, item: url },
          ],
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[520px] bg-radial-[ellipse_at_top] from-bitcoin/10 via-transparent to-transparent"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        <header className="mx-auto mb-14 max-w-4xl text-center md:mb-20">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center justify-center gap-2 text-sm text-zinc-400 md:text-base">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {SITE_NAME}
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="text-bitcoin">
                {title}
              </li>
            </ol>
          </nav>
          <h1 className="text-4xl font-medium tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-300 md:text-base">
            <span className="flex h-7 items-center rounded-md bg-zinc-800 px-2.5 text-sm text-zinc-300">
              {tag}
            </span>
            <span>
              Last updated <time dateTime={updatedIso}>{updated}</time>
            </span>
          </div>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,15rem)_minmax(0,42rem)_minmax(0,13rem)] lg:justify-between lg:gap-12 xl:grid-cols-[minmax(0,17rem)_minmax(0,44rem)_minmax(0,16.5rem)]">
          <aside className="lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:self-start lg:overflow-y-auto lg:pb-6 hide-scrollbar">
            <LegalToc sections={sections} />
          </aside>

          <article className="legal-prose min-w-0">{children}</article>

          <aside className="space-y-10 lg:sticky lg:top-32 lg:self-start">
            <div>
              <h2 className="mb-4 text-2xl text-white">Share</h2>
              <LegalShare url={url} title={`${title} | ${SITE_NAME}`} />
            </div>
            {others.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl text-white">Legal</h2>
                <ul className="space-y-3 text-[15px]">
                  {others.map((d) => (
                    <li key={d.href}>
                      <Link href={d.href} className="text-zinc-400 transition-colors hover:text-bitcoin">
                        {d.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}

/** A top-level section of a legal document; its id feeds the contents rail. */
export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-32">
      <h2 id={`${id}-heading`}>{title}</h2>
      {children}
    </section>
  );
}
