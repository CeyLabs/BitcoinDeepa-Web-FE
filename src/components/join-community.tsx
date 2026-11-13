"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/src/app/brand/brand-data";
import { fbEvent } from "@/src/lib/facebook-pixel";
import { BrandName } from "./brand-provider";
import { TELEGRAM_INVITE } from "./nav/nav-data";
import { Button } from "./ui/button";

// Non-breaking spaces around the dots: SVG would trim the trailing one at the seam.
const RING_PHRASE = "BITCOIN DEEPA · PEARL OF SATOSHI · ";
const RING_TEXT = RING_PHRASE.repeat(2);
const COIN_EDGE = [1, 2, 3, 4, 5, 6];

// Each forearm dissolves into the page towards its outer edge.
const fadeLeft = "linear-gradient(to right, transparent 0%, #000 38%)";
const fadeRight = "linear-gradient(to left, transparent 0%, #000 38%)";

/** The Yaka mark in a round seal; the lettering ring turns slowly. */
function YakaSeal() {
  return (
    <div className="relative size-28 shrink-0 sm:size-36 md:size-48 lg:size-52">
      <svg
        viewBox="0 0 160 160"
        aria-hidden
        className="absolute inset-0 size-full animate-[spin_40s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path id="seal-ring" d="M80,80 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" />
        </defs>
        <circle cx="80" cy="80" r="78" fill="none" stroke="currentColor" strokeWidth="1" className="text-zinc-700" />
        {/* textLength = ring circumference (2π·62), so the phrase closes the loop exactly. */}
        <text className="fill-zinc-400 text-[9.5px] font-semibold">
          <textPath href="#seal-ring" textLength={389} lengthAdjust="spacing">
            {RING_TEXT}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[17%] [perspective:600px]">
        <div className="relative size-full animate-[coin-sway_7s_ease-in-out_infinite] [transform-style:preserve-3d] motion-reduce:animate-none">
          {/* Stacked, darkened copies behind the face give the coin a real
              edge that shows as it turns. */}
          {COIN_EDGE.map((z) => (
            <Image
              key={z}
              src="/images/join/coin.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 140px, 70px"
              className="select-none"
              style={{ transform: `translateZ(-${z}px)`, filter: "brightness(0.45)" }}
            />
          ))}
          <Image src="/images/join/coin.webp" alt="" fill sizes="(min-width: 768px) 140px, 70px" className="select-none" />
          <YakaInlay />
        </div>
      </div>
    </div>
  );
}

/**
 * The official Yaka vector set into the coin as black enamel (brand rule:
 * on Satoshi Orange the mark is black). A dark upper-left lip and a lit
 * lower-right lip make it read as recessed into the metal.
 */
function YakaInlay() {
  const mask = {
    maskImage: `url('${IMG.yakaBoldSvg}')`,
    WebkitMaskImage: `url('${IMG.yakaBoldSvg}')`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  } as const;
  const layer = "absolute inset-0";

  return (
    <div className="absolute top-1/2 left-1/2 h-[54%] [transform:translate(-50%,-50%)_translateZ(0.5px)]" style={{ aspectRatio: `${IMG.yakaBold.w} / ${IMG.yakaBold.h}` }}>
      <div className={layer} style={{ ...mask, background: "#ffd9a0", transform: "translate(0.8px, 0.8px)", opacity: 0.85 }} />
      <div className={layer} style={{ ...mask, background: "#5a2a00", transform: "translate(-0.6px, -0.6px)" }} />
      <div className={layer} style={{ ...mask, background: "linear-gradient(140deg, #2b2b2b 0%, #0a0a0a 55%, #000 100%)" }} />
    </div>
  );
}

export default function JoinCommunity() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-clip py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 id="join-title" className="reveal type-display text-white">
          Reach out. <span className="text-bitcoin">Join in.</span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl type-lede text-zinc-400">
          Sri Lanka&apos;s fastest-growing Bitcoin community, from grassroots meetups to <BrandName />{" "}
          initiatives by Pearl of Satoshi.
        </p>
      </div>

      {/* Two hands reaching for the Yaka seal; they travel in as you scroll. */}
      <div className="mt-10 grid grid-cols-[1fr_auto_1fr] items-center md:mt-14" aria-hidden>
        <div className="hand-in-left flex justify-end">
          <Image
            src="/images/join/hand-left.webp"
            alt=""
            width={768}
            height={420}
            sizes="(min-width: 1536px) 768px, 45vw"
            className="h-auto w-full max-w-[768px]"
            style={{ maskImage: fadeLeft, WebkitMaskImage: fadeLeft }}
          />
        </div>
        <YakaSeal />
        <div className="hand-in-right flex justify-start">
          <Image
            src="/images/join/hand-right.webp"
            alt=""
            width={768}
            height={420}
            sizes="(min-width: 1536px) 768px, 45vw"
            className="h-auto w-full max-w-[768px]"
            style={{ maskImage: fadeRight, WebkitMaskImage: fadeRight }}
          />
        </div>
      </div>

      <div className="mt-10 flex justify-center px-4 md:mt-14">
        <Button asChild size="lg">
          <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" onClick={() => fbEvent("Lead")}>
            Join the community on Telegram <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}
