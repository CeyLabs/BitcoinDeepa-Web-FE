"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import type { LegalSectionRef } from "./legal-docs";

// The section whose heading most recently crossed the top band of the viewport.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // First section (in document order) that is in the band wins; if none
        // is, keep the last one so the highlight doesn't flicker off.
        const first = ids.find((id) => visible.has(id));
        if (first) setActive(first);
      },
      // A band from just under the floating navbar to 60% down the viewport.
      { rootMargin: "-120px 0px -60% 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function TocList({
  sections,
  active,
  onNavigate,
}: {
  sections: LegalSectionRef[];
  active: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ol className="relative border-l border-zinc-800">
      {sections.map((s) => {
        const isActive = s.id === active;
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-2.5 pl-5 pr-2 text-[15px] leading-snug transition-colors",
                isActive
                  ? "border-bitcoin text-white"
                  : "border-transparent text-zinc-400 hover:border-zinc-600 hover:text-zinc-200",
              )}
            >
              {s.title}
            </a>
          </li>
        );
      })}
    </ol>
  );
}

/** Sticky contents rail (desktop) and a collapsible contents panel (mobile). */
export function LegalToc({ sections }: { sections: LegalSectionRef[] }) {
  const ids = sections.map((s) => s.id);
  // Stable dependency for the observer effect.
  const key = ids.join("|");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const active = useActiveSection(useMemoIds(key));
  const [open, setOpen] = useState(false);

  if (sections.length === 0) return null;

  return (
    <>
      {/* Mobile / tablet */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-5 py-4 text-left text-white"
        >
          <span className="text-lg">Contents</span>
          <ChevronDown
            className={cn("size-5 text-zinc-400 transition-transform", open && "rotate-180")}
          />
        </button>
        {open && (
          <nav aria-label="Contents" className="mt-3 rounded-xl bg-zinc-900 px-3 py-3">
            <TocList sections={sections} active={active} onNavigate={() => setOpen(false)} />
          </nav>
        )}
      </div>

      {/* Desktop */}
      <nav aria-label="Contents" className="hidden lg:block">
        <h2 className="mb-6 text-2xl text-white">Contents</h2>
        <TocList sections={sections} active={active} />
      </nav>
    </>
  );
}

// Keeps the ids array referentially stable across renders for the same list.
const idCache = new Map<string, string[]>();
function useMemoIds(key: string): string[] {
  let ids = idCache.get(key);
  if (!ids) {
    ids = key ? key.split("|") : [];
    idCache.set(key, ids);
  }
  return ids;
}
