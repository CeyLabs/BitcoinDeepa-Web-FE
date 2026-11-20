"use client";

import { useState, type ComponentType } from "react";
import Image from "next/image";
import { ArrowUpRight, Banknote, CalendarSync, Wallet } from "lucide-react";
import { fbEvent } from "@/src/lib/facebook-pixel";
import { APP_URL } from "@/src/lib/site";
import { cn } from "@/src/lib/utils";
import { TelegramIcon } from "./icons";
import { TELEGRAM_INVITE } from "./nav/nav-data";
import { Button, ResponsiveLabel } from "./ui/button";

// The renders are on pure black like the page; the cut-off wrist fades out at
// the bottom and the sides soften, so the artwork has no visible frame.
const fade =
  "linear-gradient(to bottom, #000 64%, transparent 97%), radial-gradient(closest-side at 50% 45%, #000 80%, transparent 100%)";

/** What the app does, as short chips under the pitch. */
const FEATURES: { label: string; Icon: ComponentType<{ className?: string }> }[] = [
  { label: "Buy, sell and send sats", Icon: Wallet },
  { label: "Weekly or monthly plans", Icon: CalendarSync },
  { label: "Pay in rupees", Icon: Banknote },
  { label: "Works inside Telegram", Icon: TelegramIcon },
];

/** The three layers share one crop, so they line up exactly when stacked. */
const LAYER = { width: 520, height: 638, sizes: "(min-width: 768px) 460px, 90vw" } as const;

/**
 * A hand under the Bitcoin Deepa app icon. When `tapping`, the hand rises to
 * touch the icon; on contact the icon presses in and brightens and the
 * fingertip picks up its orange light. The hand layers are drawn with
 * `lighten`, so their black ground disappears over the icon.
 */
function AppTap({ tapping }: { tapping: boolean }) {
  // Contact happens near the end of the hand's travel, so the icon and glow
  // wait for it on the way in and let go straight away on the way out.
  const contact = tapping ? "delay-[260ms]" : "delay-0";
  const layer = "absolute inset-0 h-full w-full select-none";

  return (
    <div
      className="relative aspect-[520/638] w-full"
      style={{
        maskImage: fade,
        WebkitMaskImage: fade,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    >
      <Image
        src="/images/join/bd-app-icon.webp"
        alt=""
        {...LAYER}
        className={cn(
          "absolute inset-0 h-full w-full origin-[50%_21%] select-none transition-[scale,filter] duration-200 ease-out motion-reduce:transition-none",
          contact,
          tapping ? "scale-[0.965] brightness-125" : "scale-100 brightness-100",
        )}
        draggable={false}
      />
      {/* Both hand renders travel together in one layer; only the lit one fades. */}
      <div
        className={cn(
          layer,
          "mix-blend-lighten transition-[translate] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:translate-y-0 motion-reduce:transition-none",
          tapping ? "translate-y-0" : "translate-y-[5%]",
        )}
      >
        <Image src="/images/join/bd-app-hand.webp" alt="" {...LAYER} className={layer} draggable={false} />
        <Image
          src="/images/join/bd-app-hand-glow.webp"
          alt=""
          {...LAYER}
          className={cn(
            layer,
            "transition-opacity duration-300 ease-out",
            contact,
            tapping ? "opacity-100" : "opacity-0",
          )}
          draggable={false}
        />
      </div>
    </div>
  );
}

export default function JoinCommunity() {
  const [tapping, setTapping] = useState(false);
  const tapOn = () => setTapping(true);
  const tapOff = () => setTapping(false);

  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-clip py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-16 lg:px-8">
        <div>
          <h2 id="join-title" className="reveal type-display text-white">
            Bitcoin, <span className="text-bitcoin">one tap away.</span>
          </h2>
          <p className="reveal mt-6 max-w-xl type-lede text-zinc-400">
            The Bitcoin Deepa app lets you buy, send and save sats on a weekly or monthly plan, paid
            in rupees. Open it in your browser or right inside Telegram.
          </p>

          <ul className="reveal mt-8 grid w-fit grid-cols-1 gap-2.5 sm:grid-cols-2" aria-label="What the app does">
            {FEATURES.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex h-10 items-center gap-2 rounded-xl bg-zinc-900 px-3.5 text-sm font-medium text-zinc-200"
              >
                <Icon className="size-4 shrink-0 text-bitcoin" />
                {label}
              </li>
            ))}
          </ul>

          <div className="reveal cta-row mt-10">
            <Button asChild size="lg">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbEvent("Lead", { content_name: "app" })}
                onPointerEnter={tapOn}
                onPointerLeave={tapOff}
                onFocus={tapOn}
                onBlur={tapOff}
              >
                <ResponsiveLabel short="Open app" full="Open the app" /> <ArrowUpRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" onClick={() => fbEvent("Lead")}>
                <ResponsiveLabel short="Community" full="Join the community" /> <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        {/* Pointing at the artwork taps too; it rises into place as you scroll. */}
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden
          onPointerEnter={tapOn}
          onPointerLeave={tapOff}
          className="hand-rise mx-auto block w-full max-w-[460px]"
        >
          <AppTap tapping={tapping} />
        </a>
      </div>
    </section>
  );
}
