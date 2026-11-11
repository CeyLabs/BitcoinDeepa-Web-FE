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
          "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
          variant === "default" &&
            "bg-bitcoin text-black hover:bg-bitcoin-dark hover:shadow-lg hover:shadow-bitcoin/20 active:opacity-90",
          variant === "outline" &&
            "border border-bitcoin bg-transparent text-bitcoin hover:bg-bitcoin/10 active:bg-bitcoin/20",
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 px-3",
          size === "lg" && "h-11 px-8 text-base",
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
