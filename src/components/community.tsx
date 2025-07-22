"use client";

import { motion } from "framer-motion";
import { GradientButton } from "./gradient-button";
import Image from "next/image";
import Link from "next/link";
import { BrandName } from "./brand-provider";

export default function Community() {
  return (
    <section id="community" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-8 sm:px-8 md:px-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden group">
              <Image
                src="/images/bitcoindeepa-intro.png"
                alt="Bitcoin Deepa Community (Bitcoin දීප)"
                fill
                className="object-cover opacity-75"
                priority
              />

              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/20 to-transparent"></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Join the</span>
              <span className="block text-bitcoin mt-2">
                Bitcoin දීප Revolution
              </span>
            </h2>
            <p className="text-gray-400 mb-6">
              <BrandName /> is more than just a community - it's a movement to
              bring financial sovereignty to Sri Lanka through Bitcoin education
              and adoption.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Regular meetups across Sri Lanka",
                "Online learning sessions and workshops",
                "Networking with global Bitcoin experts",
                "Resources in local languages",
                "Support for Bitcoin initiatives and startups",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-2 w-2 rounded-full bg-bitcoin mr-3"></div>
                  <span className="text-gray-300">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Link
              href="https://t.me/+OoVmewRlUHg1MTA1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GradientButton>Join Our Community</GradientButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
