import type { CSSProperties } from "react";
import { Chapter, FONT_BODY, FONT_DISPLAY, FONT_SI, Muted } from "../components/ui";

const FACES: {
  sample: string;
  sampleStyle: CSSProperties;
  name: string;
  body: string;
  weights: string;
  href: string;
}[] = [
  {
    sample: "Aa₿",
    sampleStyle: { ...FONT_DISPLAY, fontWeight: 700, fontStyle: "italic" },
    name: "Ubuntu",
    body: "Headlines. Bold for titles; bold italic for hero lines only, echoing the slant of the wordmark.",
    weights: "Medium 500 · Bold 700 · Bold Italic",
    href: "https://fonts.google.com/specimen/Ubuntu",
  },
  {
    sample: "Aa",
    sampleStyle: { ...FONT_BODY, fontWeight: 300, fontStyle: "italic", fontStretch: "80%" },
    name: "Nunito Sans",
    body: "Body text, forms, captions. The slogan artwork uses its condensed italic.",
    weights: "Light 300 · Regular 400 · SemiBold 600 · Bold 700",
    href: "https://fonts.google.com/specimen/Nunito+Sans",
  },
  {
    sample: "අආ",
    sampleStyle: { ...FONT_SI, fontWeight: 700 },
    name: "Noto Sans Sinhala",
    body: "All Sinhala text. Give it more line height than Latin so vowel signs have room.",
    weights: "Regular 400 · Bold 700",
    href: "https://fonts.google.com/noto/specimen/Noto+Sans+Sinhala",
  },
];

const SCALE: { key: string; spec: string; text: string; style: CSSProperties }[] = [
  {
    key: "Display",
    spec: "64 / 68 Ubuntu Bold Italic",
    text: "Bitcoin for Sri Lanka",
    style: { ...FONT_DISPLAY, fontStyle: "italic", fontWeight: 700, fontSize: "clamp(36px,6vw,64px)", lineHeight: 1.06 },
  },
  {
    key: "H1",
    spec: "40 / 46 Ubuntu Bold",
    text: "Pearl of Satoshi",
    style: { ...FONT_DISPLAY, fontWeight: 700, fontSize: "clamp(28px,4.5vw,40px)", lineHeight: 1.15 },
  },
  {
    key: "H2",
    spec: "28 / 34 Ubuntu Bold",
    text: "Buy, hold and learn",
    style: { ...FONT_DISPLAY, fontWeight: 700, fontSize: 28, lineHeight: 1.2 },
  },
  {
    key: "Body",
    spec: "16 / 24 Nunito Sans",
    text: "Bitcoin Deepa helps people in Sri Lanka understand and use Bitcoin, in Sinhala and English.",
    style: { ...FONT_BODY, fontWeight: 400, fontSize: 16, lineHeight: 1.5, maxWidth: "56ch" },
  },
  {
    key: "Caption",
    spec: "13 / 18 SemiBold, +4%",
    text: "SATS · LKR · BTC",
    style: { ...FONT_BODY, fontWeight: 600, fontSize: 13, lineHeight: 1.4, letterSpacing: ".04em" },
  },
  {
    key: "Sinhala",
    spec: "16 / 28 Noto Sans Sinhala",
    text: "ශ්‍රී ලංකාව සඳහා බිට්කොයින්",
    style: { ...FONT_SI, fontSize: 16, lineHeight: 1.75 },
  },
];

export function TypographySection() {
  return (
    <Chapter
      id="typography"
      number="08"
      label="Typography"
      title="Three typefaces, two scripts"
      lede="Ubuntu for headlines, Nunito Sans for text, Noto Sans Sinhala for Sinhala. All three are free on Google Fonts. Ubuntu and Nunito Sans both appear in the master logo file."
    >
      <div className="grid gap-4">
        {FACES.map((face) => (
          <div
            key={face.name}
            className="grid items-center gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 md:grid-cols-[1.3fr_1fr]"
          >
            <div
              className="text-[clamp(56px,9vw,104px)] leading-[0.95] text-white [overflow-wrap:anywhere]"
              style={face.sampleStyle}
              aria-hidden="true"
            >
              {face.sample}
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-white">{face.name}</h3>
              <Muted>{face.body}</Muted>
              <p className="mt-2.5 text-sm font-semibold text-zinc-200">{face.weights}</p>
              <a
                href={face.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs text-zinc-400 underline decoration-zinc-700 underline-offset-4 hover:text-[#F8931A]"
              >
                Get it on Google Fonts
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-zinc-800">
        {SCALE.map((row) => (
          <div
            key={row.key}
            className="grid items-baseline gap-1 border-b border-zinc-800 py-4 sm:grid-cols-[140px_1fr] sm:gap-4"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              {row.key}
              <span className="block font-normal normal-case tracking-normal tabular-nums">
                {row.spec}
              </span>
            </div>
            <div className="min-w-0 text-white [overflow-wrap:anywhere]" style={row.style}>
              {row.text}
            </div>
          </div>
        ))}
      </div>

      <Muted className="mt-4 max-w-3xl">
        Campaign headlines may be set all lowercase in the display style, with &ldquo;bitcoin&rdquo;
        picked out in orange, as on the card backdrop: <i>the first ever bitcoin card in sri lanka</i>
        . In running text, write the name as <b className="text-white">Bitcoin Deepa</b>. The
        lowercase &ldquo;bitcoin දීප&rdquo; is how the logo is drawn, not how the name is typed.
      </Muted>
    </Chapter>
  );
}
