"use client";

import type React from "react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { IMG } from "@/src/app/brand/brand-data";
import { FlameCanvas, type FlamePointer } from "./flame-canvas";

// The official Yaka (bold cut, so the strokes are wide enough to carry the flame).
const YAKA_SRC = IMG.yakaBoldSvg;
const YAKA_RATIO = `${IMG.yakaBold.w} / ${IMG.yakaBold.h}`;

const yakaMask = {
  maskImage: `url('${YAKA_SRC}')`,
  WebkitMaskImage: `url('${YAKA_SRC}')`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

// Sparks fade out before they reach the edges of their box.
const sparkFade = "radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%)";

/**
 * The Yaka, lit from within: the "Deepa Ember" flame flows through the
 * official mark's strokes and sparks lift off the crown. The pointer is a
 * heat source. The mark's shape is never altered; only the light moves.
 */
export function LivingYaka() {
  const boxRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boxRef, { margin: "100px" });
  const reduceMotion = useReducedMotion() ?? false;
  const pointer = useRef<FlamePointer>({ x: 0.5, y: 0.5, on: 0 });
  const [lit, setLit] = useState(false);
  const onReady = useCallback(() => setLit(true), []);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    // Canvas space: x right, y up.
    pointer.current = { x: (e.clientX - r.left) / r.width, y: 1 - (e.clientY - r.top) / r.height, on: 1 };
  };
  const onPointerLeave = () => {
    pointer.current = { ...pointer.current, on: 0 };
  };

  return (
    <div
      ref={boxRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto w-[min(380px,72vw)] lg:w-[min(440px,34vw)]"
      style={{ aspectRatio: YAKA_RATIO }}
    >
      {/* Sparks rise in a taller box above the crown. */}
      {!reduceMotion && (
        <FlameCanvas
          mode={1}
          pointer={pointer}
          paused={!inView}
          still={false}
          className={`pointer-events-none absolute top-[-30%] left-[-20%] h-[110%] w-[140%] transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"}`}
          style={{ maskImage: sparkFade, WebkitMaskImage: sparkFade }}
        />
      )}

      {/* Static mark: instant first paint, and what shows without WebGL. */}
      <Image
        src={YAKA_SRC}
        alt="Bitcoin Deepa Yaka mark"
        width={IMG.yakaBold.w}
        height={IMG.yakaBold.h}
        priority
        unoptimized
        className="absolute inset-0 size-full"
      />

      {/* The flame, poured into the mark. */}
      <FlameCanvas
        mode={0}
        pointer={pointer}
        paused={!inView}
        still={reduceMotion}
        onReady={onReady}
        className={`absolute inset-0 size-full transition-opacity duration-1000 ${lit ? "opacity-100" : "opacity-0"}`}
        style={yakaMask}
      />
    </div>
  );
}
