"use client";

import { useEffect, useRef } from "react";
import { fbEvent, lkrValueParams, preloadUsdRate } from "@/src/lib/facebook-pixel";
import Image from "next/image";
import { useInView } from "framer-motion";
import { ArrowUpRight, Languages, PenLine, Truck } from "lucide-react";
import { BTC_PATTERN_STYLE } from "@/src/app/brand/brand-data";
import { Button } from "./ui/button";

export default function BookOrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const originalPrice = 1600;
  const salePrice = 1300;
  const discountPercentage = Math.floor(((originalPrice - salePrice) / originalPrice) * 100);

  const paymentUrl = "https://payhere.lk/pay/of811f041";

  // Load the LKR->USD rate once the section is on screen, so the pixel event
  // can carry a valid USD value without delaying the PayHere tab (which must
  // open synchronously in the click handler or it gets popup-blocked).
  useEffect(() => {
    if (isInView) preloadUsdRate();
  }, [isInView]);

  const handleOrderNow = () => {
    fbEvent("Purchase", lkrValueParams(salePrice));
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section ref={sectionRef} id="book-order" aria-labelledby="book-title" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-16">
          <h2 id="book-title" className="reveal type-h2">
            <span className="block text-white">The Bullish Case for Bitcoin,</span>
            <span className="block text-zinc-500">now in Sinhala.</span>
          </h2>
          <p className="reveal border-l-2 border-bitcoin pl-6 text-xl leading-relaxed text-zinc-200 md:text-2xl">
            Get your copy of the first comprehensive Bitcoin book translated for Sri Lankan readers.
          </p>
        </div>

        {/* Bento */}
        {/* Two columns from phone size up: author and translator share a row
            instead of each taking a full-width card. */}
        <div className="reveal grid grid-cols-2 gap-2 lg:grid-cols-4 lg:grid-rows-[auto_auto_1fr]">
          {/* Book */}
          <div
            className="relative isolate col-span-2 flex min-h-[420px] flex-col justify-end overflow-hidden rounded-xl bg-zinc-900 p-6 sm:min-h-[520px] sm:p-7 lg:row-span-3 lg:min-h-[560px] lg:p-9"
            style={BTC_PATTERN_STYLE}
          >
            <div aria-hidden className="absolute inset-0 -z-10 bg-radial-[ellipse_at_50%_40%] from-bitcoin/25 via-zinc-900/90 to-zinc-900" />
            <Image
              src="/images/book-mockup-preview.png"
              alt="The Bullish Case for Bitcoin, Sinhala edition (බිට්කොයින් පෙළහර)"
              width={509}
              height={490}
              sizes="(min-width: 1024px) 420px, 80vw"
              className="absolute top-6 left-1/2 h-auto w-[70%] max-w-[420px] -translate-x-1/2 drop-shadow-[0_30px_40px_rgba(0,0,0,0.7)] sm:top-8 sm:w-[78%] lg:top-10"
            />
            <div className="relative">
              <p className="font-sinhala text-3xl leading-tight font-bold text-white md:text-4xl">බිට්කොයින් පෙළහර</p>
              <p className="mt-1 text-zinc-400">The Bullish Case for Bitcoin, Sinhala edition</p>
            </div>
          </div>

          {/* Author */}
          <div className="flex min-h-[132px] flex-col justify-between gap-4 rounded-xl bg-zinc-900 p-5 sm:min-h-[170px] sm:p-7">
            <PenLine className="size-6 text-zinc-300 sm:size-7" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-zinc-500">Author</p>
              <p className="mt-1 text-lg leading-snug font-medium text-white sm:text-xl">Vijay Boyapati</p>
            </div>
          </div>

          {/* Translation */}
          <div className="flex min-h-[132px] flex-col justify-between gap-4 rounded-xl bg-zinc-900 p-5 sm:min-h-[170px] sm:p-7">
            <Languages className="size-6 text-zinc-300 sm:size-7" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-zinc-500">Translated by</p>
              <p className="mt-1 text-lg leading-snug font-medium text-white sm:text-xl">CeylonCash</p>
            </div>
          </div>

          {/* Quote */}
          <figure className="col-span-2 flex flex-col justify-between gap-6 rounded-xl bg-zinc-900 p-6 sm:p-7">
            <blockquote className="type-lede text-zinc-200">
              &ldquo;An excellent and inspiring introduction to, and reminder of, Bitcoin&apos;s value to the world,
              all through a comprehensive and historical lens on money.&rdquo;
            </blockquote>
            <figcaption className="text-sm text-zinc-400">
              <span className="font-semibold text-white">Jack Dorsey</span>, co-founder of Twitter, CEO of Square
            </figcaption>
          </figure>

          {/* Price & order */}
          <div className="col-span-2 flex flex-col justify-between gap-6 rounded-xl bg-bitcoin p-6 sm:p-7">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-black/70">Price</p>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="text-4xl font-medium tracking-[-0.02em] tabular-nums text-black md:text-5xl">
                    රු. {salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-black/55 tabular-nums line-through">
                    රු. {originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
              <span className="flex h-8 items-center rounded-md bg-black px-2.5 text-sm font-medium text-bitcoin">
                {discountPercentage}% off
              </span>
            </div>
            <div>
              <Button variant="dark" size="lg" onClick={handleOrderNow} className="w-full focus-visible:ring-white">
                Order now <ArrowUpRight />
              </Button>
              <p className="mt-3 flex items-center justify-center gap-2 text-sm text-black/70">
                <Truck className="size-4" aria-hidden />
                Secure payment via PayHere · Delivered in Sri Lanka in 5–7 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
