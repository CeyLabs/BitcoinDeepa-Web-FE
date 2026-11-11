"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { copyText } from "./clipboard";

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

function hexToHsl(hex: string): string {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      default:
        h = ((r - g) / d + 4) / 6;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

type Format = "HEX" | "RGB" | "HSL";
const FORMATS: Format[] = ["HEX", "RGB", "HSL"];

function formatValue(hex: string, format: Format): string {
  switch (format) {
    case "HEX":
      return hex.toUpperCase();
    case "RGB":
      return `rgb(${hexToRgb(hex).join(", ")})`;
    case "HSL":
      return hexToHsl(hex);
  }
}

interface ColorSwatchProps {
  name: string;
  hex: string;
  /** Text colour on the chip. */
  ink: string;
  role?: string;
  description?: string;
  size?: "lg" | "md" | "sm";
  className?: string;
}

export function ColorSwatch({
  name,
  hex,
  ink,
  role,
  description,
  size = "md",
  className,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState<Format | null>(null);

  const copy = (format: Format) => {
    copyText(formatValue(hex, format));
    setCopied(format);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-end p-4 font-bold",
          size === "lg" && "min-h-[170px] text-2xl",
          size === "md" && "min-h-[130px] text-lg",
          size === "sm" && "min-h-[100px] text-base",
          hex.toUpperCase() === "#000000" && "ring-1 ring-inset ring-white/10",
        )}
        style={{ background: hex, color: ink }}
      >
        {name}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <span className="font-mono text-sm text-white">{hex.toUpperCase()}</span>
          {role && <span className="text-xs font-semibold text-zinc-400">{role}</span>}
        </div>
        {description && <p className="text-xs leading-relaxed text-zinc-500">{description}</p>}
        <div className="mt-auto flex gap-1.5 pt-1">
          {FORMATS.map((format) => (
            <button
              key={format}
              type="button"
              onClick={() => copy(format)}
              aria-label={`Copy ${name} as ${format}`}
              className="flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              {copied === format ? (
                <Check className="h-3 w-3 text-green-400" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {format}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/** A single click-to-copy hex value, for gradient stops. */
export function CopyHex({ hex }: { hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        copyText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
      className="border-b border-dashed border-zinc-700 font-mono text-xs text-zinc-300 transition-colors hover:text-[#F8931A]"
    >
      {copied ? "Copied" : hex}
    </button>
  );
}
