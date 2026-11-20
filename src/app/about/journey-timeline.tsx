"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Scroll-driven timeline. A brand-gradient progress fill runs down the track
// to the middle of the screen; each year's label and dot stick there while
// its milestones pass, and everything brightens as it reaches the middle.
//
// The fill is a position: fixed bar (top of the viewport to its middle) inside
// the track. The root's clip-path trims it to the timeline's box, so it
// appears to grow as you scroll, with no scroll listeners at all.

/** Dimmed until it scrolls up to the middle of the screen. */
const FROM_OPACITY = 0.25;
/** Brighten while the element's top travels from 50% to 20% of the viewport. */
const FADE_OFFSET = ["start 50%", "start 20%"] as const;
/** Bitcoin orange at the leading edge, warming to the Yaka red behind it. */
const FILL = "linear-gradient(180deg, #E74126 0%, #EE6B21 35%, #F8931A 100%)";
const EDGE_FADE =
  "linear-gradient(to bottom, transparent 0, #000 50px, #000 calc(100% - 50px), transparent 100%)";

// Sticky items sit with their centre on the middle of the viewport.
const STICKY = "md:sticky md:top-[calc(50vh-1.25rem)]";

function useScrubOpacity(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({ target: ref, offset: [...FADE_OFFSET] });
  return useTransform(scrollYProgress, [0, 1], [FROM_OPACITY, 1]);
}

export function JourneyTimeline({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-5xl [clip-path:inset(0)]">
      {/* Track, centred on the dot column (no transforms: they would trap the fixed fill). */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-[10.5px] w-[3px] bg-zinc-800 md:left-[166.5px]"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <div className="fixed top-0 h-[50vh] w-[3px]" style={{ backgroundImage: FILL }} />
      </div>
      {children}
    </div>
  );
}

export function JourneyYear({ year, children }: { year: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const opacity = useScrubOpacity(ref);
  const style = reduceMotion ? undefined : { opacity };

  return (
    <section
      ref={ref}
      aria-labelledby={`year-${year}`}
      className="relative grid grid-cols-[24px_minmax(0,1fr)] gap-x-4 py-10 md:grid-cols-[120px_48px_minmax(0,1fr)] md:gap-x-6"
    >
      <div className="col-start-2 row-start-1 md:col-start-1">
        <motion.h3
          id={`year-${year}`}
          style={style}
          className={`${STICKY} mb-6 text-4xl leading-10 font-medium tracking-[-0.02em] tabular-nums text-white md:mb-0 md:text-right`}
        >
          {year}
        </motion.h3>
      </div>

      <div className="col-start-1 row-span-2 row-start-1 md:col-start-2 md:row-span-1">
        <motion.span
          aria-hidden
          style={style}
          className="sticky top-[calc(50vh-1.25rem)] mx-auto flex h-10 w-fit items-center"
        >
          {/* The black outline cuts a gap in the track around the dot. */}
          <span className="size-[15px] rounded-full bg-bitcoin shadow-[0_0_0_8px_#000]" />
        </motion.span>
      </div>

      <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1">
        <ol className="space-y-12 md:pt-1.5">{children}</ol>
      </div>
    </section>
  );
}

/** One milestone: brightens on its own as it reaches the middle of the screen. */
export function JourneyMilestone({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const opacity = useScrubOpacity(ref);
  return (
    <motion.li ref={ref} style={reduceMotion ? undefined : { opacity }}>
      {children}
    </motion.li>
  );
}
