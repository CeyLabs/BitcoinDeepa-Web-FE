import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

// Branded 404. Without this file Next.js falls back to its built-in page, which
// follows the visitor's OS colour scheme and renders white in light mode.
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
  // Don't inherit the home page canonical.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen-dynamic items-center justify-center overflow-hidden bg-black px-4 pt-32 pb-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-radial-[ellipse_at_top] from-bitcoin/15 via-transparent to-transparent"
      />

      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <Image
          src="/assets/brand/kit/04-Yaka-Symbol/Yaka_LaserEyes.svg"
          alt=""
          width={160}
          height={197}
          priority
          className="mb-8 h-auto w-28 opacity-90 sm:w-36"
        />

        <p className="font-secondary text-sm font-semibold uppercase tracking-[0.2em] text-bitcoin">
          Error 404
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          This block doesn&apos;t exist
        </h1>
        <p className="mt-4 text-base text-zinc-400 sm:text-lg">
          The page you&apos;re looking for has moved, been removed, or never
          made it into the chain.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-bitcoin px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-bitcoin-dark"
          >
            Back to home
          </Link>
          <Link
            href="/satoshi-to-usd-and-lkr-converter"
            className="rounded-xl border-[1.5px] border-white px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-bitcoin hover:text-bitcoin"
          >
            Sats converter
          </Link>
        </div>
      </div>
    </main>
  );
}
