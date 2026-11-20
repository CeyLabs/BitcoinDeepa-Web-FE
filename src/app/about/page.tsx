import type { Metadata } from "next";
import Image from "next/image";
import { BookOpen, CalendarDays, Store, Zap } from "lucide-react";
import { BTC_PATTERN_STYLE, HERITAGE_STRIP, IMG } from "@/src/app/brand/brand-data";
import { JsonLd } from "@/src/components/seo/json-ld";
import { buttonVariants, ResponsiveLabel } from "@/src/components/ui/button";
import { TELEGRAM_INVITE } from "@/src/components/nav/nav-data";
import { pageMetadata } from "@/src/lib/seo";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/src/lib/site";
import { JOURNEY, type JourneyEntry } from "./journey-data";

const DESCRIPTION =
  "Bitcoin Deepa, the Pearl of Satoshi, is Sri Lanka's grassroots Bitcoin-only community: meetups across the island, education in Sinhala and English, open-source Lightning tools and merchant adoption since 2022.";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description: DESCRIPTION,
  path: "/about",
});

const P = "/images/about";

const STATS = [
  { value: "2022", label: "First Ceylon Bitcoin Meetup" },
  { value: "4", label: "Cities with meetups" },
  { value: "1 of 18", label: "HRF Bitcoin Dev Fund projects" },
  { value: "0.009 BTC", label: "Crowdfunded for COVID relief" },
];

const PILLARS = [
  {
    Icon: CalendarDays,
    title: "Meetups",
    body: "Ceylon Bitcoin Meetups in Colombo, Galle, Kandy and Ella: talks, workshops and time to meet other Bitcoiners in person.",
  },
  {
    Icon: BookOpen,
    title: "Education",
    body: "Bitcoin in our own language: the Bitcoin කතා podcast, guides on our blog, and Bitcoin books and content translated into Sinhala, like “The Bullish Case for Bitcoin”.",
  },
  {
    Icon: Zap,
    title: "Lightning tools",
    body: "Open-source tools for everyday Bitcoin, like our Telegram Lightning wallet and Bolt Card tap-to-pay NFC cards.",
  },
  {
    Icon: Store,
    title: "Merchant adoption",
    body: "Onboarding local merchants to accept Bitcoin, and showing it works with real use cases like paying salaries in sats.",
  },
];

const WHY = [
  {
    title: "Financial inclusion",
    body: "For communities facing inflation, economic instability and limited access to banking, Bitcoin is a lifeline: savings that hold their value, and payments that need no bank account.",
  },
  {
    title: "Education in our own language",
    body: "Understanding comes first. We teach Bitcoin in Sinhala as well as English, so more Sri Lankans can learn it properly and use it safely.",
  },
  {
    title: "A global connection",
    body: "With the Lightning Network, Sri Lankans can send and receive value worldwide in seconds for a fraction of a cent, including remittances from family abroad.",
  },
];

// Hero mosaic: several smaller photos keep each one at its native sharpness.
const MOSAIC = [
  { src: `${P}/2023-ella-meetup.png`, alt: "Group photo in the hills at the Ceylon Bitcoin Meetup in Ella", w: 714, h: 536, cls: "col-span-2 row-span-2" },
  { src: `${P}/2022-mike-g-meetup.png`, alt: "Group photo at the Ceylon Bitcoin Meetup with Mike G", w: 640, h: 480, cls: "" },
  { src: `${P}/2025-book.png`, alt: "The Sinhala edition of The Bullish Case for Bitcoin", w: 1024, h: 717, cls: "" },
  { src: `${P}/2023-colombo-session.jpeg`, alt: "Attendees at a Colombo meetup", w: 512, h: 384, cls: "" },
  { src: `${P}/2023-bolt-card.jpeg`, alt: "A Bitcoin Deepa Bolt Card NFC wallet card", w: 337, h: 384, cls: "" },
];

const btnPrimary = buttonVariants();
const btnSecondary = buttonVariants({ variant: "secondary" });

function SectionHeading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <p className="mb-4 type-eyebrow text-bitcoin">{eyebrow}</p>
      <h2 className="type-h2 text-white">{title}</h2>
      {lede && <p className="mx-auto mt-5 max-w-2xl type-lede text-zinc-400">{lede}</p>}
    </div>
  );
}

function Entry({ entry }: { entry: JourneyEntry }) {
  const photos = entry.photos ?? [];
  return (
    <li className="relative pl-8 sm:pl-10">
      <span
        aria-hidden
        className="absolute top-1.5 left-0 size-3 -translate-x-[calc(50%-0.5px)] rounded-full bg-bitcoin ring-4 ring-black"
      />
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-7 items-center rounded-md bg-zinc-800 px-2.5 text-sm text-zinc-300">
          {entry.month}
        </span>
        <h4 className="text-xl leading-snug font-bold text-white">{entry.title}</h4>
      </div>
      {entry.body && <p className="mt-3 max-w-2xl leading-relaxed text-zinc-400">{entry.body}</p>}
      {entry.figure && (
        <div className="mt-4 inline-flex flex-col rounded-xl bg-zinc-900 px-5 py-4">
          <span className="text-2xl font-bold tabular-nums text-bitcoin">{entry.figure.value}</span>
          <span className="text-sm text-zinc-400">{entry.figure.label}</span>
        </div>
      )}
      {photos.length === 1 && (
        // A single image keeps its own aspect ratio (covers, announcements).
        <Image
          src={photos[0].src}
          alt={photos[0].alt}
          width={photos[0].w}
          height={photos[0].h}
          sizes="(min-width: 768px) 448px, 90vw"
          className={`mt-5 h-auto w-full rounded-md ${photos[0].h > photos[0].w ? "max-w-[280px]" : "max-w-md"}`}
        />
      )}
      {photos.length > 1 && (
        <div
          className={
            photos.length === 2
              ? "mt-5 grid max-w-2xl grid-cols-2 gap-2"
              : "mt-5 grid max-w-3xl grid-cols-2 gap-2 sm:grid-cols-3"
          }
        >
          {photos.map((p) => (
            <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-md bg-zinc-900">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 260px, 45vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "AboutPage",
              name: `About ${SITE_NAME}`,
              url: absoluteUrl("/about"),
              description: DESCRIPTION,
              about: { "@id": `${SITE_URL}/#organization` },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: SITE_NAME, item: absoluteUrl("/") },
                { "@type": "ListItem", position: 2, name: "About Us", item: absoluteUrl("/about") },
              ],
            },
          ],
        }}
      />

      <div className="relative overflow-x-clip bg-black">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-radial-[ellipse_at_top] from-bitcoin/15 via-transparent to-transparent"
        />

        {/* Hero */}
        <section className="relative mx-auto max-w-(--breakpoint-xl) px-4 pt-36 sm:px-6 md:pt-44">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 type-eyebrow text-bitcoin">About us</p>
            <h1 className="type-display text-white">
              Sri Lanka&apos;s grassroots <span className="text-bitcoin">Bitcoin</span> community
            </h1>
            <p className="mx-auto mt-6 max-w-2xl type-lede text-zinc-300">
              A movement for financial freedom, bringing people together across the island since
              2022 to learn about Bitcoin, use it and build with it, in Sinhala and English.
            </p>
            <div className="cta-row mt-9 sm:justify-center">
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                <ResponsiveLabel short="Join us" full="Join the community" />
              </a>
              <a href="#journey" className={btnSecondary}>
                Our journey
              </a>
            </div>
          </div>

          {/* Photo mosaic */}
          <div className="mt-16 md:mt-20">
            <div className="grid h-[320px] grid-cols-3 grid-rows-2 gap-2 sm:h-[420px] md:h-[480px] md:grid-cols-4">
              {MOSAIC.map((m, i) => (
                <div
                  key={m.src}
                  className={`relative overflow-hidden rounded-md bg-zinc-900 ${m.cls} ${i === 4 ? "hidden md:block" : ""}`}
                >
                  <Image
                    src={m.src}
                    alt={m.alt}
                    fill
                    priority={i === 0}
                    sizes={i === 0 ? "(min-width: 768px) 640px, 66vw" : "(min-width: 768px) 320px, 33vw"}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex h-1.5 gap-1.5" aria-hidden="true">
              {HERITAGE_STRIP.map((s, i) => (
                <span key={i} className="rounded-sm" style={{ background: s.c, flexGrow: s.f, flexBasis: 0 }} />
              ))}
            </div>
          </div>
        </section>

        {/* Stats band */}
        <section aria-label="Bitcoin Deepa in numbers" className="mx-auto max-w-(--breakpoint-xl) px-4 py-24 sm:px-6 md:py-32">
          <dl className="grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse items-center gap-2 text-center">
                <dt className="text-sm text-zinc-400 md:text-base">{s.label}</dt>
                <dd className="text-4xl font-medium tracking-[-0.02em] tabular-nums text-bitcoin md:text-5xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* One community band */}
        <section className="relative isolate flex min-h-[520px] items-end overflow-hidden md:min-h-[620px]">
          <Image
            src={`${P}/2022-kandy-meetup.png`}
            alt=""
            fill
            sizes="100vw"
            className="-z-20 scale-105 object-cover blur-[2px]"
          />
          {/* Fades to black at both edges so the band blends into the page. */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#000_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.72)_60%,#000_100%)]"
          />
          <div className="mx-auto max-w-3xl px-4 pb-20 text-center sm:px-6 md:pb-24">
            <h2 className="type-h2 text-white">
              Many cities. One community.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl type-lede text-zinc-200">
              From Colombo to Galle, Kandy and the hills of Ella, we are beginners, developers,
              business owners and the simply curious, with one shared conviction: Bitcoin is a tool
              for financial freedom, and every Sri Lankan deserves to understand it.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-(--breakpoint-xl) px-4 sm:px-6">
          {/* What we do */}
          <section id="what-we-do" className="scroll-mt-28 py-24 md:py-32">
            <SectionHeading
              eyebrow="What we do"
              title="Bitcoin, from the island"
              lede="Four things, done in the open and on the ground. Everything we do is education: nothing we share is financial advice."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PILLARS.map(({ Icon, title, body }) => (
                <div key={title} className="rounded-xl bg-zinc-900 p-6">
                  <span className="mb-5 flex size-10 items-center justify-center rounded-lg bg-zinc-800 text-bitcoin">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
                  <p className="leading-relaxed text-zinc-400">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Manifesto */}
          <section id="why" className="grid scroll-mt-28 items-center gap-12 py-12 md:grid-cols-2 md:gap-16 md:py-20">
            <div className="relative mx-auto flex aspect-square w-full max-w-[520px] items-center justify-center overflow-hidden rounded-xl" style={BTC_PATTERN_STYLE}>
              <div aria-hidden className="absolute inset-0 bg-radial from-black/40 via-black/80 to-black" />
              <Image
                src={IMG.yaka.src}
                alt="The Yaka mask, the Bitcoin Deepa symbol"
                width={IMG.yaka.w}
                height={IMG.yaka.h}
                sizes="(min-width: 768px) 320px, 60vw"
                className="relative h-auto w-[60%]"
              />
            </div>
            <div>
              <p className="mb-4 type-eyebrow text-bitcoin">Why it matters</p>
              <h2 className="type-h2 text-white">
                Sound money for the Pearl of the Indian Ocean.
              </h2>
              <dl className="mt-8 space-y-6">
                {WHY.map((w) => (
                  <div key={w.title}>
                    <dt className="text-lg font-bold text-white">{w.title}</dt>
                    <dd className="mt-1 leading-relaxed text-zinc-400">{w.body}</dd>
                  </div>
                ))}
              </dl>
              <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" className={`mt-9 ${btnPrimary}`}>
                Join us
              </a>
            </div>
          </section>

          {/* Journey */}
          <section id="journey" className="scroll-mt-28 py-24 md:py-32">
            <SectionHeading
              eyebrow="Our journey"
              title="From a first meetup to a Sinhala book"
              lede="The milestones so far, year by year."
            />
            <div className="mx-auto max-w-5xl space-y-14">
              {JOURNEY.map((y) => (
                <section
                  key={y.year}
                  aria-labelledby={`year-${y.year}`}
                  className="md:grid md:grid-cols-[120px_minmax(0,1fr)] md:gap-8"
                >
                  <h3
                    id={`year-${y.year}`}
                    className="mb-6 text-4xl leading-none font-medium tracking-[-0.02em] tabular-nums text-white md:sticky md:top-28 md:mb-0 md:self-start"
                  >
                    {y.year}
                  </h3>
                  <ol className="relative space-y-10 border-l border-zinc-800">
                    {y.entries.map((e) => (
                      <Entry key={`${y.year}-${e.month}-${e.title}`} entry={e} />
                    ))}
                  </ol>
                </section>
              ))}
            </div>
          </section>

          {/* Backed by */}
          <section aria-labelledby="backed-by" className="border-y border-zinc-800 py-16 text-center">
            <h2 id="backed-by" className="mb-8 type-eyebrow text-zinc-400">
              Backed by
            </h2>
            <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-medium tracking-[-0.01em] text-white">CeylonCash</span>
                <span className="text-sm text-zinc-500">Bitcoin Deepa is a CeylonCash initiative</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-2xl font-medium tracking-[-0.01em] text-white">Human Rights Foundation</span>
                <span className="text-sm text-zinc-500">Funded by the HRF Bitcoin Dev Fund, 2024</span>
              </div>
            </div>
          </section>
        </div>

        {/* Closing */}
        <section className="relative isolate mt-24 overflow-hidden py-28 md:py-36" style={BTC_PATTERN_STYLE}>
          <div aria-hidden className="absolute inset-0 -z-10 bg-radial from-black/30 via-black/80 to-black" />
          <div className="mx-auto max-w-xl px-4">
            <div className="rounded-xl bg-zinc-900 px-6 py-10 text-center shadow-[0_24px_48px_-12px_rgba(0,0,0,0.9)] ring-1 ring-zinc-800 sm:px-10">
              <h2 className="type-h3 text-white">
                Come to a meetup.
              </h2>
              <p className="mt-4 leading-relaxed text-zinc-400">
                New to Bitcoin, a developer, a business owner or just curious: you are welcome.
              </p>
              <div className="cta-row mt-8 sm:justify-center">
                <a href={TELEGRAM_INVITE} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  Join on Telegram
                </a>
                <a href="https://lu.ma/bitcoindeepa" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                  Events on Luma
                </a>
              </div>
              <a
                href="https://blog.bitcoindeepa.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm text-zinc-400 underline-offset-4 hover:text-bitcoin hover:underline"
              >
                Or start with the guides on our blog
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
