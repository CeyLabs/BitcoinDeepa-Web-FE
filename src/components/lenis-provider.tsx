"use client";

import { PropsWithChildren, memo } from "react";
import useLenis from "@/src/hooks/use-lenis";

function LenisProvider({ children }: PropsWithChildren) {
  const { lenis } = useLenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  return children;
}

export default memo(LenisProvider);
