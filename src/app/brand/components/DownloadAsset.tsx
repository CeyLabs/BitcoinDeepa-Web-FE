"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { copyImage } from "./clipboard";

interface DownloadOption {
  format: string;
  path: string;
}

interface DownloadAssetProps {
  name: string;
  note?: string;
  image: { src: string; w: number; h: number };
  alt: string;
  downloads: DownloadOption[];
  ground?: "white" | "black" | "orange" | "charcoal";
  /** Fill the preview edge to edge (for artwork that carries its own ground). */
  fill?: boolean;
  className?: string;
  previewClassName?: string;
}

const GROUNDS = {
  white: "bg-white",
  black: "bg-black ring-1 ring-inset ring-white/10",
  orange: "bg-[#F8931A]",
  charcoal: "bg-[#1D1E1D]",
} as const;

const btn =
  "flex items-center gap-1.5 rounded-lg bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white";

export function DownloadAsset({
  name,
  note,
  image,
  alt,
  downloads,
  ground = "white",
  fill = false,
  className,
  previewClassName,
}: DownloadAssetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyImage(image.src);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy image:", error);
    }
  };

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-zinc-900 p-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md",
          GROUNDS[ground],
          !fill && "p-8",
          previewClassName,
        )}
      >
        {fill ? (
          <Image
            src={image.src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 480px, 100vw"
            className="object-cover"
          />
        ) : (
          <Image
            src={image.src}
            alt={alt}
            width={image.w}
            height={image.h}
            sizes="(min-width: 1024px) 320px, 60vw"
            className="h-full w-auto max-w-full object-contain"
          />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-2.5 pb-1">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-white" title={name}>
            {name}
          </h3>
          {note && <p className="truncate text-xs text-zinc-500">{note}</p>}
        </div>
        <div className="flex shrink-0 flex-wrap gap-1.5">
          <button type="button" onClick={handleCopy} className={btn} title="Copy PNG to clipboard">
            {copied ? (
              <Check className="h-3 w-3 text-green-400" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          {downloads.map((option) => (
            <a
              key={option.format}
              href={option.path}
              download
              className={cn(btn, "group/btn")}
            >
              <Download className="h-3 w-3 transition-transform group-hover/btn:translate-y-px" />
              {option.format}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
