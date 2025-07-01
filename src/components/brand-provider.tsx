"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface BrandContextValue {
  brand: string;
}

const BrandContext = createContext<BrandContextValue>({ brand: "Bitcoin Deepa" });

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState("Bitcoin Deepa");

  useEffect(() => {
    fetch("https://ipapi.co/json")
      .then((res) => res.json())
      .then((data) => {
        if (data?.country_code === "LK") {
          setBrand("Bitcoin දීප");
        }
      })
      .catch(() => {
        // ignore network errors
      });
  }, []);

  return <BrandContext.Provider value={{ brand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}

export function BrandName() {
  const { brand } = useBrand();
  return <>{brand}</>;
}
