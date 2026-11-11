import type { CSSProperties } from "react";
import { BTC_PATTERN_STYLE, IMG, KIT } from "../brand-data";
import { DownloadAllButton, DownloadPngButton, DownloadSvgButton } from "../components/DownloadKit";
import { Chapter, Muted, SubHeading } from "../components/ui";

export function PatternsSection() {
  return (
    <Chapter
      id="patterns"
      number="09"
      label="Patterns"
      title="Primary pattern: ₿"
      lede="A staggered field of ₿ marks in Bitcoin orange at about 10% strength. It is the brand's everyday background texture. It repeats on an even grid: ₿ marks every 86 units across and 44 down, each row shifted half a step, so the tile edges never show."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <PatternPanel style={{ ...BTC_PATTERN_STYLE, backgroundColor: "#000000" }} label="On Black" dark />
        <PatternPanel
          style={{ ...BTC_PATTERN_STYLE, backgroundColor: "#FFFCFA" }}
          label="On Warm White"
          labelClass="bg-white text-[#8D183A]"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <Muted className="max-w-3xl">
          Keep it quiet so the logo and type sit on top without competing. The one exception is the
          notebook, where the ₿ marks run at full orange on black as a printed band that fades up the
          cover.
        </Muted>
        <DownloadLinks links={[{ label: "Tile PNG", path: IMG.btcPatternTile }]} />
      </div>

      <h3 className="mb-4 mt-14 text-2xl font-bold text-white md:text-3xl">
        Secondary pattern: spiky tiles
      </h3>
      <p className="mb-6 max-w-3xl text-lg leading-relaxed text-zinc-300">
        The CeylonCash heritage pattern, redrawn for Bitcoin Deepa. Same sequence and the same four
        Lanka colours, but every tile has straight sides and corners that flare out into sharp
        spikes, echoing the points of the Yaka&apos;s crown.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <PatternPanel
          tall
          style={{
            backgroundColor: "#ffffff",
            backgroundImage: `url('${IMG.spikyLight}')`,
            backgroundSize: "220px auto",
          }}
          label="On white"
          labelClass="bg-white text-black shadow"
        />
        <PatternPanel
          tall
          style={{
            backgroundColor: "#1D1E1D",
            backgroundImage: `url('${IMG.spikyCharcoal}')`,
            backgroundSize: "220px auto",
          }}
          label="On Cold Storage Charcoal"
          dark
        />
      </div>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <Muted className="max-w-3xl">
          Tall bars in Perahera Maroon, squares in Sinharaja Green, small tiles alternating Thambili
          Orange and Vesak Gold; every other band is shifted half a step. All tiles use the same spike
          size, so each shape is symmetrical, and the tile repeats without seams. Use it where the
          brand needs colour and energy: bands, borders, packaging, merchandise and event décor. Keep
          logos and text off it, or set them on a solid panel.
        </Muted>
        <DownloadLinks
          links={[
            { label: "Light SVG", path: `${KIT}/08-Patterns/Secondary_SpikyTiles_Light.svg` },
            { label: "Charcoal SVG", path: `${KIT}/08-Patterns/Secondary_SpikyTiles_Charcoal.svg` },
          ]}
        />
      </div>
    </Chapter>
  );
}

function PatternPanel({
  style,
  label,
  labelClass,
  dark,
  tall,
}: {
  style: CSSProperties;
  label: string;
  labelClass?: string;
  dark?: boolean;
  tall?: boolean;
}) {
  return (
    <div
      className={`flex items-end rounded-2xl p-4 ring-1 ring-inset ring-white/10 ${
        tall ? "min-h-[300px]" : "min-h-[220px]"
      }`}
      style={{ backgroundRepeat: "repeat", ...style }}
    >
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-bold ${
          labelClass ?? (dark ? "bg-black/60 text-white" : "bg-white text-black")
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function DownloadLinks({ links }: { links: { label: string; path: string }[] }) {
  return (
    <div className="flex shrink-0 gap-3 text-xs">
      {links.map((l) => (
        <a
          key={l.path}
          href={l.path}
          download
          className="text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-[#F8931A]"
        >
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function VoiceSection() {
  return (
    <Chapter id="voice" number="10" label="Voice" title="How we sound">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Plain",
            body: "Explain Bitcoin in everyday words. Introduce a technical term only with a short explanation.",
          },
          {
            title: "Bilingual",
            body: "Sinhala and English stand side by side as equals. When space allows, give both.",
          },
          {
            title: "Proud of the island",
            body: "The mask, the flag colours and the slogan already say this is Sri Lankan Bitcoin. The copy can say it too, without clichés.",
          },
        ].map((v) => (
          <div key={v.title}>
            <SubHeading>{v.title}</SubHeading>
            <Muted>{v.body}</Muted>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#F8931A]/20 bg-[#F8931A]/[0.06] p-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#F8931A]">Write</p>
          <ul className="space-y-2 text-zinc-200">
            <li>Send Bitcoin to family in minutes.</li>
            <li>Learn what a satoshi is, in Sinhala.</li>
            <li>Bitcoin Deepa · Pearl of Satoshi</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-800 p-6">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-widest text-zinc-500">Avoid</p>
          <ul className="space-y-2 text-zinc-500 line-through decoration-zinc-700">
            <li>Get rich with crypto!!!</li>
            <li>Leverage our decentralised Web3 ecosystem.</li>
            <li>BITCOIN DEEPA, BitcoinDeepa, bitcoin deepa</li>
          </ul>
        </div>
      </div>
    </Chapter>
  );
}

const ASSET_ROWS = [
  ["Primary logo", "Default for everything"],
  ["Logo with slogan", "Heroes, posters"],
  ["Horizontal wordmark", "Nav bars, footers"],
  ["Wordmark with ₿", "Ads, listings"],
  ["On orange", "Orange grounds only (background included)"],
  ["Yaka symbol", "The brand symbol: avatars, merchandise, watermarks"],
  ["Bold Yaka", "Small sizes, embroidery, engraving"],
  ["Half Yaka", "Edge crops on covers and banners"],
  ["Laser-eyed Yaka", "Hero moments on dark layouts"],
  ["App icon (දීප symbol)", "App icons and favicons"],
  ["Slogan", "Slogan on its own"],
  ["Primary pattern (₿)", "Everyday background texture"],
  ["Secondary pattern (spiky tiles)", "Bands, borders, packaging, décor"],
];

export function AssetsSection() {
  return (
    <Chapter
      id="assets"
      number="11"
      label="Assets"
      title="Assets"
      lede="Download the full kit below. Use SVG wherever it is accepted; PNGs are transparent unless noted."
    >
      <div className="mb-8 grid items-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 md:grid-cols-[1fr_auto]">
        <div>
          <SubHeading>Download the asset kit</SubHeading>
          <Muted>
            Every logo, symbol, app icon, slogan and pattern on this page, organised in numbered
            folders. Vector files are SVG; every asset also comes as a transparent PNG at 2400px (app
            icons at 1024px).
          </Muted>
        </div>
        <div className="flex flex-col gap-2.5">
          <DownloadAllButton className="justify-center" />
          <DownloadSvgButton />
          <DownloadPngButton />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wider text-zinc-500">
              <th className="py-2.5 pr-4 font-semibold">Asset</th>
              <th className="py-2.5 font-semibold">Use</th>
            </tr>
          </thead>
          <tbody>
            {ASSET_ROWS.map(([asset, use]) => (
              <tr key={asset} className="border-b border-zinc-800/70 align-top">
                <td className="py-2.5 pr-4 font-semibold text-white">{asset}</td>
                <td className="py-2.5 text-zinc-400">{use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Chapter>
  );
}
