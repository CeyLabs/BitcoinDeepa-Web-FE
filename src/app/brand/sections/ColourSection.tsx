import { ColorSwatch, CopyHex } from "../components/ColorSwatch";
import { Chapter, Muted, Rule, SubHeading } from "../components/ui";

const GRADIENT_STOPS = [
  { at: "0%", hex: "#F6921E" },
  { at: "21%", hex: "#F58D1E" },
  { at: "44%", hex: "#F2801F" },
  { at: "67%", hex: "#EE6B21" },
  { at: "91%", hex: "#E94D24" },
  { at: "100%", hex: "#E74126" },
];

const GRADIENT = `linear-gradient(90deg, ${GRADIENT_STOPS.map((s) => `${s.hex} ${s.at}`).join(", ")})`;

export function ColourSection() {
  return (
    <Chapter
      id="colour"
      number="07"
      label="Colour"
      title="Bitcoin orange leads"
      lede="Orange carries the brand. Black and white are the grounds. The flame gradient belongs to the mask, and the four heritage colours belong to the secondary pattern. Copy any value in HEX, RGB or HSL."
    >
      {/* Primary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <ColorSwatch
          size="lg"
          name="Satoshi Orange"
          hex="#F8931A"
          ink="#000000"
          role="Primary"
          description="The orange of the ₿ logo, named for Bitcoin's creator."
          className="sm:col-span-2 lg:col-span-1"
        />
        <ColorSwatch
          size="lg"
          name="Genesis Black"
          hex="#000000"
          ink="#ffffff"
          role="Ground, wordmark"
          description="After the genesis block, where Bitcoin began."
        />
        <ColorSwatch
          size="lg"
          name="Whitepaper White"
          hex="#FFFFFF"
          ink="#000000"
          role="Ground, wordmark"
          description="After the 2008 Bitcoin whitepaper."
        />
      </div>

      {/* Grounds */}
      <SubHeading className="mt-10">Grounds</SubHeading>
      <Muted className="mb-4">
        Cold Storage Charcoal for cards and product, Paper Wallet Cream for decks and documents,
        Genesis Black for print and merchandise.
      </Muted>
      <div className="grid gap-4 sm:grid-cols-3">
        <ColorSwatch
          name="Cold Storage Charcoal"
          hex="#1D1E1D"
          ink="#ffffff"
          description="Cards, product. After the offline wallets that keep bitcoin safe."
        />
        <ColorSwatch
          name="Paper Wallet Cream"
          hex="#FFFCFA"
          ink="#8D183A"
          description="Decks, documents. After keys printed on paper."
        />
        <ColorSwatch
          name="Genesis Black"
          hex="#000000"
          ink="#ffffff"
          description="Print, merchandise. The same black as the primary."
        />
      </div>

      {/* Gradient */}
      <SubHeading className="mt-10">Yaka flame gradient</SubHeading>
      <Muted className="mb-4">
        Linear, bottom-left to top-right, six stops. For the mask and one hero moment at most. Never
        for text.
      </Muted>
      <div
        className="h-24 rounded-xl"
        style={{ background: GRADIENT }}
        role="img"
        aria-label="Gradient from amber to red"
      />
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {GRADIENT_STOPS.map((s) => (
          <div key={s.at}>
            <b className="block text-xs text-white">{s.at}</b>
            <CopyHex hex={s.hex} />
          </div>
        ))}
      </div>

      {/* Heritage */}
      <SubHeading className="mt-10">Heritage colours</SubHeading>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <ColorSwatch
          size="sm"
          name="Perahera Maroon"
          hex="#8D183A"
          ink="#ffffff"
          description="The deep red of the Esala Perahera's festival cloth and the lion flag's field."
        />
        <ColorSwatch
          size="sm"
          name="Sinharaja Green"
          hex="#00544F"
          ink="#ffffff"
          description="The dark canopy of Sinharaja, the island's last great rainforest."
        />
        <ColorSwatch
          size="sm"
          name="Vesak Gold"
          hex="#FFBE2B"
          ink="#000000"
          description="The warm glow of Vesak lanterns and pandals."
        />
        <ColorSwatch
          size="sm"
          name="Thambili Orange"
          hex="#EA7400"
          ink="#000000"
          description="The bright husk of the king coconut, sold at every roadside."
        />
      </div>
      <Muted className="mt-3">
        Heritage colours come from the Sri Lankan flag and colour the secondary pattern. Perahera
        Maroon also works as the headline colour on Paper Wallet Cream (9:1). Keep the other three
        inside the pattern.
      </Muted>

      {/* Contrast rules */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Rule title="Text on orange is black">
          Black on orange reads 9.2:1. White on orange fails, so never use it for text.
          <span className="mt-3 flex flex-wrap gap-2">
            <Pair bg="#F8931A" fg="#000000" text="Buy Bitcoin" ratio="9.2:1" />
          </span>
        </Rule>
        <Rule title="Orange text needs a dark ground">
          Orange on white reads only 2.3:1. On white, set orange text in the darker #9A4C00.
          <span className="mt-3 flex flex-wrap gap-2">
            <Pair bg="#000000" fg="#F8931A" text="On black" ratio="9.2:1" outlined />
            <Pair bg="#ffffff" fg="#9A4C00" text="On white" ratio="6.2:1" />
          </span>
        </Rule>
        <Rule title="Two oranges, never side by side">
          Satoshi Orange and Thambili Orange are close but different. Keep Thambili Orange inside the
          pattern.
        </Rule>
      </div>
    </Chapter>
  );
}

function Pair({
  bg,
  fg,
  text,
  ratio,
  outlined,
}: {
  bg: string;
  fg: string;
  text: string;
  ratio: string;
  outlined?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold ${
        outlined ? "ring-1 ring-inset ring-white/15" : ""
      }`}
      style={{ background: bg, color: fg }}
    >
      {text}
      <i className="text-xs font-semibold not-italic opacity-85">{ratio}</i>
    </span>
  );
}
