"use client"

import { motion } from "framer-motion"
import { GradientButton } from "./gradient-button"
import { useRef } from "react"

export default function Community() {
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <section id="community" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern - subtle circuit-like lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path
              d="M0,50 L100,50 M50,0 L50,100 M25,25 L75,75 M75,25 L25,75"
              stroke="#f90"
              strokeWidth="0.5"
              fill="none"
            />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-1"
            ref={imageRef}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto rounded-2xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/5 to-transparent"></div>

              {/* Compass-like decorative element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[80%] h-[80%]">
                  {/* Outer circle */}
                  <div className="absolute inset-0 border-2 border-bitcoin/20 rounded-full"></div>

                  {/* Compass lines */}
                  {[0, 45, 90, 135].map((deg, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ transform: `rotate(${deg}deg)` }}
                    >
                      <div className="w-full h-[1px] bg-bitcoin/10"></div>
                    </div>
                  ))}

                  {/* Inner circle with image placeholder */}
                  <div className="absolute inset-[30%] border border-bitcoin/30 rounded-full flex items-center justify-center bg-zinc-900/80">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-bitcoin/50"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>

                  {/* Cardinal points */}
                  {["N", "E", "S", "W"].map((dir, i) => (
                    <div
                      key={i}
                      className="absolute text-bitcoin/40 text-sm font-medium"
                      style={{
                        top: i === 0 ? "5%" : i === 2 ? "95%" : "50%",
                        left: i === 3 ? "5%" : i === 1 ? "95%" : "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      {dir}
                    </div>
                  ))}
                </div>
              </div>
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
              <span className="block text-bitcoin mt-2">Bitcoin Revolution</span>
            </h2>
            <p className="text-gray-400 mb-6">
              BitcoinDeepa is more than just a community - it's a movement to bring financial sovereignty to Sri Lanka
              through Bitcoin education and adoption.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Regular meetups across Sri Lanka",
                "Online learning sessions and workshops",
                "Networking with global Bitcoin experts",
                "Resources in local languages",
                "Support for Bitcoin businesses and startups",
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
            <GradientButton>Join Our Community</GradientButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
