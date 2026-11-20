import Image from "next/image";
import { cn } from "@/src/lib/utils";

/**
 * The national flag of Sri Lanka, unaltered: the public-domain artwork from
 * Wikimedia Commons ("Flag of Sri Lanka.svg"). Only the corners are softened
 * with CSS. Replaces the 🇱🇰 emoji, which renders differently everywhere.
 */
export function SriLankaFlag({ className }: { className?: string }) {
  return (
    <Image
      src="/images/flags/lk.svg"
      alt="Sri Lanka"
      width={1200}
      height={600}
      unoptimized
      className={cn("inline-block aspect-[2/1] w-auto rounded-[0.12em]", className)}
    />
  );
}
