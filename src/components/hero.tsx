"use client"

import { Button } from "@/src/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background SVG positioned in the corner with low opacity */}
      <div className="absolute -bottom-20 -right-20 md:-bottom-40 md:-right-40 w-[600px] h-[600px] opacity-5 pointer-events-none z-0">
        <Image
          src="/images/bitcoindeepa-logo.svg"
          alt="BitcoinDeepa Background"
          width={600}
          height={600}
          className="w-full h-full"
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 md:px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white font-bold">Sri Lanka's Fastest Growing</span>
              <span className="block text-bitcoin mt-2 font-bold">Bitcoin Community 🇱🇰</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 font-light px-2 sm:px-0">
              Join the growing community of Bitcoin enthusiasts in Sri Lanka. Learn, connect, and build the future of
              finance together.
            </p>
            <div className="flex flex-row gap-4 justify-center lg:justify-start max-w-[95%] mx-auto lg:mx-0 lg:max-w-none">
              <Button className="bg-bitcoin hover:bg-bitcoin-dark text-white font-medium">
                Join Community
              </Button>
              <Button
                // size="lg"
                variant="outline"
                className="border-bitcoin text-bitcoin hover:bg-bitcoin/10 font-medium"
              >
                Learn About Bitcoin
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-bitcoin/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 relative">
                  <div className="absolute inset-0 rounded-full bg-bitcoin-gradient animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                    <Image
                      src="/images/bitcoindeepa-logo.png"
                      alt="BitcoinDeepa Logo"
                      width={180}
                      height={180}
                      className="w-40 h-40 md:w-48 md:h-48"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
