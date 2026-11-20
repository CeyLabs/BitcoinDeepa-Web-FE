"use client";

import Link from "next/link";
import { fbEvent } from "@/src/lib/facebook-pixel";
import { LivingYaka } from "./hero/living-yaka";
import { TELEGRAM_INVITE } from "./nav/nav-data";
import { SriLankaFlag } from "./sri-lanka-flag";
import { Button, ResponsiveLabel } from "./ui/button";

/** Staggered CSS entrance: visible in the server HTML, animates on first paint. */
const enter = (ms: number) => ({ "--enter-delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative flex min-h-hero items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8">
        <div>
          {/* One sentence, one size: reads in a single pass. */}
          <h1 id="hero-title" className="animate-enter type-h1 text-white">
            Sri Lanka&apos;s fastest-growing{" "}
            <span className="text-bitcoin">
              Bitcoin{" "}
              <span className="whitespace-nowrap">
                community
                <SriLankaFlag className="ml-[0.22em] h-[0.62em] align-[0.02em]" />
              </span>
            </span>
          </h1>

          <p className="animate-enter mt-6 max-w-xl type-lede text-zinc-400" style={enter(80)}>
            Learn about Bitcoin, meet people who use it every day, and help build an open financial
            future for Sri Lanka.
          </p>

          <div className="animate-enter cta-row mt-10" style={enter(160)}>
            <Button asChild size="lg">
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" onClick={() => fbEvent("Lead")}>
                <ResponsiveLabel short="Join us" full="Join the community" />
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/about">Our story</Link>
            </Button>
          </div>
        </div>

        <div className="animate-enter relative pt-10 pb-8 lg:py-0" style={enter(200)}>
          <LivingYaka />
        </div>
      </div>
    </section>
  );
}
