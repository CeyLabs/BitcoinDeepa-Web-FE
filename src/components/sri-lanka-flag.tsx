import { cn } from "@/src/lib/utils";

/**
 * The 🇱🇰 flag as a native emoji. The font stack puts Apple Color Emoji first,
 * so Apple devices show the iOS artwork; elsewhere it falls back to the
 * platform's emoji font. Size it with font-size, not height.
 */
export function SriLankaFlag({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Sri Lanka"
      className={cn(
        "inline-block leading-none font-['Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji',sans-serif]",
        className,
      )}
    >
      🇱🇰
    </span>
  );
}
