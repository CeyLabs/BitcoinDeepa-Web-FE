import Image from "next/image";
import type { CSSProperties } from "react";
import { IMG } from "../brand-data";
import { DownloadAsset } from "../components/DownloadAsset";
import { Caption, Chapter, Tile } from "../components/ui";

export function BackgroundsSection() {
  return (
    <Chapter
      id="backgrounds"
      number="04"
      label="Backgrounds"
      title="Three approved grounds"
      lede="White, black and Bitcoin orange. On orange the logo changes: the mask turns single-colour and දීප turns black, because orange on orange disappears. Use only the two orange-ground files there."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <Tile
            ground="white"
            image={IMG.logoBlack}
            alt="Logo on white"
            className="h-72"
            imgClassName="max-h-[200px]"
          />
          <Caption title="White" note="Black version" />
        </div>
        <div>
          <Tile
            ground="black"
            image={IMG.logoWhite}
            alt="Logo on black"
            className="h-72"
            imgClassName="max-h-[200px]"
          />
          <Caption title="Black" note="White version" />
        </div>
        <div>
          <div className="relative h-72 overflow-hidden rounded-xl bg-[#F8931A]">
            <Image
              src={IMG.orangeBlack.src}
              alt="Logo on orange, black version"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
          <Caption title="Orange" note="Orange-ground versions only" />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <DownloadAsset
          name="On orange, black"
          note="Background included"
          image={IMG.orangeBlack}
          alt="Bitcoin Deepa logo on orange, black version"
          ground="orange"
          fill
          downloads={[{ format: "PNG", path: IMG.orangeBlack.src }]}
        />
        <DownloadAsset
          name="On orange, white"
          note="Background included"
          image={IMG.orangeWhite}
          alt="Bitcoin Deepa logo on orange, white version"
          ground="orange"
          fill
          downloads={[{ format: "PNG", path: IMG.orangeWhite.src }]}
        />
      </div>

      <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
        <b className="text-white">Photos:</b> place the logo only over a calm area where the
        matching version stands out clearly. If the area is busy, put the logo on a solid white or
        black panel first.
      </p>
    </Chapter>
  );
}

const MINIMUMS = [
  {
    value: "120px",
    print: "30mm print",
    title: "Stacked logo",
    body: "Below this, switch to the horizontal wordmark.",
  },
  {
    value: "96px",
    print: "25mm print",
    title: "Horizontal wordmark",
    body: "Below this, use the Yaka symbol on its own.",
  },
  {
    value: "48px",
    print: "15mm print",
    title: "Yaka symbol",
    body: "The smallest size at which the mask's lines stay open. For app icons and favicons, use the දීප symbol.",
  },
];

export function ClearSpaceSection() {
  return (
    <Chapter
      id="clear-space"
      number="05"
      label="Clear space & size"
      title="Give it room"
      lede={
        <>
          Keep clear space on every side equal to the height of the &ldquo;b&rdquo; in
          &ldquo;bitcoin&rdquo;, marked <b className="text-white">x</b> below. Text, edges and other
          logos stay outside it.
        </>
      }
    >
      <div className="grid items-center gap-8 md:grid-cols-2">
        <div className="grid place-items-center rounded-xl bg-white p-10">
          <div
            className="relative p-9 outline-dashed outline-2 -outline-offset-2 outline-[#F8931A]"
            style={{
              background:
                "repeating-linear-gradient(45deg, rgba(248,147,26,.10) 0 6px, transparent 6px 12px)",
            }}
          >
            <span className="absolute left-1/2 top-2 -translate-x-1/2 text-sm font-bold text-[#9a4c00]">
              x
            </span>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#9a4c00]">
              x
            </span>
            <Image
              src={IMG.logoBlack.src}
              alt="Logo with clear space marked"
              width={IMG.logoBlack.w}
              height={IMG.logoBlack.h}
              sizes="180px"
              className="h-auto w-[180px] bg-white"
            />
          </div>
        </div>
        <div className="divide-y divide-zinc-800">
          {MINIMUMS.map((m) => (
            <div key={m.title} className="grid grid-cols-[100px_1fr] items-center gap-4 py-4">
              <div className="text-2xl font-bold tabular-nums text-white">
                {m.value}
                <small className="mt-1 block text-xs font-medium text-zinc-500">{m.print}</small>
              </div>
              <div>
                <h3 className="font-semibold text-white">{m.title}</h3>
                <p className="text-sm text-zinc-400">{m.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chapter>
  );
}

const DONTS: {
  label: string;
  boxClass?: string;
  boxStyle?: CSSProperties;
  imgStyle?: CSSProperties;
  image?: { src: string; w: number; h: number };
  rearrange?: boolean;
}[] = [
  { label: "Stretch or squash it.", imgStyle: { transform: "scaleX(1.45) scaleY(.8)" } },
  { label: "Rotate or re-slant it.", imgStyle: { transform: "rotate(-14deg)" } },
  { label: "Change its colours.", imgStyle: { filter: "hue-rotate(160deg) saturate(1.4)" } },
  { label: "Put the full-colour logo on orange.", boxClass: "bg-[#F8931A]" },
  { label: "Use the black version on dark grounds.", boxClass: "bg-black ring-1 ring-inset ring-white/10" },
  { label: "Add shadows, glows or outlines.", imgStyle: { filter: "drop-shadow(6px 8px 6px rgba(0,0,0,.55))" } },
  {
    label: "Place it on the spiky-tile pattern. (The faint ₿ pattern is fine.)",
    boxStyle: {
      backgroundColor: "#ffffff",
      backgroundImage: `url('${IMG.spikyLight}')`,
      backgroundSize: "90px auto",
      backgroundPosition: "center",
    },
  },
  { label: "Rearrange the mask and wordmark.", rearrange: true },
];

const STRIKE: CSSProperties = {
  background:
    "linear-gradient(to top right, transparent calc(50% - 1.5px), #c8102e calc(50% - 1.5px), #c8102e calc(50% + 1.5px), transparent calc(50% + 1.5px))",
};

export function MisuseSection() {
  return (
    <Chapter
      id="misuse"
      number="06"
      label="Misuse"
      title="Never do this"
      lede="Use the files exactly as supplied. Never retype “bitcoin දීප” in a font: the දීප is custom lettering."
    >
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {DONTS.map((d) => (
          <figure key={d.label} className="m-0 min-w-0">
            <div
              className={`relative grid aspect-square place-items-center overflow-hidden rounded-xl ${
                d.boxClass ?? "bg-white"
              }`}
              style={d.boxStyle}
            >
              {d.rearrange ? (
                <>
                  <Image
                    src={IMG.wordBnO.src}
                    alt=""
                    width={IMG.wordBnO.w}
                    height={IMG.wordBnO.h}
                    sizes="160px"
                    className="h-auto w-[70%] translate-y-6"
                  />
                  <Image
                    src={IMG.yaka.src}
                    alt=""
                    width={IMG.yaka.w}
                    height={IMG.yaka.h}
                    sizes="60px"
                    className="absolute left-[14%] top-[18%] h-auto w-[22%]"
                  />
                </>
              ) : (
                <Image
                  src={IMG.logoBlack.src}
                  alt=""
                  width={IMG.logoBlack.w}
                  height={IMG.logoBlack.h}
                  sizes="120px"
                  className="h-auto w-[45%]"
                  style={d.imgStyle}
                />
              )}
              <span className="absolute inset-0" style={STRIKE} aria-hidden="true" />
            </div>
            <figcaption className="mt-2.5 text-sm text-zinc-300">{d.label}</figcaption>
          </figure>
        ))}
      </div>
    </Chapter>
  );
}
