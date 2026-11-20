"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { dismissNotice, isNoticeDismissed } from "@/src/lib/cookie-notice";

/**
 * Bottom cookie notice styled to the Bitcoin Deepa brand: solid panel and an
 * orange "Got it" button. Informational only; shown until dismissed.
 */
export function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isNoticeDismissed()) setOpen(true);
  }, []);

  const dismiss = () => {
    dismissNotice();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="region"
          aria-label="Cookie notice"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl sm:bottom-5"
        >
          <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9)] ring-1 ring-zinc-800 sm:flex-row sm:items-center sm:gap-6 sm:px-5">
            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
              We use cookies, including the Meta Pixel, to understand how
              visitors find us and how our ads perform. See our{" "}
              <Link
                href="/privacy-policy#cookies-and-tracking-technologies"
                className="text-bitcoin underline decoration-bitcoin/40 underline-offset-4 hover:decoration-bitcoin"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 rounded-xl bg-bitcoin px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-bitcoin-dark"
            >
              Got it
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
