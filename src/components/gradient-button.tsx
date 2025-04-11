import { type ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/src/lib/utils"

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
          variant === "default" &&
            "bg-bitcoin-gradient text-white hover:shadow-lg hover:shadow-bitcoin/20 active:opacity-90",
          variant === "outline" &&
            "border border-bitcoin bg-transparent text-bitcoin hover:bg-bitcoin/10 active:bg-bitcoin/20",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8 text-base",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
GradientButton.displayName = "GradientButton"

export { GradientButton }
