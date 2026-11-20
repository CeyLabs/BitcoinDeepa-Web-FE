import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

/**
 * The site's one button. Every call to action uses these variants and sizes,
 * so buttons match in height, padding, weight and radius everywhere.
 *
 * Use <Button> for actions and <Button asChild><a|Link …/></Button> for links,
 * or `buttonVariants()` on an element you can't wrap.
 */
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap select-none",
    // Only the properties that change: no `transition: all`.
    "transition-[background-color,border-color,color,scale] duration-150 ease-out",
    // Tactile press, the same everywhere.
    "active:scale-[0.96]",
    "outline-none focus-visible:ring-2 focus-visible:ring-bitcoin focus-visible:ring-offset-2 focus-visible:ring-offset-black",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Main action: solid Satoshi Orange. */
        primary: "bg-bitcoin text-black hover:bg-bitcoin-dark",
        /** Second action next to a primary: white outline. */
        secondary: "border-[1.5px] border-white bg-transparent text-white hover:border-bitcoin hover:text-bitcoin",
        /** Action on a Satoshi Orange surface. */
        dark: "bg-black text-white hover:bg-zinc-900",
        /** Low-emphasis action on dark panels. */
        subtle: "bg-zinc-900 text-zinc-200 hover:bg-zinc-800 hover:text-white",
      },
      size: {
        /** Compact: nav bar, banners, inline actions. 40px tall. */
        sm: "h-10 px-4 text-sm",
        /** Default for section CTAs. 44px tall. */
        md: "h-11 px-5 text-sm",
        /** Hero and page-level CTAs. 48px tall. */
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        // Plain buttons default to type="button" so they never submit forms by accident.
        type={asChild ? type : (type ?? "button")}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/**
 * A short label on phones (where CTA pairs share the row 50/50) and the full
 * label from 640px up. Only the visible one is in the accessibility tree.
 */
function ResponsiveLabel({ short, full }: { short: string; full: string }) {
  return (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{full}</span>
    </>
  );
}

export { Button, buttonVariants, ResponsiveLabel };
