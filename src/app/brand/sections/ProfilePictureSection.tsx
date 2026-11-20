import Image from "next/image";
import { Download } from "lucide-react";
import { IMG } from "../brand-data";
import { Chapter, Rule, SubHeading } from "../components/ui";

const btn =
  "flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white";

const VERSIONS = [
  {
    key: "black",
    title: "Black",
    image: IMG.dpBlack,
    svg: IMG.dpBlackSvg,
    alt: "Profile picture: orange ₿ and දීප on black",
    body: "Orange ₿ and දීප on Genesis Black. The default for the brand's social accounts.",
  },
  {
    key: "white",
    title: "White",
    image: IMG.dpWhite,
    svg: IMG.dpWhiteSvg,
    alt: "Profile picture: orange ₿ and දීප on white",
    body: "Orange ₿ and දීප on Whitepaper White. For platforms with dark interfaces, where black disappears.",
  },
  {
    key: "orange",
    title: "Orange",
    image: IMG.dpOrange,
    svg: IMG.dpOrangeSvg,
    alt: "Profile picture: white ₿ and දීප on orange",
    body: "White ₿ and දීප on Satoshi Orange. For campaigns and events.",
  },
] as const;

export function ProfilePictureSection() {
  return (
    <Chapter
      id="profile-picture"
      number="04"
      label="Profile picture"
      title="Profile picture"
      lede="For social profiles, the ₿ symbol and දීප on a solid square, with no coin behind the ₿. Three versions: on black, on white and on Satoshi Orange."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {VERSIONS.map((v) => (
          <figure
            key={v.key}
            className="m-0 grid grid-cols-[112px_minmax(0,1fr)] items-start gap-4 sm:flex sm:flex-col sm:items-center sm:text-center"
          >
            <Image
              src={v.image.src}
              alt={v.alt}
              width={440}
              height={440}
              sizes="(min-width: 640px) 220px, 112px"
              className="aspect-square w-full max-w-[220px] rounded-full ring-1 ring-white/10"
            />
            <figcaption className="flex min-w-0 flex-col sm:items-center">
              <b className="block font-display text-base font-bold text-white">{v.title}</b>
              <span className="mt-1 block max-w-[30ch] text-sm text-zinc-400">{v.body}</span>
              <span className="mt-3 flex flex-wrap gap-1.5">
                <a
                  href={v.image.src}
                  download={`Bitcoin-Deepa-DP-${v.title}.png`}
                  className={btn}
                  aria-label={`Download the ${v.key} profile picture, PNG, 1080 pixels`}
                >
                  <Download className="h-3 w-3" />
                  PNG <span className="text-zinc-500">1080px</span>
                </a>
                <a
                  href={v.svg}
                  download={`Bitcoin-Deepa-DP-${v.title}.svg`}
                  className={btn}
                  aria-label={`Download the ${v.key} profile picture, SVG`}
                >
                  <Download className="h-3 w-3" />
                  SVG
                </a>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <SubHeading className="mb-4 mt-12">In the feed</SubHeading>
      <div className="grid gap-4 rounded-xl bg-zinc-900 p-5 sm:grid-cols-3">
        {VERSIONS.map((v) => (
          <div key={v.key} className="flex min-w-0 items-center gap-2.5">
            <Image
              src={v.image.src}
              alt=""
              width={80}
              height={80}
              className="size-10 shrink-0 rounded-full ring-1 ring-white/10"
            />
            <div className="min-w-0">
              <b className="block text-sm text-white">Bitcoin Deepa</b>
              <span className="block truncate text-xs text-zinc-500">@bitcoindeepa · 2h</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Rule title="Centred, inside the circle">
          The mark is about 62% of the square&apos;s width, centred across and sitting a little below
          the middle, so the circle crop most platforms apply never touches it. Upload the 1080px
          square as it is.
        </Rule>
        <Rule title="Only these three grounds">
          Black or white take the orange mark; orange takes the white mark only, because orange
          vanishes on orange. No photos, patterns or other colours behind it.
        </Rule>
        <Rule title="One version per platform">
          Keep a profile on the same version so people recognise it. The orange one is for limited
          periods, then switch back.
        </Rule>
      </div>
    </Chapter>
  );
}
