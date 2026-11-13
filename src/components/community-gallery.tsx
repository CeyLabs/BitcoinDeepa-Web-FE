import Image from "next/image";
import { cn } from "@/src/lib/utils";

// An endless, slowly scrolling two-row strip of community photos and stats.
// Pure CSS (no JS): the set is rendered twice and translated by -50%, pauses
// on hover, and stops for visitors who prefer reduced motion (then it can be
// scrolled by hand).

type GalleryItem =
  | { type: "photo"; src: string; alt: string; caption: string; tall?: boolean }
  | { type: "stat"; value: string; label: string }
  | { type: "icon"; src: string; label: string };

const P = "/images/about";

/** 3D clay icon set (made in Figma), shared by the gallery and the home headline. */
export const ICONS_3D = {
  meetup: "/images/icons-3d/icon-meetup.webp",
  book: "/images/icons-3d/icon-book.webp",
  lightning: "/images/icons-3d/icon-lightning.webp",
  lamp: "/images/icons-3d/icon-lamp.webp",
} as const;

export const COMMUNITY_GALLERY: GalleryItem[] = [
  { type: "photo", src: `${P}/2023-ella-meetup.png`, alt: "Group photo in the hills at the Ella meetup", caption: "Ceylon Bitcoin Meetup, Ella" },
  { type: "icon", src: ICONS_3D.meetup, label: "Meetups across the island" },
  { type: "stat", value: "2022", label: "Our first Ceylon Bitcoin Meetup" },
  { type: "photo", src: `${P}/2023-bolt-cards.png`, alt: "Bitcoin Deepa Bolt Card NFC wallet cards", caption: "Bolt Card tap-to-pay wallets", tall: true },
  { type: "photo", src: `${P}/2022-mike-g-meetup.png`, alt: "Group photo at the meetup with Mike G", caption: "Meetup with Mike G, Colombo" },
  { type: "icon", src: ICONS_3D.lightning, label: "Lightning payments" },
  { type: "photo", src: `${P}/2023-colombo-session.jpeg`, alt: "A talk at a Colombo meetup", caption: "Learning together in Colombo" },
  { type: "stat", value: "4 cities", label: "Colombo, Galle, Kandy and Ella" },
  { type: "photo", src: `${P}/2025-book.png`, alt: "The Sinhala edition of The Bullish Case for Bitcoin", caption: "බිට්කොයින් පෙළහර book launch" },
  { type: "icon", src: ICONS_3D.book, label: "Resources in Sinhala" },
  { type: "photo", src: `${P}/2023-bitcoin-katha-lightning.jpeg`, alt: "Bitcoin Katha podcast cover", caption: "Bitcoin කතා podcast", tall: true },
  { type: "photo", src: `${P}/2022-galle-meetup.png`, alt: "Attendees at the Galle meetup", caption: "Ceylon Bitcoin Meetup, Galle" },
  { type: "stat", value: "0.00908242 BTC", label: "Crowdfunded for COVID relief" },
  { type: "photo", src: `${P}/2025-paid-in-sats.png`, alt: "Illustration: We Get Paid in Sats", caption: "Bitcoin salaries, paid in sats" },
  { type: "icon", src: ICONS_3D.lamp, label: "Deepa: keeping the lamp lit" },
  { type: "photo", src: `${P}/2022-kandy-meetup.png`, alt: "Group photo at the Kandy meetup", caption: "Ceylon Bitcoin Meetup, Kandy" },
  { type: "stat", value: "1 of 18", label: "Projects funded by the HRF Bitcoin Dev Fund" },
  { type: "photo", src: `${P}/2025-tapsigner.png`, alt: "TapSigner cards for a multisig setup", caption: "Multisig payroll with TapSigner" },
  { type: "photo", src: `${P}/2023-ella-session.png`, alt: "An outdoor session in Ella", caption: "Workshop in the hills" },
];

const small = "h-[180px] w-[240px] md:h-[240px] md:w-[320px]";
const tall = "row-span-2 h-[376px] w-[240px] md:h-[496px] md:w-[300px]";

function Tile({ item }: { item: GalleryItem }) {
  if (item.type === "icon") {
    return (
      <div className={cn(small, "relative flex flex-col overflow-hidden rounded-xl bg-black p-5 ring-1 ring-zinc-800 ring-inset")}>
        <Image src={item.src} alt="" width={512} height={512} sizes="200px" className="mx-auto h-[72%] w-auto" />
        <span className="mt-auto text-sm leading-snug text-zinc-300 md:text-base">{item.label}</span>
      </div>
    );
  }
  if (item.type === "stat") {
    return (
      <div className={cn(small, "flex flex-col justify-end rounded-xl bg-zinc-900 p-6")}>
        <span className="text-3xl font-medium tracking-[-0.02em] tabular-nums text-bitcoin md:text-4xl">{item.value}</span>
        <span className="mt-2 text-sm leading-snug text-zinc-400 md:text-base">{item.label}</span>
      </div>
    );
  }
  return (
    <figure className={cn(item.tall ? tall : small, "group/tile relative m-0 overflow-hidden rounded-xl bg-zinc-900")}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes={item.tall ? "300px" : "320px"}
        className="object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 to-transparent p-4 pt-10 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover/tile:opacity-100">
        {item.caption}
      </figcaption>
    </figure>
  );
}

function TileSet({ hidden }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="grid shrink-0 grid-flow-col-dense auto-cols-max grid-rows-2 gap-3 pr-3 md:gap-4 md:pr-4"
    >
      {COMMUNITY_GALLERY.map((item, i) => (
        <Tile key={i} item={item} />
      ))}
    </div>
  );
}

export function CommunityGallery({ className }: { className?: string }) {
  return (
    <div className={cn("group overflow-hidden motion-reduce:overflow-x-auto", className)}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        <TileSet />
        <TileSet hidden />
      </div>
    </div>
  );
}
