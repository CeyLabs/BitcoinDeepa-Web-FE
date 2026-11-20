"use client";

import { useReducedMotion } from "framer-motion";
import { IMG } from "@/src/app/brand/brand-data";

// Code-drawn art for the nav feature tiles: crisp at any size and always in
// the exact brand colours (no video, no baked-in colour drift).

const WHITE = "#FFFCFA";
const ORANGE = "#F8931A";
const ORANGE_LIGHT = "#FFB84D";
const ORANGE_DEEP = "#EA7400";
const INK = "#0A0908";

/** Bitcoin logo (a coin with the ₿ cut out), 24 × 24. */
const BITCOIN_COIN =
  "M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z";

// Strands fan out from one point at the top: people from across the island
// coming together. Drawn bottom → top so coins travel toward the meeting point.
const STRANDS = [
  { d: "M-4 150C60 110 118 60 120 -4", color: WHITE },
  { d: "M244 150C180 110 122 60 120 -4", color: WHITE },
  { d: "M34 204C40 120 112 70 120 -4", color: ORANGE_LIGHT },
  { d: "M206 204C200 120 128 70 120 -4", color: ORANGE_LIGHT },
  { d: "M72 204C74 130 116 80 120 -4", color: ORANGE },
  { d: "M168 204C166 130 124 80 120 -4", color: ORANGE },
  { d: "M120 204L120 -4", color: ORANGE_DEEP },
] as const;

// Which strand each coin rides, and when it sets off (s), on a shared loop.
const COINS = [
  { strand: 0, begin: 0 },
  { strand: 4, begin: 0.9 },
  { strand: 3, begin: 1.8 },
  { strand: 6, begin: 2.7 },
  { strand: 2, begin: 3.6 },
  { strand: 1, begin: 4.5 },
  { strand: 5, begin: 5.4 },
] as const;
const COIN_LOOP = 6.3;
// Resting positions (fraction along the strand) when motion is reduced.
const STILL_AT = [0.35, 0.45, 0.4, 0.55, 0.5, 0.3, 0.6];

function Coin({ r = 8 }: { r?: number }) {
  const s = (r * 2) / 24;
  return (
    <g>
      <circle r={r + 1.5} fill={INK} />
      <path d={BITCOIN_COIN} fill={ORANGE} transform={`translate(${-r} ${-r}) scale(${s})`} />
    </g>
  );
}

/** "Come to a meetup": thin strands meeting at one point, ₿ coins travelling up them. */
export function RibbonsArt() {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden className="absolute inset-0 size-full">
      <defs>
        {STRANDS.map((s, i) => (
          <path key={i} id={`nav-strand-${i}`} d={s.d} />
        ))}
      </defs>
      {STRANDS.map((s, i) => (
        <use key={i} href={`#nav-strand-${i}`} fill="none" stroke={s.color} strokeWidth={2.5} strokeLinecap="round" />
      ))}
      {COINS.map((c, i) =>
        reduceMotion ? (
          <StillCoin key={i} strand={c.strand} at={STILL_AT[i]} />
        ) : (
          <g key={i} opacity={0}>
            <animateMotion
              dur={`${COIN_LOOP}s`}
              begin={`${c.begin}s`}
              repeatCount="indefinite"
              keyPoints="0;0.88"
              keyTimes="0;1"
              calcMode="spline"
              keySplines="0.4 0 0.6 1"
            >
              <mpath href={`#nav-strand-${c.strand}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.12;0.8;1"
              dur={`${COIN_LOOP}s`}
              begin={`${c.begin}s`}
              repeatCount="indefinite"
            />
            <Coin />
          </g>
        ),
      )}
    </svg>
  );
}

/** A coin parked partway along a strand (reduced motion). */
function StillCoin({ strand, at }: { strand: number; at: number }) {
  return (
    <g>
      <animateMotion dur="1s" fill="freeze" keyPoints={`${at};${at}`} keyTimes="0;1" calcMode="linear">
        <mpath href={`#nav-strand-${strand}`} />
      </animateMotion>
      <Coin />
    </g>
  );
}

const yakaMask = {
  maskImage: `url('${IMG.yakaBoldSvg}')`,
  WebkitMaskImage: `url('${IMG.yakaBoldSvg}')`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

/** "Bitcoin Deepa Card": the official Yaka in its brand gradient, with a light passing over it. */
export function YakaArt() {
  return (
    <span className="absolute inset-0 flex items-center justify-center">
      {/* Warm glow behind the mark. */}
      <span
        aria-hidden
        className="absolute size-[70%] animate-[tile-glow_4s_ease-in-out_infinite] rounded-full motion-reduce:animate-none"
        style={{ background: `radial-gradient(closest-side, ${ORANGE}33, transparent)` }}
      />
      <span className="relative h-[82%]" style={{ aspectRatio: `${IMG.yakaBold.w} / ${IMG.yakaBold.h}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed */}
        <img src={IMG.yakaBoldSvg} alt="" className="absolute inset-0 size-full" />
        <span
          aria-hidden
          className="absolute inset-0 animate-[tile-sheen_4s_ease-in-out_infinite] bg-[length:300%_100%] motion-reduce:hidden"
          style={{
            ...yakaMask,
            backgroundImage: `linear-gradient(105deg, transparent 42%, ${WHITE} 50%, transparent 58%)`,
          }}
        />
      </span>
    </span>
  );
}
