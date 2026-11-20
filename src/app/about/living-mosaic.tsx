"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image, { getImageProps } from "next/image";
import { useInView, useReducedMotion } from "framer-motion";

// The About hero mosaic, alive:
//  1. Pixel reveal: each photo arrives through a grid of heritage-colour pixels.
//  2. Proximity: hovering a photo widens its column and row, dock-style.
//  3. Parallax: photos drift inside their frames with the cursor, at different depths.
//  4. Blinds: every few seconds a small tile wipes to another community photo
//     behind heritage-colour slats, so the mosaic cycles through the archive.

export interface MosaicPhoto {
  src: string;
  alt: string;
  caption: string;
}

const HERITAGE = ["#8D183A", "#FFBE2B", "#00544F", "#EA7400", "#F8931A"];

/** Tile slots: the feature tile and four small ones (md grid is 4 × 2). */
const SLOTS = [
  { col: 0, row: 0, area: "col-span-2 row-span-2", pixels: [12, 9], depth: 6 },
  { col: 2, row: 0, area: "", pixels: [6, 5], depth: 12 },
  { col: 3, row: 0, area: "hidden md:block", pixels: [6, 5], depth: 9 },
  { col: 2, row: 1, area: "", pixels: [6, 5], depth: 10 },
  { col: 3, row: 1, area: "hidden md:block", pixels: [6, 5], depth: 13 },
] as const;

const SWAP_EVERY = 3600;
const SMALL_SIZES = "(min-width: 768px) 360px, 33vw";
const SLATS = 6;

/** Integer hash → [0, 1). Exact in every JS engine, so server and client HTML match. */
function rand(seed: number) {
  let h = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

export function LivingMosaic({ feature, pool }: { feature: MosaicPhoto; pool: MosaicPhoto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });
  const revealed = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion() ?? false;
  const [hover, setHover] = useState<number | null>(null);

  // Which pool photo each small slot shows; the feature tile stays put.
  const [shown, setShown] = useState<number[]>([0, 1, 2, 3]);
  const nextPhoto = useRef(4);
  const nextSlot = useRef(0);
  const [swapping, setSwapping] = useState<{ slot: number; phase: "in" | "out" } | null>(null);

  // Warm the rest of the archive once the mosaic is on screen, so a swap never
  // reveals a half-loaded photo.
  useEffect(() => {
    if (!revealed || reduceMotion) return;
    for (const p of pool.slice(4)) {
      const props = getImageProps({ src: p.src, alt: "", fill: true, sizes: SMALL_SIZES }).props;
      const img = new window.Image();
      img.sizes = SMALL_SIZES;
      if (props.srcSet) img.srcset = props.srcSet;
      img.src = props.src;
    }
  }, [revealed, reduceMotion, pool]);

  useEffect(() => {
    if (reduceMotion || !inView || hover !== null || pool.length <= 4) return;
    let t1: ReturnType<typeof setTimeout>, t2: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      if (document.hidden) return;
      // Skip slots hidden on small screens.
      const visible = window.matchMedia("(min-width: 768px)").matches ? [0, 1, 2, 3] : [0, 2];
      const slot = visible[nextSlot.current % visible.length];
      nextSlot.current += 1;
      setSwapping({ slot, phase: "in" });
      t1 = setTimeout(() => {
        setShown((s) => {
          const copy = [...s];
          let n = nextPhoto.current % pool.length;
          while (copy.includes(n)) n = (n + 1) % pool.length;
          copy[slot] = n;
          nextPhoto.current = n + 1;
          return copy;
        });
        setSwapping({ slot, phase: "out" });
      }, 520);
      t2 = setTimeout(() => setSwapping(null), 1100);
    }, SWAP_EVERY);
    return () => {
      clearInterval(id);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduceMotion, inView, hover, pool.length]);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    ref.current.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onPointerLeave = () => {
    setHover(null);
    ref.current?.style.setProperty("--mx", "0");
    ref.current?.style.setProperty("--my", "0");
  };

  // Dock-style proximity: the hovered tile's column and row grow.
  const h = hover === null ? null : SLOTS[hover];
  const cols = [1, 1, 1, 1].map((f, i) => {
    if (!h) return `${f}fr`;
    if (hover === 0) return i < 2 ? "1.18fr" : "0.82fr";
    return i === h.col ? "1.55fr" : i < 2 ? "0.9fr" : "0.75fr";
  });
  const rows = !h || hover === 0 ? ["1fr", "1fr"] : [h.row === 0 ? "1.3fr" : "0.7fr", h.row === 1 ? "1.3fr" : "0.7fr"];

  const photos = [feature, ...shown.map((i) => pool[i])];

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="grid h-[320px] grid-cols-3 grid-rows-2 gap-2 transition-[grid-template-columns,grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:h-[420px] md:h-[480px] md:[grid-template-columns:var(--cols)] md:[grid-template-rows:var(--rows)]"
      style={{ "--cols": cols.join(" "), "--rows": rows.join(" "), "--mx": 0, "--my": 0 } as React.CSSProperties}
    >
      {SLOTS.map((slot, i) => (
        <Tile
          key={i}
          index={i}
          slot={slot}
          photo={photos[i]}
          revealed={revealed}
          animate={!reduceMotion}
          swapPhase={swapping?.slot === i - 1 ? swapping.phase : null}
          onHover={() => setHover(i)}
        />
      ))}
    </div>
  );
}

function Tile({
  index,
  slot,
  photo,
  revealed,
  animate,
  swapPhase,
  onHover,
}: {
  index: number;
  slot: (typeof SLOTS)[number];
  photo: MosaicPhoto;
  revealed: boolean;
  animate: boolean;
  swapPhase: "in" | "out" | null;
  onHover: () => void;
}) {
  const [cx, cy] = slot.pixels;
  const slatColor = HERITAGE[(index * 2 + 1) % HERITAGE.length];

  return (
    <figure
      onPointerEnter={onHover}
      className={`group/tile relative m-0 overflow-hidden rounded-md bg-zinc-900 ${slot.area}`}
    >
      {/* Parallax: deeper tiles drift further; scaled up so edges never show. */}
      <div
        className="absolute -inset-4 transition-transform duration-700 ease-out"
        style={
          animate
            ? { transform: `translate(calc(var(--mx) * ${-slot.depth}px), calc(var(--my) * ${-slot.depth}px))` }
            : undefined
        }
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority={index === 0}
          sizes={index === 0 ? "(min-width: 768px) 640px, 66vw" : SMALL_SIZES}
          className="object-cover transition-transform duration-700 ease-out group-hover/tile:scale-105"
        />
      </div>

      {/* Pixel reveal in heritage colours. */}
      {animate && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${cx}, 1fr)`, gridTemplateRows: `repeat(${cy}, 1fr)` }}
        >
          {Array.from({ length: cx * cy }, (_, k) => {
            const seed = index * 1000 + k;
            const delay = Math.round(index * 140 + rand(seed) * 650);
            return (
              <span
                key={k}
                className="transition-opacity duration-200"
                style={{
                  backgroundColor: HERITAGE[Math.floor(rand(seed + 7) * HERITAGE.length)],
                  opacity: revealed ? 0 : 1,
                  transitionDelay: `${delay}ms`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Blinds: slats sweep in, the photo changes behind them, they sweep out. */}
      {animate && index > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 flex">
          {Array.from({ length: SLATS }, (_, k) => (
            <span
              key={k}
              className="h-full flex-1 transition-transform duration-[380ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                backgroundColor: slatColor,
                transform: `scaleX(${swapPhase === "in" ? 1 : 0})`,
                transformOrigin: swapPhase === "out" ? "right" : "left",
                transitionDelay: `${k * 35}ms`,
              }}
            />
          ))}
        </div>
      )}

      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100">
        {photo.caption}
      </figcaption>
    </figure>
  );
}
