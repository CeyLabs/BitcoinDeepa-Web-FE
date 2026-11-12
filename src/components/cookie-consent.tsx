"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  OPEN_CONSENT_EVENT,
  openCookieSettings,
  readConsent,
  writeConsent,
  type ConsentChoice,
} from "@/src/lib/consent";

/**
 * Bottom cookie bar styled to the Bitcoin Deepa brand: solid panel, orange
 * Accept, outlined Decline.
 * Shown until the visitor chooses; "Cookie settings" links reopen it.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const choose = (choice: ConsentChoice) => {
    writeConsent(choice);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl sm:bottom-5"
        >
          <div className="flex flex-col gap-4 rounded-xl bg-zinc-900 p-4 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9)] ring-1 ring-zinc-800 sm:flex-row sm:items-center sm:gap-6 sm:px-5">
            <p className="flex-1 text-sm leading-relaxed text-zinc-300">
              We use cookies to measure how our site and ads perform. Essential
              cookies stay on either way. See our{" "}
              <Link
                href="/privacy-policy#cookies-and-tracking-technologies"
                className="text-bitcoin underline decoration-bitcoin/40 underline-offset-4 hover:decoration-bitcoin"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="flex-1 rounded-xl border-[1.5px] border-white px-4 py-2 text-sm font-medium text-white transition-colors hover:border-bitcoin hover:text-bitcoin sm:flex-none"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="flex-1 rounded-xl border-[1.5px] border-bitcoin bg-bitcoin px-4 py-2 text-sm font-semibold text-black transition-colors hover:border-bitcoin-dark hover:bg-bitcoin-dark sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Inline "Cookie settings" control that reopens the banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className={className}
    >
      Cookie settings
    </button>
  );
}
