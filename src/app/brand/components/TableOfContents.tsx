"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { List } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { TOC_ITEMS } from "../brand-data";
import { scrollToSection, useActiveSection } from "./toc-hooks";

const IDS = TOC_ITEMS.map((item) => item.id);

export function TableOfContents() {
  const activeId = useActiveSection(IDS);

  return (
    <nav
      aria-label="On this page"
      className="rounded-xl bg-zinc-900 p-5"
    >
      <div className="mb-3 flex items-center gap-2.5 text-zinc-300">
        <List className="h-4 w-4" />
        <p className="text-xs font-semibold uppercase tracking-wider">On this page</p>
      </div>
      <ul className="flex flex-col gap-0.5">
        {TOC_ITEMS.map((item, i) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id} className="relative list-none">
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-300",
                  isActive ? "font-medium text-white" : "text-zinc-500 hover:text-zinc-200",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="brand-toc-pill"
                    className="absolute inset-0 z-0 rounded-md border border-zinc-700/60 bg-zinc-800/80"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 w-5 text-xs tabular-nums",
                    isActive ? "text-[#F8931A]" : "text-zinc-600",
                  )}
                >
                  {i === 0 ? "—" : String(i).padStart(2, "0")}
                </span>
                <span className="relative z-10">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
