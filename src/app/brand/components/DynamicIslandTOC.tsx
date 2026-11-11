"use client";

import * as React from "react";
import { cn } from "@/src/lib/utils";
import { BRAND_ORANGE, TOC_ITEMS } from "../brand-data";
import { scrollToSection, useActiveSection } from "./toc-hooks";

const IDS = TOC_ITEMS.map((item) => item.id);

function useScrollProgress() {
  const [progress, setProgress] = React.useState(0);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const next =
          docHeight > 0
            ? Math.min(100, Math.max(0, Math.round((window.scrollY / docHeight) * 100)))
            : 0;
        setProgress((prev) => (prev === next ? prev : next));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return progress;
}

function useElementHeight(ref: React.RefObject<HTMLDivElement | null>) {
  const [height, setHeight] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return height;
}

const CircularProgress = React.memo(function CircularProgress({
  progress,
  size = 28,
  strokeWidth = 2.5,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0 -rotate-90" aria-hidden="true">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={BRAND_ORANGE}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-300"
      />
    </svg>
  );
});

// Back (overshoot) easing to open, smooth ease-out to close.
const EASE_OPEN = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_CLOSE = "cubic-bezier(0.32, 0.72, 0, 1)";

/** Mobile-only floating table of contents with reading progress. */
export function DynamicIslandTOC() {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const islandRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLDivElement>(null);
  const navHeight = useElementHeight(navRef);
  const activeId = useActiveSection(IDS);
  const progress = useScrollProgress();

  const activeTitle = TOC_ITEMS.find((item) => item.id === activeId)?.title ?? "Contents";
  const ease = isExpanded ? EASE_OPEN : EASE_CLOSE;

  React.useEffect(() => {
    if (!isExpanded) return;
    const onMouseDown = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isExpanded]);

  const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(false);
    setTimeout(() => scrollToSection(id), 200);
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/20 backdrop-blur-[8px] transition-opacity duration-300 lg:hidden",
          isExpanded ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setIsExpanded(false)}
        aria-hidden="true"
      />

      {/* Anchored bottom-centre; the list grows upwards above the progress row. */}
      <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-40 w-[calc(100vw-2rem)] max-w-6xl -translate-x-1/2 lg:hidden">
        <div
          ref={islandRef}
          role="button"
          tabIndex={0}
          aria-expanded={isExpanded}
          aria-controls="brand-island-nav"
          aria-label={`Contents, current section ${activeTitle}, ${progress}% read`}
          className="relative mx-auto flex w-full cursor-pointer flex-col-reverse overflow-hidden rounded-[22px] border border-white/[0.08] bg-black/70 shadow-2xl shadow-black/40 backdrop-blur-xl"
          style={{
            maxWidth: isExpanded ? "calc(100vw - 2rem)" : 260,
            transition: `max-width 0.5s ${ease}`,
          }}
          onClick={() => setIsExpanded((prev) => !prev)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsExpanded((prev) => !prev);
            }
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2">
            <CircularProgress progress={progress} />
            <span className="flex-1 truncate text-[15px] font-medium text-white">
              {activeTitle}
            </span>
            <span
              className="shrink-0 text-sm font-medium tabular-nums transition-colors duration-300"
              style={{ color: progress >= 100 ? BRAND_ORANGE : "rgba(255,255,255,0.8)" }}
            >
              {progress}%
            </span>
          </div>

          <nav
            id="brand-island-nav"
            className="overflow-hidden"
            style={{
              height: isExpanded ? navHeight : 0,
              opacity: isExpanded ? 1 : 0,
              pointerEvents: isExpanded ? "auto" : "none",
              transition: `height 0.5s ${ease}, opacity 0.3s ease`,
            }}
          >
            <div ref={navRef} className="flex flex-col gap-0.5 px-4 pb-1 pt-4">
              {TOC_ITEMS.map((item, i) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    tabIndex={isExpanded ? 0 : -1}
                    onClick={(e) => handleNavigate(e, item.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200",
                      isActive ? "bg-white/10 font-medium text-white" : "text-zinc-400 hover:text-white",
                    )}
                  >
                    <span
                      className={cn(
                        "w-5 text-xs tabular-nums",
                        isActive ? "text-[#F8931A]" : "text-zinc-600",
                      )}
                    >
                      {i === 0 ? "—" : String(i).padStart(2, "0")}
                    </span>
                    {item.title}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
