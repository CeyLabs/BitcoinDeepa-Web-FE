import Image from "next/image";
import { IMG } from "./brand-data";
import { DownloadAllButton, DownloadSvgButton } from "./components/DownloadKit";
import { DynamicIslandTOC } from "./components/DynamicIslandTOC";
import { TableOfContents } from "./components/TableOfContents";
import { AppIconSection } from "./sections/AppIconSection";
import { AssetsSection, PatternsSection, VoiceSection } from "./sections/ClosingSections";
import { ColourSection } from "./sections/ColourSection";
import { IdeaSection } from "./sections/IdeaSection";
import { LogoSection } from "./sections/LogoSection";
import { ProfilePictureSection } from "./sections/ProfilePictureSection";
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

      <div className="relative overflow-x-clip bg-black">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 md:pb-32 md:pt-44 lg:px-8">
          {/* Hero: same frame as the other pages, text left and the lockup right. */}
          <header
            id="brand-guidelines"
            className="grid scroll-mt-28 items-center gap-12 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-16"
          >
            <div>
              <h1 className="type-display text-white">
                Bitcoin <span className="font-sinhala text-bitcoin">දීප</span>
                <span className="block">Brand guidelines</span>
              </h1>
              <p className="mt-6 max-w-2xl type-lede text-zinc-300">
                How to use the logo, colours, type and pattern of Bitcoin Deepa, the CeylonCash
                brand that brings Bitcoin to Sri Lanka. For marketing, press and partners.
              </p>
              <div className="cta-row mt-10">
                <DownloadAllButton />
                <DownloadSvgButton />
              </div>
              <p className="mt-5 text-sm text-zinc-500">
                SVG + PNG · 47 files · 17 MB · Version 1.0 · Updated October 2026 · Brand owner
                CeylonCash
              </p>
            </div>
            <Image
              src={IMG.sloganPrimaryWhite.src}
              alt="Bitcoin Deepa logo with the slogan Pearl of Satoshi"
              width={IMG.sloganPrimaryWhite.w}
              height={IMG.sloganPrimaryWhite.h}
              sizes="(min-width: 768px) 300px, 200px"
              priority
              className="mx-auto h-auto w-[200px] md:mr-0 md:w-[300px]"
            />
          </header>

          <div className="mt-24 grid grid-cols-1 border-t border-zinc-800 pt-16 md:mt-32 md:pt-24 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
            <aside className="relative hidden lg:block">
              <div className="sticky top-32">
                <TableOfContents />
              </div>
            </aside>

            <main className="min-w-0 space-y-24 md:space-y-32">
              <IdeaSection />
              <LogoSection />
              <AppIconSection />
              <ProfilePictureSection />
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
