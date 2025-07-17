"use client";

import { motion } from "framer-motion";
import { Card } from "../../components/ui/card";
import { Info } from "lucide-react";

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
          <div className="text-gray-300 leading-relaxed">
            <p className="mb-2">
              <strong className="text-bitcoin">Satoshis</strong> are a tiny
              subunit of bitcoin. Each bitcoin is made up of{" "}
              <strong>100 million satoshis</strong>.
            </p>
            <p>
              This simple converter uses real-time exchange rates based on
              Bitcoin's current price from{" "}
              <strong className="text-bitcoin">CoinGecko API</strong>.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
