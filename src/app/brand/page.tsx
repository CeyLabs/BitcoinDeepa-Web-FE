import Image from "next/image";
import { BTC_PATTERN_STYLE, HERITAGE_STRIP, IMG } from "./brand-data";
import { DownloadAllButton, DownloadSvgButton } from "./components/DownloadKit";
import { DynamicIslandTOC } from "./components/DynamicIslandTOC";
import { TableOfContents } from "./components/TableOfContents";
import { AppIconSection } from "./sections/AppIconSection";
import { AssetsSection, PatternsSection, VoiceSection } from "./sections/ClosingSections";
import { ColourSection } from "./sections/ColourSection";
import { IdeaSection } from "./sections/IdeaSection";
import { LogoSection } from "./sections/LogoSection";
import { TypographySection } from "./sections/TypographySection";
import { BackgroundsSection, ClearSpaceSection, MisuseSection } from "./sections/UsageSections";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.bitcoindeepa.com";

export default function BrandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Brand Guidelines | Bitcoin Deepa",
            description: "Official Bitcoin Deepa brand assets and guidelines.",
            url: `${BASE_URL}/brand`,
            about: {
              "@type": "Organization",
              name: "Bitcoin Deepa",
              url: BASE_URL,
              parentOrganization: { "@type": "Organization", name: "CeylonCash" },
            },
          }),
        }}
      />

      <DynamicIslandTOC />

      <div className="relative min-h-screen overflow-x-clip bg-black">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(248,147,26,0.14),transparent_60%)]" />

        <div className="relative mx-auto max-w-(--breakpoint-2xl) px-4 pb-24 pt-32 sm:px-6 lg:pb-40">
          {/* Masthead */}
          <header
            id="brand-guidelines"
            className="scroll-mt-28 overflow-hidden rounded-xl bg-black ring-1 ring-white/10"
            style={BTC_PATTERN_STYLE}
          >
            <div className="grid items-end gap-10 bg-linear-to-r from-black via-black/90 to-black/40 px-6 py-12 sm:px-10 md:grid-cols-[1.2fr_1fr] md:py-16 lg:px-14">
              <div>
                <h1 className="mb-5 type-display text-white">
                  Bitcoin Deepa <em className="text-[#F8931A]">brand guidelines</em>
                </h1>
                <p className="max-w-xl text-lg text-zinc-300">
                  How to use the logo, colours, type and pattern of Bitcoin Deepa, the CeylonCash
                  brand that brings Bitcoin to Sri Lanka.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Marketing materials", "Press", "Partners", "Brand assets"].map((tag) => (
                    <span
                      key={tag}
                      className="flex h-7 items-center rounded-md bg-zinc-800 px-2.5 text-sm text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap sm:items-center">
                  <DownloadAllButton />
                  <DownloadSvgButton />
                </div>
                <p className="mt-2.5 text-xs text-zinc-500">SVG + PNG · 44 files · 15 MB zip</p>
                <dl className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <div className="flex gap-1.5">
                    <dt>Version</dt>
                    <dd className="text-white">1.0</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Updated</dt>
                    <dd className="text-white">October 2026</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Brand owner</dt>
                    <dd className="text-white">CeylonCash</dd>
                  </div>
                </dl>
              </div>
              <Image
                src={IMG.sloganWhite.src}
                alt="Bitcoin Deepa logo with the slogan Pearl of Satoshi"
                width={IMG.sloganWhite.w}
                height={IMG.sloganWhite.h}
                sizes="(min-width: 768px) 320px, 220px"
                priority
                className="h-auto w-[220px] justify-self-center md:w-[320px] md:justify-self-end"
              />
            </div>
            <div className="flex h-5 gap-1.5 bg-black px-1.5 pb-1.5" aria-hidden="true">
              {HERITAGE_STRIP.map((s, i) => (
                <span
                  key={i}
                  className="rounded-b-md"
                  style={{ background: s.c, flexGrow: s.f, flexBasis: 0 }}
                />
              ))}
            </div>
          </header>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12">
            <aside className="relative hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents />
              </div>
            </aside>

            <main className="min-w-0 space-y-24">
              <IdeaSection />
              <LogoSection />
              <AppIconSection />
              <BackgroundsSection />
              <ClearSpaceSection />
              <MisuseSection />
              <ColourSection />
              <TypographySection />
              <PatternsSection />
              <VoiceSection />
              <AssetsSection />

              <div className="space-y-4 rounded-xl bg-zinc-900 p-6">
                <p className="leading-relaxed text-zinc-300">
                  <strong className="text-white">Important:</strong> These graphics are proprietary
                  to CeylonCash and protected under intellectual property laws. Please don&apos;t
                  alter the files, display them in a way that implies a relationship, affiliation or
                  endorsement by Bitcoin Deepa of your product, service or business, or use them as
                  part of your own product, business or service&apos;s name.
                </p>
                <p className="text-zinc-400">
                  For questions or special requests, email{" "}
                  <a
                    href="mailto:hello@bitcoindeepa.com"
                    className="text-[#F8931A] underline-offset-4 hover:underline"
                  >
                    hello@bitcoindeepa.com
                  </a>
                  .
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
