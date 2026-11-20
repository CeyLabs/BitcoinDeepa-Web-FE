import type { Metadata } from "next";
import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Bot, CalendarDays, Mail, Newspaper } from "lucide-react";
import { BTC_PATTERN_STYLE, IMG } from "@/src/app/brand/brand-data";
import { CommunityGallery } from "@/src/components/community-gallery";
import { Github, InstagramIcon, TelegramIcon, TwitterIcon } from "@/src/components/icons";
import { TELEGRAM_INVITE } from "@/src/components/nav/nav-data";
import { JsonLd } from "@/src/components/seo/json-ld";
import { buttonVariants, ResponsiveLabel } from "@/src/components/ui/button";
import { getNewsPosts } from "@/src/lib/news";
import { pageMetadata } from "@/src/lib/seo";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME, SOCIAL_LINKS } from "@/src/lib/site";

// Latest news is refreshed in the background (same cadence as /news).
export const revalidate = 900;

const DESCRIPTION =
  "Join the Bitcoin Deepa community: Sri Lankan Bitcoiners meeting up across the island, learning together and building with Bitcoin. Find us on Telegram, X, Instagram, Luma and more.";

export const metadata: Metadata = pageMetadata({
  title: "Community",
  description: DESCRIPTION,
  path: "/community",
});

interface Channel {
  tag: string;
  name: string;
  detail: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}

const CHANNELS: Channel[] = [
  { tag: "Discussions", name: "Telegram", detail: "Community chat", href: TELEGRAM_INVITE, Icon: TelegramIcon },
  { tag: "Announcements", name: "X", detail: "@pearlofsatoshi", href: SOCIAL_LINKS.x, Icon: TwitterIcon },
  { tag: "Announcements", name: "Instagram", detail: "@bitcoindeepa", href: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { tag: "Meetups", name: "Luma", detail: "Events calendar", href: "https://lu.ma/bitcoindeepa", Icon: CalendarDays },
  { tag: "Tools", name: "BitcoinDeepaBot", detail: "Lightning wallet on Telegram", href: "https://t.me/bitcoindeepabot", Icon: Bot },
  { tag: "Learning", name: "Blog", detail: "blog.bitcoindeepa.com", href: "https://blog.bitcoindeepa.com", Icon: Newspaper },
  { tag: "Engineering", name: "GitHub", detail: "CeyLabs", href: SOCIAL_LINKS.github, Icon: Github },
  { tag: "Contact", name: "Email", detail: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
];

const newsDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "Asia/Colombo" });

const btnDark =
  "inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-900";

export default async function CommunityPage() {
  const news = (await getNewsPosts()).slice(0, 3);

  return (
    <main className="relative isolate overflow-x-clip bg-black">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Community | ${SITE_NAME}`,
          url: absoluteUrl("/community"),
          description: DESCRIPTION,
        }}
      />

      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pt-36 sm:px-6 md:pt-44 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 right-[-10%] -z-10 hidden aspect-square w-[620px] items-center justify-center md:flex"
        >
          <div className="absolute inset-0 rounded-full bg-radial from-bitcoin/25 via-bitcoin/5 to-transparent blur-2xl" />
          <Image src={IMG.yaka.src} alt="" width={IMG.yaka.w} height={IMG.yaka.h} sizes="360px" className="relative h-auto w-[58%] opacity-60" />
        </div>
        <h1 className="max-w-3xl type-display text-white">
          Bitcoin <span className="font-sinhala text-bitcoin">දීප</span> Community
        </h1>
        <p className="mt-6 max-w-2xl type-lede text-zinc-300">
          A grassroots home for Sri Lankan Bitcoiners: beginners, developers, business owners and
          the simply curious, meeting up across the island and learning together.
        </p>

        {/* Two big tiles */}
        <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2">
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-bitcoin p-7 md:p-9">
            <h2 className="type-h3 text-black">Learn in depth</h2>
            <div className="cta-row mt-8">
              <Link href="/news" className={btnDark}>
                <ResponsiveLabel short="News" full="Read the news" />
              </Link>
              <a href="https://blog.bitcoindeepa.com" target="_blank" rel="noopener noreferrer" className={btnDark}>
                <ResponsiveLabel short="Blog" full="Visit the blog" /> <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
          <div className="flex min-h-[220px] flex-col justify-between rounded-xl bg-zinc-900 p-7 md:p-9" style={BTC_PATTERN_STYLE}>
            <h2 className="type-h3 text-white">Join the conversation</h2>
            <div className="cta-row mt-8">
              <a
                href={TELEGRAM_INVITE}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants()}
              >
                Join on Telegram <ArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="moments" className="py-24 md:py-32">
        <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 md:mb-14 lg:px-8">
          <h2 id="moments" className="type-h2">
            <span className="block text-white">Moments from</span>
            <span className="block text-zinc-500">the community.</span>
          </h2>
        </div>
        <CommunityGallery />
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Wayfinding */}
        <section aria-labelledby="channels" className="pb-24 md:pb-32">
          <h2 id="channels" className="type-h2 text-white">
            Find us everywhere
          </h2>
          <p className="mt-5 max-w-2xl type-lede text-zinc-400">
            Where the community talks, meets and shares updates. Pick a channel and say hello.
          </p>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHANNELS.map(({ tag, name, detail, href, Icon }) => {
              const external = !href.startsWith("mailto:");
              return (
                <li key={name}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full min-h-[200px] flex-col rounded-xl bg-zinc-900 p-5 outline-none transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-bitcoin"
                  >
                    <span className="flex h-7 w-fit items-center rounded-md bg-black px-2.5 text-sm text-zinc-300">{tag}</span>
                    <Icon className="mt-6 size-6 text-white transition-colors group-hover:text-bitcoin" />
                    <span className="mt-3 flex items-center gap-1.5 text-xl font-medium text-white">
                      {name}
                      <ArrowUpRight className="size-4 text-zinc-500 transition-colors group-hover:text-bitcoin" aria-hidden />
                    </span>
                    <span className="mt-auto pt-6 text-lg text-zinc-400">{detail}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Latest news */}
        {news.length > 0 && (
          <section aria-labelledby="latest-news" className="border-t border-zinc-800 py-24 md:py-32">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="latest-news" className="type-h2 text-white">
                News
              </h2>
              <Link
                href="/news"
                className={buttonVariants({ variant: "secondary" })}
              >
                All news
              </Link>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {news.map((post) => (
                <article key={post.id} className="flex flex-col">
                  <div className="relative aspect-[1.91/1] overflow-hidden rounded-xl bg-zinc-900">
                    {post.image && (
                      <Image src={post.image} alt="" fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
                    )}
                  </div>
                  <p className="mt-4 text-sm text-zinc-500">
                    <time dateTime={post.publishedAt}>{newsDate.format(new Date(post.publishedAt))}</time>
                  </p>
                  <h3 className="mt-1 line-clamp-3 text-xl leading-snug font-medium text-white">{post.title}</h3>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-5 w-fit ${buttonVariants({ variant: "secondary", size: "sm" })}`}
                  >
                    Read article <ArrowUpRight />
                  </a>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
