"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/src/lib/utils";

export interface BrandTab {
  value: string;
  label: string;
  content: ReactNode;
}

/**
 * Segmented tabs: a solid highlight slides to the active tab and the new panel
 * fades up into place. Hidden panels stay mounted (so their images are already
 * loaded) but are `hidden`, which also takes them out of the tab order.
 */
export function BrandTabs({
  tabs,
  label,
  className,
}: {
  tabs: BrandTab[];
  /** Accessible name for the tab list. */
  label: string;
  className?: string;
}) {
  const [active, setActive] = useState(tabs[0]?.value);
  const reduceMotion = useReducedMotion();
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = tabs.findIndex((t) => t.value === active);
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    setActive(tabs[next].value);
    buttons.current[next]?.focus();
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="inline-flex rounded-xl bg-zinc-900 p-1"
      >
        {tabs.map((tab, i) => {
          const selected = tab.value === active;
          return (
            <button
              key={tab.value}
              ref={(node) => {
                buttons.current[i] = node;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.value}`}
              aria-selected={selected}
              aria-controls={`${id}-panel-${tab.value}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.value)}
              className={cn(
                "relative h-9 rounded-lg px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-bitcoin",
                selected ? "text-white" : "text-zinc-400 hover:text-zinc-200",
              )}
            >
              {selected && (
                <motion.span
                  layoutId={`${id}-highlight`}
                  className="absolute inset-0 rounded-lg bg-zinc-800"
                  transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => {
        const selected = tab.value === active;
        return (
          <motion.div
            key={tab.value}
            role="tabpanel"
            id={`${id}-panel-${tab.value}`}
            aria-labelledby={`${id}-tab-${tab.value}`}
            hidden={!selected}
            initial={false}
            animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }}
            className="mt-5"
          >
            {tab.content}
          </motion.div>
        );
      })}
    </div>
  );
}
