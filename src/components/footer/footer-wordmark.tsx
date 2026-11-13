"use client";

import type React from "react";
import { useId, useRef } from "react";
import { WORDMARK } from "./wordmark-paths";

/** Outline copies stacked behind the front one, each a step further back. */
const LAYERS = 8;
const STEP_X = -4;
const STEP_Y = 2.6;

// Room for the receding copies (they travel left and down from the front).
const VIEWBOX = `${STEP_X * (LAYERS - 1) - 2} -2 ${539.2 - STEP_X * (LAYERS - 1) + 4} ${196.77 + STEP_Y * (LAYERS - 1) + 4}`;

// The whole mark dissolves downwards into the cropped bottom edge.
const FADE = "linear-gradient(to bottom, #000 0%, #000 45%, rgba(0,0,0,0.4) 75%, transparent 95%)";

/**
 * Footer signature: the official wordmark as a stack of hairline outlines.
 * A soft light follows the pointer and, blended over the lines, lights up
 * only the strokes underneath it.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const gradientId = useId();

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.dataset.lit = "true";
  };
  const leave = () => {
    if (ref.current) ref.current.dataset.lit = "false";
  };

  return (
    <div
      ref={ref}
      aria-hidden
      data-lit="false"
      onPointerMove={move}
      onPointerLeave={leave}
      onPointerCancel={leave}
      // bg-black inside the isolated group gives the overlay blend a black
      // backdrop, so the light shows only where there are lines.
      className="group/wm relative isolate overflow-hidden bg-black select-none [touch-action:pan-y]"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      <svg viewBox={VIEWBOX} className="block h-auto w-full" fill="none">
        <defs>
          {/* Warm grey through "bitcoin", into Satoshi Orange on "දීප". */}
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="539.2" y2="0">
            <stop offset="0" stopColor="#6f655d" />
            <stop offset="0.62" stopColor="#9a8d82" />
            <stop offset="0.78" stopColor="#c7701a" />
            <stop offset="1" stopColor="#f8931a" />
          </linearGradient>
        </defs>
        {/* Back to front, so the front outline sits on top and is brightest. */}
        {Array.from({ length: LAYERS }, (_, i) => LAYERS - 1 - i).map((k) => (
          <g key={k} transform={`translate(${STEP_X * k} ${STEP_Y * k})`} opacity={k === 0 ? 1 : 0.62 - k * 0.07}>
            {WORDMARK.map((p, j) => (
              <path
                key={j}
                d={p.d}
                stroke={`url(#${gradientId})`}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
        ))}
      </svg>

      {/* Pointer light: overlay-blended, so the black background stays black
          and only the hairlines beneath it brighten and warm up. */}
      <div
        className="pointer-events-none absolute top-0 left-0 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 mix-blend-overlay blur-[40px] transition-opacity duration-500 group-data-[lit=true]/wm:opacity-100"
        style={{
          left: "var(--mx, 50%)",
          top: "var(--my, 50%)",
          background: "radial-gradient(circle, #ffffff 0%, #ffd9a0 30%, #f8931a 55%, transparent 72%)",
        }}
      />
    </div>
  );
}
