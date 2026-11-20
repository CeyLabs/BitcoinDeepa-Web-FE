"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/src/lib/utils";

/**
 * Two layers stacked; the first is clipped to the left of a draggable divider.
 * Drag anywhere (mouse or touch) or use the arrow keys on the handle.
 */
export function CompareSlider({
  first,
  second,
  label,
  firstLabel,
  secondLabel,
  initial = 50,
  className,
}: {
  first: ReactNode;
  second: ReactNode;
  /** Accessible name for the divider, e.g. "Compare grounds". */
  label: string;
  firstLabel: string;
  secondLabel: string;
  initial?: number;
  className?: string;
}) {
  const [pos, setPos] = useState(initial);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromX(e.clientX);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => dragging.current && setFromX(e.clientX);
  const onUp = () => {
    dragging.current = false;
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const move: ((p: number) => number) | null =
      e.key === "ArrowLeft" ? (p) => p - step
      : e.key === "ArrowRight" ? (p) => p + step
      : e.key === "Home" ? () => 0
      : e.key === "End" ? () => 100
      : null;
    if (!move) return;
    e.preventDefault();
    setPos((p) => Math.min(100, Math.max(0, move(p))));
  };

  return (
    <div
      ref={box}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      className={cn("relative cursor-ew-resize touch-pan-y overflow-hidden rounded-xl select-none", className)}
    >
      <div className="absolute inset-0">{second}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {first}
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-md bg-black px-2 py-1 text-xs font-medium text-white">
        {firstLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-md bg-white px-2 py-1 text-xs font-medium text-black">
        {secondLabel}
      </span>

      {/* Divider and handle */}
      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-bitcoin" style={{ left: `${pos}%` }} />
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% ${firstLabel}`}
        onKeyDown={onKey}
        className="absolute top-1/2 flex h-10 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-lg bg-bitcoin outline-none focus-visible:ring-2 focus-visible:ring-white"
        style={{ left: `${pos}%` }}
      >
        <span className="h-4 w-0.5 rounded-full bg-black" />
        <span className="h-4 w-0.5 rounded-full bg-black" />
      </div>
    </div>
  );
}
