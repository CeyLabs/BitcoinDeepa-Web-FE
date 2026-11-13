"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useInView } from "framer-motion";
import { ArrowUpRight, Nfc, Plus, Pointer, Store, Zap } from "lucide-react";
import { BTC_PATTERN_STYLE } from "@/src/app/brand/brand-data";
import { BrandName } from "./brand-provider";
import { CardPlaceholder } from "./card-3d/card-placeholder";
import { CardDetailsModal } from "./card-3d/card-details-modal";
import { TELEGRAM_INVITE } from "./nav/nav-data";
import { Button, ResponsiveLabel } from "./ui/button";

const FEATURES = [
  {
    Icon: Nfc,
    title: "Secure NFC chip",
    body: "An LNURL-withdraw link embedded in a secure NFC card.",
  },
  {
    Icon: Pointer,
    title: "One tap, one payment",
    body: "Tapping your card authorises a single, one-time withdrawal payment.",
  },
  {
    Icon: Store,
    title: "Works at any Lightning POS",
    body: "Pay at any merchant's Lightning point-of-sale device.",
  },
  {
    Icon: Zap,
    title: "Bolt Card standard",
    body: "Contactless Lightning Network payments using Bolt Card technology.",
  },
];

const STEPS = [
  "Tap your card on any Lightning-enabled point-of-sale device",
  "The card authorises a one-time withdrawal payment",
  "The payment settles instantly on the Lightning Network",
  "Secure and fast, with minimal fees",
];

// Centred on the card (which sits in the lower half of the stage), solid at
// the core and easing out to nothing well before the panel edges.
const fadeMask =
  "radial-gradient(ellipse 48% 42% at 50% 64%, #000 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.25) 70%, transparent 100%)";
const PATTERN_FADE = { maskImage: fadeMask, WebkitMaskImage: fadeMask } as const;

// The WebGL card loads on the client only; the flat card holds its place meanwhile.
const CardScene = dynamic(() => import("./card-3d/card-scene"), {
  ssr: false,
  loading: () => (
    <div className="aspect-[3/2] w-full max-w-[620px]">
      <CardPlaceholder />
    </div>
  ),
});

/** "View more": the full card story and how it works, in a modal. */
function CardDetails() {
  return (
    <CardDetailsModal
      trigger={(open, isOpen) => (
        <Button variant="secondary" onClick={open} aria-haspopup="dialog" aria-expanded={isOpen}>
          View more <Plus />
        </Button>
      )}
      eyebrow={<p className="type-eyebrow text-bitcoin">Lightning Network</p>}
      title={
        <>
          <BrandName /> Bolt Card
        </>
      }
    >
      <p className="mt-4 type-lede text-zinc-300">
        More than a card: your tap-to-pay gateway to Bitcoin. With an LNURL-withdraw link on a secure NFC
        chip, you pay over the Lightning Network with a single tap.
      </p>

      {/* Features: small sub-cards, icon on its own tile. */}
      <h3 className="mt-9 text-xl font-medium text-white">Features</h3>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {FEATURES.map(({ Icon, title, body }) => (
          <li key={title} className="flex gap-4 rounded-xl bg-black p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-bitcoin">
              <Icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block font-medium text-white">{title}</span>
              <span className="mt-1 block text-sm leading-relaxed text-zinc-400">{body}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* How it works: compact numbered steps. */}
      <h3 className="mt-9 text-xl font-medium text-white">How it works</h3>
      <ol className="mt-4 space-y-3">
        {STEPS.map((step, i) => (
          <li key={step} className="flex items-baseline gap-4 text-zinc-300">
            <span className="w-6 shrink-0 font-medium tabular-nums text-bitcoin">0{i + 1}</span>
            <span className="leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>

          <div className="mt-8 flex flex-col gap-4 rounded-xl bg-bitcoin p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="flex h-7 w-fit items-center rounded-md bg-black px-2.5 text-sm font-medium text-bitcoin">
                Coming soon
              </span>
              <p className="mt-3 font-medium text-black">Be the first to know when the card is available.</p>
            </div>
            <Button asChild variant="dark">
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer">
                Get updates on Telegram <ArrowUpRight />
              </a>
            </Button>
          </div>
    </CardDetailsModal>
  );
}

export default function BitcoinCard() {
  const stageRef = useRef<HTMLDivElement>(null);
  // Only fetch the 3D scene (three.js, the heaviest code on the site) once the
  // card is about to scroll into view; the flat card holds its place until then.
  const nearView = useInView(stageRef, { once: true, margin: "600px 0px" });

  return (
    <section id="card" aria-labelledby="card-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Product stage: everything centred around the card (unlike the
            heading-left / lede-right sections around it). */}
        <div className="reveal relative isolate flex flex-col items-center overflow-hidden rounded-xl bg-zinc-900 px-6 pt-14 pb-12 text-center md:px-10 md:pt-20 md:pb-16">
          {/* The ₿ pattern radiates out from behind the card and fades away,
              so it frames the product instead of covering the whole panel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{ ...BTC_PATTERN_STYLE, ...PATTERN_FADE }}
          />
          <span className="flex h-8 items-center gap-2 rounded-md bg-black px-3 text-sm text-zinc-300">
            <span className="size-2 rounded-full bg-bitcoin" />
            Coming soon · Lightning Bolt Card
          </span>
          <h2
            id="card-title"
            className="mt-6 type-display text-white"
          >
            Tap. Pay. <span className="text-bitcoin">Done.</span>
          </h2>
          <p className="mt-5 max-w-xl type-lede text-zinc-300">
            The <BrandName /> Card, a contactless Lightning Network Bolt Card. Tap it at any Lightning point
            of sale and pay in seconds.
          </p>

          <div ref={stageRef} className="mt-4 flex w-full justify-center md:mt-6">
            {nearView ? (
              <CardScene />
            ) : (
              <div className="aspect-[3/2] w-full max-w-[620px]">
                <CardPlaceholder />
              </div>
            )}
          </div>

          <div className="cta-row mt-4 w-full sm:w-auto sm:justify-center">
            <Button asChild>
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer">
                <ResponsiveLabel short="Get updates" full="Get updates on Telegram" /> <ArrowUpRight />
              </a>
            </Button>
            <CardDetails />
          </div>
        </div>

        {/* Features: one row of columns split by hairlines, no cards. */}
        <ul className="reveal mt-10 grid divide-y divide-zinc-800 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {FEATURES.map(({ Icon, title, body }) => (
            <li key={title} className="py-6 sm:px-6 sm:first:pl-0 lg:py-2">
              <Icon className="size-6 text-bitcoin" strokeWidth={1.75} />
              <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
              <p className="mt-1.5 leading-relaxed text-zinc-400">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
