import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandName } from "./brand-provider";
import { CommunityGallery, ICONS_3D } from "./community-gallery";
import { Button } from "./ui/button";

const WORDS = [
  { word: "Meet", icon: ICONS_3D.meetup },
  { word: "Learn", icon: ICONS_3D.book },
  { word: "Pay", icon: ICONS_3D.lightning },
  { word: "Shine", icon: ICONS_3D.lamp, accent: true },
] as const;

/** A 3D icon set into the line of type, sized to the cap height. */
function InlineIcon({ src }: { src: string }) {
  return (
    <span className="mx-[0.12em] inline-flex size-[0.9em] translate-y-[0.08em] items-center justify-center overflow-hidden rounded-[0.18em] bg-black align-baseline ring-1 ring-zinc-800 ring-inset">
      <Image src={src} alt="" width={512} height={512} sizes="96px" className="size-[88%]" />
    </span>
  );
}

export default function Community() {
  return (
    <section id="community" aria-labelledby="community-title" className="relative overflow-clip py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="community-title" className="reveal type-display leading-[1.02] text-white">
          {WORDS.map(({ word, icon, ...rest }) => (
            <span key={word} className="mr-[0.25em] inline-block whitespace-nowrap">
              <span className={"accent" in rest ? "text-bitcoin" : undefined}>{word}</span>
              <InlineIcon src={icon} />
            </span>
          ))}
        </h2>

        <div className="reveal mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-2xl type-lede text-zinc-400">
            <BrandName /> is more than a community. It&apos;s a movement bringing financial sovereignty to Sri
            Lanka through Bitcoin education, meetups across the island and resources in local languages.
          </p>
          <Button asChild variant="secondary" className="self-start md:self-auto">
            <Link href="/community">
              Explore the community <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>

      {/* Full-bleed strip: meetup photos, milestones and the 3D icon set. */}
      <CommunityGallery className="mt-12 md:mt-16" />
    </section>
  );
}
