import { Download } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ZIP_ALL, ZIP_SVG } from "../brand-data";

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

export function DownloadSvgButton({ className }: { className?: string }) {
  return (
    <a
      href={ZIP_SVG}
      download
      className={cn(
        "inline-flex items-center justify-between gap-3 rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-zinc-500 hover:bg-white/5",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2">
        <Download className="h-4 w-4" />
        SVG only
      </span>
      <span className="text-xs font-medium text-zinc-400">0.3 MB</span>
    </a>
  );
}
