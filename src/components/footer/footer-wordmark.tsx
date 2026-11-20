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

// Logo colours, revealed around the pointer.
const LIT = { base: "#FFFFFF", accent: "#F8931A" } as const;

// Soft spotlight that follows the pointer (vars set on the root element).
const SPOTLIGHT =
  "radial-gradient(circle 240px at var(--mx, 50%) var(--my, 50%), #000 0%, rgba(0,0,0,0.6) 45%, transparent 100%)";

/** The stacked hairline outlines, stroked by tone. */
function Outlines({ stroke }: { stroke: (tone: "base" | "accent") => string }) {
  return (
    <>
      {/* Back to front, so the front outline sits on top and is brightest. */}
      {Array.from({ length: LAYERS }, (_, i) => LAYERS - 1 - i).map((k) => (
        <g key={k} transform={`translate(${STEP_X * k} ${STEP_Y * k})`} opacity={k === 0 ? 1 : 0.62 - k * 0.07}>
          {WORDMARK.map((p, j) => (
            <path key={j} d={p.d} stroke={stroke(p.tone)} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          ))}
        </g>
      ))}
    </>
  );
}

/**
 * Footer signature: the official wordmark as a stack of hairline outlines.
 * Around the pointer the lines light up in the logo's own colours: white
 * "bitcoin", Satoshi Orange "දීප".
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
      className="group/wm relative overflow-hidden select-none [touch-action:pan-y]"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      {/* Resting state: warm grey through "bitcoin", into Satoshi Orange on "දීප". */}
      <svg viewBox={VIEWBOX} className="block h-auto w-full" fill="none">
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="539.2" y2="0">
            <stop offset="0" stopColor="#6f655d" />
            <stop offset="0.62" stopColor="#9a8d82" />
            <stop offset="0.78" stopColor="#c7701a" />
            <stop offset="1" stopColor="#f8931a" />
          </linearGradient>
        </defs>
        <Outlines stroke={() => `url(#${gradientId})`} />
      </svg>

      {/* Lit state: the same outlines in logo colours, shown only under the pointer. */}
      <svg
        viewBox={VIEWBOX}
        fill="none"
        className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-500 group-data-[lit=true]/wm:opacity-100"
        style={{ maskImage: SPOTLIGHT, WebkitMaskImage: SPOTLIGHT }}
      >
        <Outlines stroke={(tone) => LIT[tone]} />
      </svg>
    </div>
  );
}
