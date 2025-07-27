"use client";

import { Button } from "@/src/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fbEvent } from "@/src/lib/facebook-pixel";

export default function Hero() {
  return (
    <section
      className="min-h-hero flex items-center bg-black relative overflow-hidden"
      role="region"
      aria-label="Hero Section"
    >
      {/* Background SVG positioned in the corner with low opacity */}
      <div className="absolute -bottom-20 -right-20 md:-bottom-40 md:-right-40 w-[600px] h-[600px] opacity-5 pointer-events-none z-0">
        <Image
          src="/images/bitcoindeepa-logo.svg"
          alt="Bitcoin Deepa Logo (Bitcoin දීප)"
          width={600}
          height={600}
          className="size-full"
        />
      </div>

      <div className="container mx-auto px-8 sm:px-8 md:px-24 py-0 sm:py-0 lg:py-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white text-2xl sm:text-2xl md:text-5xl font-bold">
                Sri Lanka's Fastest Growing
              </span>
              <span className="block text-bitcoin mt-2 font-bold">
                Bitcoin Community 🇱🇰
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 font-light px-2 sm:px-0">
              Join the growing community of Bitcoin enthusiasts in Sri Lanka.
              Learn, connect, and build the future of finance together.
            </p>
            <div className="flex flex-row gap-4 justify-center lg:justify-start max-w-[95%] mx-auto lg:mx-0 lg:max-w-none">
              <Link
                href="https://t.me/+OoVmewRlUHg1MTA1"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => fbEvent('Lead')}
              >
                <Button className="bg-bitcoin hover:bg-bitcoin-dark text-white font-medium">
                  Join Community
                </Button>
              </Link>
              <Link href="https://blog.bitcoindeepa.com/about/">
                <Button
                  variant="outline"
                  className="border-bitcoin text-bitcoin hover:bg-bitcoin/10 font-medium"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full px-8 sm:px-0 md:px-12 aspect-square max-w-md mx-auto">
              <div className="absolute inset-4 bg-bitcoin/20 rounded-full blur-2xl"></div>
              <div className="relative z-10 size-full flex items-center justify-center">
                <div className="size-64 md:w-[21rem] md:h-[21rem] relative">
                  <div className="absolute inset-0 rounded-full bg-bitcoin-gradient animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-black flex items-center justify-center">
                    <Image
                      src="/images/bitcoindeepa-logo.png"
                      alt="Bitcoin Deepa Logo (Bitcoin දීප)"
                      width={180}
                      height={180}
                      className="size-40 md:size-52"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
