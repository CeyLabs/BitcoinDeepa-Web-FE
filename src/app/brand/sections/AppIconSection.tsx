import Image from "next/image";
import { IMG } from "../brand-data";
import { BrandTabs } from "../components/BrandTabs";
import { DownloadAsset } from "../components/DownloadAsset";
import { Chapter, Code, Muted, Rule, SubHeading } from "../components/ui";

type IconImage = { src: string; w: number; h: number };

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

/** Home-screen mockups: one column per icon variant, iOS and Android in each. */
const OS_THEMES = [
  {
    key: "light",
    title: "Light",
    note: "Light-mode home screens",
    icon: IMG.iconLight,
    ios: "bg-linear-to-br from-[#5d88b8] to-[#c7865a]",
    android: "bg-linear-to-br from-[#f4efe9] to-[#dde5ee]",
    androidInk: "text-[#1d1e1d]",
    androidBar: "bg-white",
    placeholder: { ios: "bg-[#b9c6d6]", android: "bg-[#ffffff]" },
  },
  {
    key: "dark",
    title: "Dark",
    note: "Dark-mode home screens",
    icon: IMG.iconDark,
    ios: "bg-linear-to-br from-[#2a2b31] to-[#0b0b0c]",
    android: "bg-linear-to-br from-[#23262b] to-[#101112]",
    androidInk: "text-white",
    androidBar: "bg-[#2e3136]",
    placeholder: { ios: "bg-[#3a3b40]", android: "bg-[#35383d]" },
  },
  {
    key: "orange",
    title: "Orange",
    note: "Campaigns and events, any mode",
    icon: IMG.iconOrange,
    ios: "bg-linear-to-br from-[#6a4e8f] to-[#d77a52]",
    android: "bg-linear-to-br from-[#33545e] to-[#b88a5a]",
    androidInk: "text-white",
    androidBar: "bg-white",
    placeholder: { ios: "bg-[#a98aa6]", android: "bg-[#7b8c84]" },
  },
] as const;

const OS_APPS = ["Photos", null, "Maps", "Wallet", "Notes", "Music"];

export function AppIconSection() {
  return (
    <Chapter
      id="app-icon"
      number="03"
      label="App icon"
      title="The app icon"
      lede="The app icon is the ₿ දීප mark: the ₿ symbol, with no coin, beside the Sinhala දීප, in orange on a white tile. It is the one place the brand appears without the Yaka, because at icon sizes the mask's fine lines fill in."
    >
      <div className="grid items-center gap-8 md:grid-cols-[300px_1fr]">
        {/* Home screen preview */}
        <div
          aria-label="Home screen preview"
          role="img"
          className="mx-auto w-full max-w-[320px] rounded-[36px] bg-linear-to-br from-[#3a3330] to-[#1d1e1d] px-5 pb-10 pt-8 shadow-[inset_0_0_0_6px_#111]"
        >
          <div className="grid grid-cols-4 gap-x-3 gap-y-5">
            {HOME_APPS.map((app, i) =>
              app ? (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="block h-[52px] w-[52px] rounded-xl bg-[#4a4441]" />
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
            alt="Large-mark icon artwork"
            ground="charcoal"
            previewClassName="p-10"
            downloads={[{ format: "PNG", path: IMG.iconSmallLight.src }]}
          />
          <Muted className="sm:col-span-2">
            <b className="text-white">Standard</b>: the mark spans about 60% of the tile and stays
            inside Android&apos;s safe zone, leaving room for the masks phones apply.{" "}
            <b className="text-white">Large glyph</b>: tighter margins, about 82% of the tile, for
            favicons, browser tabs and notification badges, where every pixel of glyph counts.
          </Muted>
        </div>
      </div>

      {/* Light / dark / orange */}
      <SubHeading className="mb-4 mt-12">Light, dark and orange</SubHeading>
      <div className="grid gap-4 md:grid-cols-3">
        <ThemeCard
          tone="light"
          big={IMG.iconLight}
          small={IMG.iconSmallLight}
          title="Light"
          body="Orange mark on a white tile. The default icon, and the one for light-mode home screens and light browser tabs."
        />
        <ThemeCard
          tone="dark"
          big={IMG.iconDark}
          small={IMG.iconSmallDark}
          title="Dark"
          body="The same orange mark on a Cold Storage Charcoal (#1D1E1D) tile, for dark-mode home screens (iOS 18 and later supports a separate dark icon) and dark browser tabs."
        />
        <ThemeCard
          tone="light"
          big={IMG.iconOrange}
          small={IMG.iconSmallOrange}
          title="Orange"
          body="A white mark on a Satoshi Orange (#F8931A) tile. Use it for campaigns, event apps, launchers and sticker packs, where the icon should read as Bitcoin orange at a glance."
        />
      </div>

      {/* On iOS and Android */}
      <SubHeading className="mb-2 mt-12">On iOS and Android</SubHeading>
      <Muted className="mb-4 max-w-2xl">
        The same square artwork on both systems: iOS rounds its corners, and Android crops it to the
        launcher&apos;s shape (a circle on Pixel phones). The mark stays clear of both.
      </Muted>
      <BrandTabs
        label="Icon version"
        tabs={OS_THEMES.map((t) => ({
          value: t.key,
          label: t.title,
          content: (
            <div className="rounded-xl bg-zinc-900 p-4 sm:p-6">
              <p className="mb-4 text-sm text-zinc-400">{t.note}</p>
              <div className="grid max-w-2xl grid-cols-2 gap-4">
                <OsScreen
                  os="ios"
                  background={t.ios}
                  ink="text-white"
                  bar="bg-white"
                  placeholder={t.placeholder.ios}
                  icon={t.icon}
                  label={`${t.title} icon on iOS`}
                />
                <OsScreen
                  os="android"
                  background={t.android}
                  ink={t.androidInk}
                  bar={t.androidBar}
                  placeholder={t.placeholder.android}
                  icon={t.icon}
                  label={`${t.title} icon on Android`}
                />
              </div>
            </div>
          ),
        }))}
      />

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
        standard mark sits inside it, so no mask crops it. Supply a square 1024px master with no
        transparency; the phone or store rounds the corners.
      </Muted>

      {/* Rules */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Rule title="Two colours, plain tile">
          An orange <Code>#F8931A</Code> mark on <Code>#FFFFFE</Code> (light) or Cold Storage
          Charcoal <Code>#1D1E1D</Code> (dark), or a white mark on a <Code>#F8931A</Code> tile
          (orange). Never an orange mark on orange, and no gradients.
        </Rule>
        <Rule title="Only ₿ and දීප">
          No coin behind the ₿, no wordmark, no Yaka, no badge or border. The app name appears under
          the icon on its own.
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
              className="h-auto w-8 rounded-md bg-white outline-solid outline-2 outline-offset-2 outline-[#c8102e]"
            />
            <Image
              src={IMG.iconSmallLight.src}
              alt="₿ දීප icon at 32 pixels"
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

function OsScreen({
  os,
  background,
  ink,
  bar,
  placeholder,
  icon,
  label,
}: {
  os: "ios" | "android";
  background: string;
  ink: string;
  bar: string;
  placeholder: string;
  icon: IconImage;
  label: string;
}) {
  const shape = os === "ios" ? "rounded-[22.5%]" : "rounded-full";
  return (
    <figure className="m-0 min-w-0">
      <div className={`overflow-hidden rounded-[18px] px-3.5 pb-3 pt-2.5 ${background} ${ink}`}>
        <div className="mb-3 flex items-center justify-between text-[10px] font-semibold">
          <span>9:41</span>
          <span className="h-[7px] w-[26px] rounded-[3px] bg-current opacity-85" />
        </div>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
          {OS_APPS.map((app, i) => (
            <div key={i} className="flex min-w-0 flex-col items-center gap-1">
              {app ? (
                <span className={`block size-10 sm:size-[46px] ${shape} ${placeholder}`} />
              ) : (
                <Image
                  src={icon.src}
                  alt={label}
                  width={92}
                  height={92}
                  className={`size-10 sm:size-[46px] ${shape}`}
                />
              )}
              <span className={`max-w-full truncate text-[9.5px] ${app ? "" : "font-bold"}`}>
                {app ?? "Bitcoin Deepa"}
              </span>
            </div>
          ))}
        </div>
        {os === "ios" ? (
          <div className="mx-auto mt-3.5 w-16 rounded-full bg-[#1d1e1d] py-0.5 text-center text-[9px] text-white">
            Search
          </div>
        ) : (
          <div className={`mt-3.5 flex h-[22px] items-center rounded-full px-2 ${bar}`}>
            <span className="size-2.5 rounded-full border-2 border-[#8d8d8d]" />
          </div>
        )}
      </div>
      <figcaption className="mt-1.5 text-xs text-zinc-500">
        {os === "ios" ? "iOS · rounded square" : "Android · circle"}
      </figcaption>
    </figure>
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
      className={`grid grid-cols-[auto_1fr] items-center gap-5 rounded-xl p-5 md:grid-cols-1 md:items-start ${
        light ? "bg-[#f2eee9] text-black" : "bg-black text-white ring-1 ring-inset ring-white/10"
      }`}
    >
      <div className="flex items-end gap-2.5">
        <Image
          src={big.src}
          alt={`${title} app icon`}
          width={160}
          height={160}
          className={`h-20 w-20 rounded-[18px] ${light ? "shadow-sm" : "ring-1 ring-[#3a3a3a]"}`}
        />
        <Image
          src={small.src}
          alt={`${title} small icon`}
          width={72}
          height={72}
          className={`h-9 w-9 rounded-lg ${light ? "shadow-sm" : "ring-1 ring-[#3a3a3a]"}`}
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
