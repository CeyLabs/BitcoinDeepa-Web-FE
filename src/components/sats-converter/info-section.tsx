"use client";

import { motion } from "framer-motion";
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
    </motion.div>
  );
}
