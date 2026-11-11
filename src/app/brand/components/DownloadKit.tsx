import { Download } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ZIP_ALL, ZIP_PNG, ZIP_SVG } from "../brand-data";

export function DownloadAllButton({ className }: { className?: string }) {
  return (
    <a
      href={ZIP_ALL}
      download
      className={cn(
        "inline-flex items-center gap-2 rounded-xl bg-[#F8931A] px-5 py-3 text-sm font-semibold text-black shadow-lg shadow-[#F8931A]/20 transition-all hover:bg-[#ffa53d] hover:shadow-xl",
        className,
      )}
    >
      <Download className="h-4 w-4" />
      Download all assets
    </a>
  );
}

function KitButton({
  href,
  label,
  size,
  className,
}: {
  href: string;
  label: string;
  size: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      download
      className={cn(
        "inline-flex items-center justify-between gap-3 rounded-xl border-[1.5px] border-white px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-bitcoin hover:text-bitcoin",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2">
        <Download className="h-4 w-4" />
        {label}
      </span>
      <span className="text-xs font-medium text-zinc-400">{size}</span>
    </a>
  );
}

export function DownloadSvgButton({ className }: { className?: string }) {
  return <KitButton href={ZIP_SVG} label="SVG only" size="0.3 MB" className={className} />;
}

export function DownloadPngButton({ className }: { className?: string }) {
  return <KitButton href={ZIP_PNG} label="PNG only" size="14 MB" className={className} />;
}
