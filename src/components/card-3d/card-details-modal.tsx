"use client";

import type React from "react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { BACK_SRC, FRONT_SRC } from "./card-placeholder";

/** The card artwork is 945 × 591. */
const RATIO = 945 / 591;

const CARD_SIDES = [
  { id: "front", label: "Front", src: FRONT_SRC },
  { id: "back", label: "Back", src: BACK_SRC },
] as const;
type Side = (typeof CARD_SIDES)[number]["id"];

/** Product-shot angle: turned and tipped back a little. */
const TILT_Y = -16;
const TILT_X = 10;

/**
 * One side of the card at a time, posed in 3D. Switching sides flips the
 * card over, landing the other face at the same tilted angle.
 */
function TiltedCard({ reduceMotion }: { reduceMotion: boolean }) {
  const [side, setSide] = useState<Side>("front");
  const face = "absolute inset-0 overflow-hidden rounded-xl [backface-visibility:hidden]";

  return (
    <div className="flex flex-col items-center bg-black px-6 pt-14 pb-8 md:px-10">
      <div className="relative w-full max-w-[400px] [perspective:1400px]">
        <motion.div
          className="relative w-full [transform-style:preserve-3d]"
          style={{ aspectRatio: `${RATIO}` }}
          initial={false}
          animate={{ rotateY: side === "front" ? TILT_Y : 180 + TILT_Y, rotateX: TILT_X }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", duration: 0.7, bounce: 0.15 }}
        >
          {CARD_SIDES.map((s) => (
            <div
              key={s.id}
              className={`${face} shadow-[0_30px_60px_-20px_rgba(0,0,0,0.95)]`}
              style={s.id === "back" ? { transform: "rotateY(180deg)" } : undefined}
              aria-hidden={side !== s.id}
            >
              <Image src={s.src} alt={`Bitcoin Deepa Card, ${s.label.toLowerCase()}`} fill sizes="400px" />
            </div>
          ))}
        </motion.div>
        {/* Soft floor shadow under the floating card. */}
        <div aria-hidden className="mx-auto mt-6 h-4 w-3/4 rounded-[50%] bg-zinc-800/80 blur-xl" />
      </div>

      {/* Front / Back switch */}
      <div role="tablist" aria-label="Card side" className="mt-4 flex rounded-xl bg-zinc-900 p-1">
        {CARD_SIDES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={side === s.id}
            onClick={() => setSide(s.id)}
            className={`h-9 rounded-lg px-5 text-sm font-medium transition-colors ${
              side === s.id ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

type Props = {
  /** Renders the trigger; call `open` from it. */
  trigger: (open: () => void, isOpen: boolean) => React.ReactNode;
  title: React.ReactNode;
  eyebrow?: React.ReactNode;
  children: React.ReactNode;
};

/** "View more" details for the Bolt Card, in a regular modal. */
export function CardDetailsModal({ trigger, title, eyebrow, children }: Props) {
  const reduceMotion = useReducedMotion() ?? false;
  const titleId = useId();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => setMounted(true), []);

  const open = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  // Scroll lock, Escape, focus trap; focus moves in on open and back on close.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab" || !panelRef.current) return;
      const f = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus({ preventScroll: true });
    };
  }, [isOpen, close]);

  const overlay = (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="presentation">
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="hide-scrollbar relative max-h-[88vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-xl bg-zinc-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] ring-1 ring-zinc-800"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-lg bg-black/60 text-zinc-300 transition-colors hover:bg-black hover:text-white focus-visible:ring-2 focus-visible:ring-bitcoin focus-visible:outline-none"
            >
              <X className="size-5" />
            </button>

            <TiltedCard reduceMotion={reduceMotion} />

            <div className="p-7 md:p-9">
              {eyebrow}
              <h2 id={titleId} className="mt-3 pr-10 type-h3 text-white">
                {title}
              </h2>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {trigger(open, isOpen)}
      {mounted && createPortal(overlay, document.body)}
    </>
  );
}
