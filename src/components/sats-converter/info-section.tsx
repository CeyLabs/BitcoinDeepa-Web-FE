import Image from "next/image";
import { ArrowUpRight, Coins, Database, Ruler } from "lucide-react";
import { IMG } from "@/src/app/brand/brand-data";
import { cn } from "@/src/lib/utils";
import { buttonVariants } from "../ui/button";

const RATE_ENDPOINTS = [
  { label: "SATS", href: "https://fx.ceyloncash.com/currency/SATS" },
  { label: "BTC", href: "https://fx.ceyloncash.com/currency/BTC" },
  { label: "USD", href: "https://fx.ceyloncash.com/currency/USD" },
];

/** Explainer cards plus the BitcoinDeepaBot call to action, below the converter. */
export function InfoSection() {
  return (
    <>
      <div className="grid gap-2 md:grid-cols-3">
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-zinc-900 p-7">
          <Coins className="size-8 text-zinc-300" strokeWidth={1.5} />
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.01em] text-white">What is a satoshi?</h3>
            <p className="mt-2 leading-relaxed text-zinc-400">
              The smallest unit of bitcoin, named after its creator Satoshi Nakamoto.{" "}
              <strong className="font-medium text-white">1 BTC = 100,000,000 sats.</strong>
            </p>
          </div>
        </div>
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-zinc-900 p-7">
          <Ruler className="size-8 text-zinc-300" strokeWidth={1.5} />
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.01em] text-white">Why count in sats?</h3>
            <p className="mt-2 leading-relaxed text-zinc-400">
              Everyday payments are a tiny fraction of a bitcoin. Sats turn amounts like 0.0001 BTC
              into an easy 10,000.
            </p>
          </div>
        </div>
        <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-zinc-900 p-7">
          <Database className="size-8 text-zinc-300" strokeWidth={1.5} />
          <div>
            <h3 className="text-2xl font-medium tracking-[-0.01em] text-white">Where rates come from</h3>
            <p className="mt-2 leading-relaxed text-zinc-400">Live exchange rates from Ceylon Cash. See the raw data:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {RATE_ENDPOINTS.map((e) => (
                <a
                  key={e.label}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 items-center gap-1 rounded-md bg-zinc-800 px-2.5 text-sm text-zinc-300 transition-colors hover:text-bitcoin"
                >
                  {e.label} <ArrowUpRight className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BitcoinDeepaBot call to action */}
      <a
        href="https://t.me/bitcoindeepabot"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-4 block overflow-hidden rounded-xl bg-bitcoin p-7 outline-none focus-visible:ring-2 focus-visible:ring-white md:p-10"
      >
        {/* Brand rule: on Satoshi Orange, marks are used in black. The Yaka
            sits large on the right and is cropped by the panel edge. */}
        <Image
          // Vector mark rendered solid black: crisp at any size, no
          // compression halo around a large transparent PNG.
          src={IMG.yakaSvg}
          alt=""
          width={IMG.yaka.w}
          height={IMG.yaka.h}
          unoptimized
          className="pointer-events-none absolute top-1/2 -right-10 hidden h-[135%] w-auto -translate-y-1/2 brightness-0 md:block lg:right-6"
        />
        <div className="relative max-w-2xl md:pr-56">
          <p className="type-eyebrow text-black/70">BitcoinDeepaBot</p>
          <h2 className="mt-3 type-h3 text-black">
            Buy, sell and send sats on Telegram.
          </h2>
          <p className="mt-4 type-lede text-black/75">
            A Lightning wallet and tip bot for Telegram. Buy and sell Bitcoin with Sri Lankan rupees,
            and send sats to friends and group chats.
          </p>
          {/* The whole panel is the link; this is its button-shaped label. */}
          <span className={cn(buttonVariants({ variant: "dark" }), "mt-8 w-fit group-hover:bg-zinc-900")}>
            Open BitcoinDeepaBot <ArrowUpRight />
          </span>
        </div>
      </a>
    </>
  );
}
