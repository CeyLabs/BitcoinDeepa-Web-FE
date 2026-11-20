import { Download } from "lucide-react";
import { buttonVariants } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";
import { ZIP_ALL, ZIP_PNG, ZIP_SVG } from "../brand-data";

export function DownloadAllButton({ className }: { className?: string }) {
  return (
    <a href={ZIP_ALL} download className={cn(buttonVariants({ size: "lg" }), className)}>
      <Download />
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
      className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "justify-between", className)}
    >
      <span className="inline-flex items-center gap-2">
        <Download />
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
  return <KitButton href={ZIP_PNG} label="PNG only" size="17 MB" className={className} />;
}
