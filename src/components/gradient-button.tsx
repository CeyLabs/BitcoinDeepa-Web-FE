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
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50",
          variant === "default" &&
            "bg-bitcoin text-black hover:bg-bitcoin-dark hover:shadow-lg hover:shadow-bitcoin/20 active:opacity-90",
          variant === "outline" &&
            "border-[1.5px] border-white bg-transparent text-white hover:border-bitcoin hover:text-bitcoin",
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
