import Image from "next/image";
import { IMG } from "../brand-data";
import { DownloadAsset } from "../components/DownloadAsset";
import { Chapter, Code, Muted, Rule, SubHeading } from "../components/ui";

const HOME_APPS = ["Photos", "Maps", "Notes", "Wallet", "Clock", null, "Music", "Mail"];

const SIZES = [
  { px: 1024, use: "Store listing", show: 128, radius: 28, small: false },
  { px: 180, use: "iPhone", show: 90, radius: 20, small: false },
  { px: 192, use: "Android, PWA", show: 64, radius: 14, small: false },
  { px: 48, use: "Small, uses _L", show: 48, radius: 10, small: true },
  { px: 32, use: "Favicon, _L", show: 32, radius: 6, small: true },
  { px: 16, use: "Favicon, _L", show: 16, radius: 3, small: true },
];

const MASKS = [
  { label: "iOS rounded square", radius: "22.5%" },
  { label: "Android circle", radius: "50%" },
  { label: "Android squircle", radius: "32%" },
];

export function AppIconSection() {
  return (
    <Chapter
      id="app-icon"
      number="03"
      label="App icon"
      title="The app icon"
      lede="The app icon is the දීප symbol: the orange Sinhala glyph on a white tile. It is the one place the brand appears without the Yaka, because at icon sizes the mask's fine lines fill in."
    >
      <div className="grid items-center gap-8 md:grid-cols-[300px_1fr]">
        {/* Home screen preview */}
        <div
          aria-label="Home screen preview"
          role="img"
          className="mx-auto w-full max-w-[320px] rounded-[36px] bg-gradient-to-br from-[#3a3330] to-[#1d1e1d] px-5 pb-10 pt-8 shadow-[inset_0_0_0_6px_#111]"
        >
          <div className="grid grid-cols-4 gap-x-3 gap-y-5">
            {HOME_APPS.map((app, i) =>
              app ? (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="block h-[52px] w-[52px] rounded-xl bg-white/15" />
                  <span className="max-w-16 truncate text-[10px] text-white">{app}</span>
                </div>
              ) : (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <Image
                    src={IMG.iconLight.src}
                    alt=""
                    width={104}
                    height={104}
                    className="h-[52px] w-[52px] rounded-xl"
                  />
                  <span className="max-w-16 truncate text-[10px] font-bold text-white">
                    Bitcoin Deepa
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DownloadAsset
            name="Standard icon"
            note="App stores, iOS, Android, PWA"
            image={IMG.iconLight}
            alt="Standard app icon artwork"
            ground="charcoal"
            previewClassName="p-10"
            downloads={[{ format: "PNG", path: IMG.iconLight.src }]}
          />
          <DownloadAsset
            name="Large-glyph icon"
            note="48px and below"
            image={IMG.iconSmallLight}
            alt="Large-glyph icon artwork"
            ground="charcoal"
            previewClassName="p-10"
            downloads={[{ format: "PNG", path: IMG.iconSmallLight.src }]}
          />
          <Muted className="sm:col-span-2">
            <b className="text-white">Standard</b>: the glyph fills about half the tile, leaving
            room for the masks phones apply. <b className="text-white">Large glyph</b>: tighter
            margins, for favicons, browser tabs and notification badges, where every pixel of glyph
            counts.
          </Muted>
        </div>
      </div>

      {/* Light / dark */}
      <SubHeading className="mb-4 mt-12">Light and dark appearance</SubHeading>
      <div className="grid gap-4 md:grid-cols-2">
        <ThemeCard
          tone="light"
          big={IMG.iconLight}
          small={IMG.iconSmallLight}
          title="Light"
          body="Orange glyph on a white tile. The default icon, and the one for light-mode home screens and light browser tabs."
        />
        <ThemeCard
          tone="dark"
          big={IMG.iconDark}
          small={IMG.iconSmallDark}
          title="Dark"
          body="The same orange glyph on a Cold Storage Charcoal (#1D1E1D) tile, for dark-mode home screens (iOS 18 and later supports a separate dark icon) and dark browser tabs."
        />
      </div>

      {/* Sizes */}
      <SubHeading className="mb-4 mt-12">Sizes</SubHeading>
      <div className="flex flex-wrap items-end gap-7 rounded-xl bg-zinc-900 p-7">
        {SIZES.map((s) => (
          <figure key={`${s.px}-${s.use}`} className="m-0 flex flex-col items-center gap-2">
            <Image
              src={s.small ? IMG.iconSmallLight.src : IMG.iconLight.src}
              alt=""
              width={s.show * 2}
              height={s.show * 2}
              style={{ width: s.show, height: s.show, borderRadius: s.radius }}
            />
            <figcaption className="text-center">
              <span className="block font-bold tabular-nums text-white">{s.px}</span>
              <span className="block text-xs text-zinc-500">{s.use}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Masks */}
      <SubHeading className="mb-4 mt-12">Masks and safe zone</SubHeading>
      <div className="flex flex-wrap gap-7">
        {MASKS.map((m) => (
          <figure key={m.label} className="m-0 text-center text-sm text-zinc-500">
            <div
              className="relative mb-2 h-[140px] w-[140px] overflow-hidden shadow-lg shadow-black/40"
              style={{ borderRadius: m.radius }}
            >
              <Image src={IMG.iconLight.src} alt="" width={280} height={280} className="h-full w-full" />
              <span
                className="absolute inset-[17%] rounded-full border-[1.5px] border-dashed border-[#9a4c00]"
                aria-hidden="true"
              />
            </div>
            <figcaption>{m.label}</figcaption>
          </figure>
        ))}
      </div>
      <Muted className="mt-3 max-w-2xl">
        The dashed circle is Android&apos;s adaptive-icon safe zone (the inner 66% of the tile). The
        standard glyph sits inside it, so no mask crops it. Supply a square 1024px master with no
        transparency; the phone or store rounds the corners.
      </Muted>

      {/* Rules */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Rule title="Orange glyph, plain tile">
          The glyph is always <Code>#F8931A</Code>, on <Code>#FFFFFF</Code> (light) or Cold Storage
          Charcoal <Code>#1D1E1D</Code> (dark). No orange tile, no gradient.
        </Rule>
        <Rule title="Nothing else on it">
          No wordmark, no ₿ coin, no Yaka, no badge or border. The app name appears under the icon on
          its own.
        </Rule>
        <Rule title="Why not the Yaka">
          At 32px the mask turns into a smudge. The Yaka stays the brand symbol everywhere there is
          room for it.
          <span className="mt-3 flex items-center gap-3.5">
            <Image
              src={IMG.yaka.src}
              alt="Yaka mask at 32 pixels"
              width={64}
              height={79}
              className="h-auto w-8 rounded-md bg-white outline outline-2 outline-offset-2 outline-[#c8102e]"
            />
            <Image
              src={IMG.iconSmallLight.src}
              alt="Deepa icon at 32 pixels"
              width={64}
              height={64}
              className="h-8 w-8 rounded-md"
            />
          </span>
        </Rule>
      </div>
    </Chapter>
  );
}

function ThemeCard({
  tone,
  big,
  small,
  title,
  body,
}: {
  tone: "light" | "dark";
  big: { src: string };
  small: { src: string };
  title: string;
  body: string;
}) {
  const light = tone === "light";
  return (
    <div
      className={`grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl p-5 ${
        light ? "bg-[#f2eee9] text-black" : "bg-black text-white ring-1 ring-inset ring-white/10"
      }`}
    >
      <div className="flex items-end gap-2.5">
        <Image
          src={big.src}
          alt={`${title} app icon`}
          width={160}
          height={160}
          className={`h-20 w-20 rounded-[18px] ${light ? "shadow" : "ring-1 ring-[#3a3a3a]"}`}
        />
        <Image
          src={small.src}
          alt={`${title} small icon`}
          width={72}
          height={72}
          className={`h-9 w-9 rounded-lg ${light ? "shadow" : "ring-1 ring-[#3a3a3a]"}`}
        />
      </div>
      <div>
        <h4 className="mb-1 text-lg font-bold">{title}</h4>
        <p className={`text-sm leading-relaxed ${light ? "text-[#5e564f]" : "text-[#b8b0a8]"}`}>
          {body}
        </p>
      </div>
    </div>
  );
}
