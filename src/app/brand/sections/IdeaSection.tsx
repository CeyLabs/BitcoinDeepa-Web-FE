import { Chapter, FONT_DISPLAY, FONT_SI } from "../components/ui";

const PARTS = [
  {
    word: "bitcoin",
    style: FONT_DISPLAY,
    className: "text-white",
    body: "Set in lowercase, bold and slanted forward. It names the product plainly, in the world's language for it.",
  },
  {
    word: "දීප",
    style: FONT_SI,
    className: "text-[#F8931A]",
    body: (
      <>
        <i>Deepa</i>, &ldquo;island&rdquo;. Custom Sinhala lettering in Bitcoin orange. It puts Sri
        Lanka inside the name.
      </>
    ),
  },
  {
    word: "Pearl of Satoshi",
    style: FONT_DISPLAY,
    className: "text-white",
    body: "The slogan. Sri Lanka has long been called the Pearl of the Indian Ocean; here the pearl belongs to Bitcoin's creator.",
  },
];

export function IdeaSection() {
  return (
    <Chapter
      id="idea"
      number="01"
      label="The idea"
      title="Bitcoin, from the island"
      lede="The identity joins three things: the global currency, the Sinhala language, and a guardian from Sri Lankan mask craft. Every part of the logo carries one of them."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {PARTS.map((part) => (
          <div
            key={part.word}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div
              className={`mb-3 text-3xl font-bold leading-tight ${part.className}`}
              style={part.style}
            >
              {part.word}
            </div>
            <p className="text-sm leading-relaxed text-zinc-400">{part.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 max-w-3xl leading-relaxed text-zinc-400">
        The <b className="text-white">Yaka mask</b> is the brand&apos;s symbol. It is drawn as fine
        line art in a flame gradient, from amber at the base to red at the tips. It gives Bitcoin
        Deepa a face that no other Bitcoin company has, and wherever the brand needs a mark without
        words, the Yaka is that mark.
      </p>
    </Chapter>
  );
}
