"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "../../components/ui/card";
import { Info, ExternalLink } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../components/ui/popover";

interface InfoSectionProps {
  isInView: boolean;
}

export function InfoSection({ isInView }: InfoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-12"
    >
      <div className="space-y-4">
        <Card className="p-6 bg-zinc-900/30 backdrop-blur-sm border-bitcoin/10 transition-colors">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-bitcoin/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Info className="h-4 w-4 text-bitcoin" />
            </div>
            <div className="text-gray-300 leading-relaxed text-xs">
              <p>
                <strong className="text-bitcoin">Satoshis</strong> are a tiny
                subunit of bitcoin. Each bitcoin is made up of{" "}
                <strong>100 million satoshis</strong>. Powered by{" "}
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="text-bitcoin cursor-pointer hover:underline">
                      Ceylon Cash
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="bg-zinc-900 border-bitcoin/10 p-3 w-auto">
                    <div className="text-xs flex flex-col gap-2">
                      <div className="font-medium text-bitcoin mb-1">
                        Available Endpoints:
                      </div>
                      <a
                        href="https://fx.ceyloncash.com/currency/SATS"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-bitcoin"
                      >
                        <ExternalLink size={12} />
                        <span>SATS Exchange Rate</span>
                      </a>
                      <a
                        href="https://fx.ceyloncash.com/currency/BTC"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-bitcoin"
                      >
                        <ExternalLink size={12} />
                        <span>BTC Exchange Rate</span>
                      </a>
                      <a
                        href="https://fx.ceyloncash.com/currency/USD"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-gray-300 hover:text-bitcoin"
                      >
                        <ExternalLink size={12} />
                        <span>USD Exchange Rate</span>
                      </a>
                    </div>
                  </PopoverContent>
                </Popover>
              </p>
            </div>
          </div>
        </Card>

        <a
          href="https://t.me/bitcoindeepabot"
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bitcoin/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-transform duration-200"
        >
          <Card className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#060606] text-white shadow-[0_18px_55px_-32px_rgba(247,147,26,0.8)] group-hover:shadow-[0_26px_70px_-40px_rgba(247,147,26,0.65)]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F7931A]/35 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_60%)] pointer-events-none" />
            <div className="absolute right-3 top-1/2 hidden md:block h-20 w-20 -translate-y-1/2 opacity-60 group-hover:opacity-85 transition-opacity">
              <Image
                src="/assets/btc-animated.webp"
                alt="Animated Bitcoin"
                width={80}
                height={80}
                className="pointer-events-none select-none"
              />
            </div>
            <div className="relative flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm">
                  <Image
                    src="/assets/BDLogo_White.svg"
                    alt="Bitcoin Deepa"
                    width={96}
                    height={24}
                    className="h-[24px] w-auto"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/60">
                    Country-aware bitcoin companion
                  </p>
                  <h3 className="text-base sm:text-lg font-semibold leading-snug text-white">
                    Get started with the BitcoinDeepa Bot
                  </h3>
                  <p className="text-xs text-white/65 max-w-lg">
                    Keep track of localized bitcoin pricing, daily sats
                    insights, and member-only drops — right inside Telegram Mini
                    Apps.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/60 sm:ml-auto">
                <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-medium uppercase tracking-[0.25em] group-hover:border-white/35 group-hover:text-white/85 transition-colors">
                  launch
                  <span className="text-sm">↗</span>
                </span>
                <span className="text-[10px] sm:hidden font-medium uppercase tracking-[0.25em] group-hover:text-white/85 transition-colors">
                  launch ↗
                </span>
              </div>
            </div>
          </Card>
        </a>
      </div>
    </motion.div>
  );
}
