import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

// Brand fonts are loaded site-wide in the root layout.
export const FONT_DISPLAY: CSSProperties = {
  fontFamily: "var(--font-ubuntu), var(--font-noto-sinhala), system-ui, sans-serif",
};
export const FONT_BODY: CSSProperties = {
  fontFamily: "var(--font-nunito-sans), var(--font-noto-sinhala), system-ui, sans-serif",
};
export const FONT_SI: CSSProperties = {
  fontFamily: "var(--font-noto-sinhala), var(--font-nunito-sans), system-ui, sans-serif",
};

export function Chapter({
  id,
  number,
  label,
  title,
  lede,
  children,
}: {
  id: string;
  number: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
}) {
  return (
    // Chapter number and label as an eyebrow over the heading, the same
    // pattern the About page uses for its section labels.
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-32">
      <p className="mb-4 type-eyebrow text-bitcoin">
        <span className="tabular-nums">{number}</span>
        <span className="mx-2 text-zinc-600" aria-hidden="true">
          ·
        </span>
        {label}
      </p>
      <h2 id={`${id}-title`} className="type-h2 text-white">
        {title}
      </h2>
      {lede && <p className="mt-5 mb-10 max-w-2xl type-lede text-zinc-400">{lede}</p>}
      {!lede && <div className="mb-10" />}
      {children}
    </section>
  );
}

export function SubHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn("mb-2 text-xl font-bold text-white", className)}>{children}</h3>;
}

export function Muted({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-sm leading-relaxed text-zinc-400", className)}>{children}</p>;
}

export function Bullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={cn("space-y-2 text-sm leading-relaxed text-zinc-400", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#F8931A]" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

const GROUND_CLASSES = {
  white: "bg-white",
  black: "bg-black ring-1 ring-inset ring-white/10",
  orange: "bg-[#F8931A]",
  charcoal: "bg-[#1D1E1D]",
  cream: "bg-[#FFFCFA]",
} as const;

export type Ground = keyof typeof GROUND_CLASSES;

export function groundClass(ground: Ground) {
  return GROUND_CLASSES[ground];
}

/** A coloured panel with an image centred on it. */
export function Tile({
  ground,
  image,
  alt,
  className,
  imgClassName,
  sizes = "(min-width: 1024px) 360px, 80vw",
}: {
  ground: Ground;
  image: { src: string; w: number; h: number };
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-xl p-8",
        GROUND_CLASSES[ground],
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.w}
        height={image.h}
        sizes={sizes}
        className={cn("h-auto max-h-full w-auto max-w-full object-contain", imgClassName)}
      />
    </div>
  );
}

export function Caption({ title, note }: { title: string; note?: string }) {
  return (
    <div className="mt-2.5 flex flex-wrap justify-between gap-2 text-sm">
      <span className="font-semibold text-white">{title}</span>
      {note && <span className="text-zinc-500">{note}</span>}
    </div>
  );
}

/** A short rule with a heavy top border. */
export function Rule({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0 border-t-2 border-white pt-3">
      <h4 className="mb-1.5 font-bold text-white">{title}</h4>
      <div className="text-sm leading-relaxed text-zinc-400">{children}</div>
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[0.85em] text-zinc-200">{children}</code>;
}
