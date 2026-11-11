import Image from "next/image";
import type { ReactNode } from "react";
import { IMG } from "../brand-data";
import { DownloadAsset } from "../components/DownloadAsset";
import { Bullets, Chapter, FONT_BODY, Muted, SubHeading, Tile } from "../components/ui";

export function LogoSection() {
  return (
    <Chapter
      id="logo"
      number="02"
      label="Logo"
      title="The primary logo"
      lede="The stacked lockup, mask above wordmark, comes in two versions. Pick by the ground: black wordmark on light, white wordmark on dark. Use it everywhere it fits at 120px wide or more."
    >
      {/* Primary logo */}
      <div className="grid gap-4 sm:grid-cols-2">
        <DownloadAsset
          name="Black version"
          note="White and light grounds"
          image={IMG.logoBlack}
          alt="Bitcoin Deepa primary logo, black version"
          ground="white"
          downloads={[
            { format: "SVG", path: IMG.logoBlackSvg },
            { format: "PNG", path: IMG.logoBlack.src },
          ]}
        />
        <DownloadAsset
          name="White version"
          note="Black and dark grounds"
          image={IMG.logoWhite}
          alt="Bitcoin Deepa primary logo, white version"
          ground="black"
          downloads={[
            { format: "SVG", path: IMG.logoWhiteSvg },
            { format: "PNG", path: IMG.logoWhite.src },
          ]}
        />
      </div>

      {/* Yaka symbol */}
      <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <DownloadAsset
          name="Yaka symbol"
          note="Gradient, on white or black"
          image={IMG.yaka}
          alt="The Yaka mask, Bitcoin Deepa's symbol"
          ground="black"
          previewClassName="aspect-square"
          downloads={[
            { format: "SVG", path: IMG.yakaSvg },
            { format: "PNG", path: IMG.yaka.src },
          ]}
        />
        <div>
          <SubHeading className="text-2xl">The Yaka is the symbol</SubHeading>
          <Muted className="mb-4 text-base">
            The mask stands for the brand on its own: social avatars, merchandise, watermarks, large
            crops on posters and packaging. Use the gradient version on white or black, and the
            single-colour versions for one-colour print, engraving and embossing.
          </Muted>
          <div className="grid grid-cols-2 gap-3">
            <Tile
              ground="white"
              image={IMG.yakaBlack}
              alt="Yaka mask, black"
              className="h-36 p-5"
              sizes="160px"
            />
            <Tile
              ground="black"
              image={IMG.yakaWhite}
              alt="Yaka mask, white"
              className="h-36 p-5"
              sizes="160px"
            />
          </div>
          <Muted className="mt-4 text-base">
            Two more ways the brand uses the mask: <b className="text-white">cropped off the edge</b>{" "}
            of a layout, half in frame, and as a <b className="text-white">faint watermark</b> behind
            content.
          </Muted>
        </div>
      </div>

      {/* Bold Yaka */}
      <div className="mt-14 grid items-center gap-4 md:grid-cols-[1fr_1fr_1.4fr]">
        {[
          { img: IMG.yaka, label: "Original" },
          { img: IMG.yakaBold, label: "Bold" },
        ].map(({ img, label }) => (
          <figure
            key={label}
            className="flex flex-col items-center gap-2 rounded-xl bg-white px-5 pb-3 pt-6"
          >
            <Image
              src={img.src}
              alt={`Yaka, ${label.toLowerCase()} stroke`}
              width={img.w}
              height={img.h}
              sizes="200px"
              className="h-auto w-full max-w-[180px]"
            />
            <figcaption className="text-xs font-bold text-zinc-500">{label}</figcaption>
          </figure>
        ))}
        <div className="md:pl-4">
          <SubHeading className="text-2xl">Bold Yaka</SubHeading>
          <Muted className="mb-3 text-base">
            The same mask with every line drawn heavier, so the detail in the crown and the hood rays
            holds up when the symbol is small or reproduced roughly.
          </Muted>
          <Bullets
            items={[
              "Use it below about 200px on screen, and for embroidery, engraving, stamps, signage seen from a distance and small print.",
              "Use the original line weight everywhere else; it is the primary symbol.",
              "Same colours and gradient as the original; never mix the two weights in one layout.",
            ]}
          />
        </div>
      </div>

      {/* Half Yaka */}
      <div className="mt-14 grid items-stretch gap-6 md:grid-cols-[1fr_1.25fr]">
        <div className="self-center">
          <SubHeading className="text-2xl">Half Yaka</SubHeading>
          <Muted className="mb-3 text-base">
            The mask cut down its centre line and set full height, so it fills a tall panel and
            bleeds off one edge: covers, banners, pull-ups and slide backgrounds. Use the gradient
            version on white or black; the cut side always sits flush on the panel edge.
          </Muted>
          <Bullets
            items={[
              <>
                <b className="text-white">Left-aligned:</b> the right half of the mask, sitting on
                the left edge of a layout.
              </>,
              <>
                <b className="text-white">Right-aligned:</b> the left half of the mask, sitting on
                the right edge, as on the LinkedIn covers.
              </>,
              "Keep the cut exactly on the layout edge; never show the straight cut line inside the frame.",
            ]}
          />
        </div>
        <div className="grid min-h-[380px] grid-cols-2 overflow-hidden rounded-xl ring-1 ring-inset ring-white/10">
          <div className="relative bg-white">
            <Image
              src={IMG.yakaHalfLeft.src}
              alt="Half Yaka, left-aligned, on white"
              width={IMG.yakaHalfLeft.w}
              height={IMG.yakaHalfLeft.h}
              sizes="240px"
              className="absolute left-0 top-[3%] h-[94%] w-auto max-w-[92%] object-contain object-left"
            />
            <span className="absolute bottom-3 right-3 rounded-full bg-black px-2.5 py-1 text-[11px] font-bold text-white">
              Left-aligned
            </span>
          </div>
          <div className="relative bg-black">
            <Image
              src={IMG.yakaHalfRight.src}
              alt="Half Yaka, right-aligned, on black"
              width={IMG.yakaHalfRight.w}
              height={IMG.yakaHalfRight.h}
              sizes="240px"
              className="absolute right-0 top-[3%] h-[94%] w-auto max-w-[92%] object-contain object-right"
            />
            <span className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-black">
              Right-aligned
            </span>
          </div>
        </div>
      </div>

      {/* Laser-eyed Yaka */}
      <div className="mt-14 grid items-center gap-8 md:grid-cols-2">
        <DownloadAsset
          name="Laser-eyed Yaka"
          note="Dark grounds only"
          image={IMG.yakaLaser}
          alt="Yaka mask with glowing laser eyes"
          ground="black"
          previewClassName="aspect-square"
          downloads={[
            { format: "SVG", path: IMG.yakaLaserSvg },
            { format: "PNG", path: IMG.yakaLaser.src },
          ]}
        />
        <div>
          <SubHeading className="text-2xl">Laser-eyed Yaka</SubHeading>
          <Muted className="mb-3 text-base">
            The Yaka with the brand&apos;s red laser flare on both eyes, used exactly as drawn: a
            white-hot core, long thin cross rays and a soft red halo. The flare sits low in each eye,
            in the lower part of the inner oval, not at its centre. It nods to the &ldquo;laser
            eyes&rdquo; of Bitcoin culture and gives the mask a living presence on dark layouts such
            as covers, banners and event screens.
          </Muted>
          <Bullets
            items={[
              "Dark grounds only (Genesis Black or Cold Storage Charcoal). On white the red glow loses its light.",
              "Use the artwork as supplied; keep the lasers red or light only one eye on a full mask. Edge crops that show a single eye are fine.",
              "One laser-eyed Yaka per layout. It is a hero moment, not a pattern.",
            ]}
          />
        </div>
      </div>

      {/* Logo family */}
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Family
          title="With slogan"
          body={
            <>
              Heroes, posters, packaging and campaign openers, where there is room to read{" "}
              <i>Pearl of Satoshi</i>.
            </>
          }
          left={{ image: IMG.sloganBlack, alt: "Logo with slogan, black" }}
          right={{ image: IMG.sloganWhite, alt: "Logo with slogan, white" }}
          downloads={[
            { label: "Black SVG", path: IMG.sloganBlackSvg },
            { label: "White SVG", path: IMG.sloganWhiteSvg },
          ]}
        />
        <Family
          title="App icon and orange version"
          body="The දීප symbol is the app icon; see the App icon section. The orange-ground files are covered under Backgrounds."
          left={{ image: IMG.iconLight, alt: "Deepa app icon", imgClassName: "max-h-[110px] rounded-[22px] shadow" }}
          right={{ image: IMG.orangeWhite, alt: "Logo on orange, white version", imgClassName: "max-h-[130px] rounded-lg" }}
        />
        <Family
          wide
          title="Horizontal wordmark"
          body="Navigation bars, email footers, and anywhere the stacked logo would be under 120px wide."
          left={{ image: IMG.wordBnO, alt: "Horizontal wordmark, black and orange" }}
          right={{ image: IMG.wordWnO, alt: "Horizontal wordmark, white and orange" }}
          downloads={[
            { label: "Black SVG", path: IMG.wordBnOSvg },
            { label: "White SVG", path: IMG.wordWnOSvg },
          ]}
        />
        <Family
          wide
          title="Wordmark with ₿ coin"
          body="Ads, app-store listings and partner pages, for people who don't yet link the name with Bitcoin."
          left={{ image: IMG.btcBlack, alt: "Wordmark with Bitcoin coin, black" }}
          right={{ image: IMG.btcWhite, alt: "Wordmark with Bitcoin coin, white" }}
          downloads={[
            { label: "Black PNG", path: IMG.btcBlack.src },
            { label: "White PNG", path: IMG.btcWhite.src },
          ]}
        />
      </div>

      {/* Powered by */}
      <div className="mt-10 grid items-center gap-6 sm:grid-cols-[260px_1fr]">
        <div className="flex flex-col items-center rounded-xl bg-[#1D1E1D] p-7">
          <span className="mb-0.5 mr-8 self-end text-xs text-white" style={FONT_BODY}>
            Powered By
          </span>
          <Image
            src={IMG.wordWnO.src}
            alt="Powered by Bitcoin Deepa lockup"
            width={IMG.wordWnO.w}
            height={IMG.wordWnO.h}
            sizes="160px"
            className="h-auto w-40"
          />
        </div>
        <div>
          <SubHeading>&ldquo;Powered by&rdquo; lockup</SubHeading>
          <Muted>
            For products and campaigns that Bitcoin Deepa backs, such as the Lightning card and the
            book launch: &ldquo;Powered By&rdquo; in Nunito Sans, small and right-aligned above the
            horizontal wordmark. Keep the sponsored product&apos;s name as the hero and the lockup at
            the foot.
          </Muted>
        </div>
      </div>
    </Chapter>
  );
}

interface FamilySide {
  image: { src: string; w: number; h: number };
  alt: string;
  imgClassName?: string;
}

function Family({
  title,
  body,
  left,
  right,
  wide = false,
  downloads,
}: {
  title: string;
  body: ReactNode;
  left: FamilySide;
  right: FamilySide;
  wide?: boolean;
  downloads?: { label: string; path: string }[];
}) {
  const box = wide ? "min-h-[120px] p-5" : "min-h-[190px] p-6";
  const img = wide ? "max-h-[54px]" : "max-h-[140px]";
  return (
    <div className="min-w-0">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl ring-1 ring-inset ring-white/10">
        {[
          { side: left, bg: "bg-white" },
          { side: right, bg: "bg-black" },
        ].map(({ side, bg }) => (
          <div key={side.alt} className={`flex items-center justify-center ${bg} ${box}`}>
            <Image
              src={side.image.src}
              alt={side.alt}
              width={side.image.w}
              height={side.image.h}
              sizes="240px"
              className={`h-auto w-auto max-w-full ${side.imgClassName ?? img}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-2">
        <h3 className="font-semibold text-white">{title}</h3>
        {downloads && (
          <div className="flex gap-3 text-xs">
            {downloads.map((d) => (
              <a
                key={d.path}
                href={d.path}
                download
                className="text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-[#F8931A]"
              >
                {d.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <Muted className="mt-1">{body}</Muted>
    </div>
  );
}
