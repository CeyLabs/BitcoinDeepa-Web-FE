"use client";

import { useRef } from "react";
import { fbEvent } from "@/src/lib/facebook-pixel";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  BookOpen,
  Globe,
  Award,
  Clock,
  ShoppingCart,
  Quote,
} from "lucide-react";

export default function BookOrderSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const originalPrice = 1600;
  const salePrice = 1300;
  const discountPercentage = Math.floor(
    ((originalPrice - salePrice) / originalPrice) * 100
  );

  const paymentUrl = "https://payhere.lk/pay/of811f041";

  const handleOrderNow = () => {
    fbEvent('Purchase', { value: salePrice, currency: 'LKR' });
    window.open(paymentUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="book-order"
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">The Bullish Case for Bitcoin,</span>
            <span className="block text-bitcoin mt-2">
              Now in Sinhala and for Everyone
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto px-4">
            Get your copy of the first comprehensive Bitcoin book translated for
            Sri Lankan readers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center max-w-6xl mx-auto">
          {/* Book Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative px-4 sm:px-0"
          >
            <div className="relative group">
              {/* Frosted glass container with Bitcoin glow */}
              <div className="relative p-6 md:p-8 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-bitcoin/10 via-bitcoin/5 to-transparent border border-bitcoin/20 shadow-2xl overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/20 via-bitcoin/10 to-transparent opacity-50"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-bitcoin/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-bitcoin/20 rounded-full blur-3xl"></div>

                {/* Main book image */}
                <div className="relative z-10">
                  <Image
                    src="/images/book-mockup.png"
                    alt="The Bullish Case for Bitcoin - Sinhala Edition"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain rounded-3xl drop-shadow-2xl"
                    priority
                  />
                </div>

                {/* Secondary book image - appears on hover */}
                <div className="absolute inset-6 md:inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                  <Image
                    src="/images/book-mockup-preview.png"
                    alt="The Bullish Case for Bitcoin - Preview"
                    width={600}
                    height={600}
                    className="w-full h-auto object-contain drop-shadow-2xl"
                  />
                </div>

                {/* Interactive glow that follows cursor */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-radial from-bitcoin/30 via-bitcoin/10 to-transparent"></div>
                </div>
              </div>

              {/* Floating elements around the container */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-bitcoin/20 rounded-full blur-sm animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-bitcoin/30 rounded-full blur-sm animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-bitcoin/25 rounded-full blur-sm animate-pulse delay-500"></div>
            </div>

            {/* Book highlights */}
            <div className="mt-6 md:mt-8 grid grid-cols-3 gap-3 md:gap-4">
              <div className="text-center p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-bitcoin/10 hover:border-bitcoin/30 transition-colors">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-bitcoin mx-auto mb-2" />
                <div className="text-xs md:text-sm text-gray-400">Author</div>
                <div className="text-xs md:text-base font-bold text-white">
                  Vijay Boyapati
                </div>
              </div>
              <div className="text-center p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-bitcoin/10 hover:border-bitcoin/30 transition-colors">
                <Globe className="h-5 w-5 md:h-6 md:w-6 text-bitcoin mx-auto mb-2" />
                <div className="text-xs md:text-sm text-gray-400">
                  Translation
                </div>
                <div className="text-xs md:text-base font-bold text-white">
                  CeylonCash
                </div>
              </div>
              <div className="text-center p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-bitcoin/10 hover:border-bitcoin/30 transition-colors">
                <Award className="h-5 w-5 md:h-6 md:w-6 text-bitcoin mx-auto mb-2" />
                <div className="text-xs md:text-sm text-gray-400">Edition</div>
                <div className="text-xs md:text-base font-bold text-white">
                  Sinhala
                </div>
              </div>
            </div>
          </motion.div>

          {/* Book Details & Order Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6 md:space-y-8 px-4 sm:px-0"
          >
            {/* Book Info */}
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                බිට්කොයින් පෙළහර
              </h3>
              <p className="text-base md:text-lg text-bitcoin mb-4">
                The Bullish Case for Bitcoin - Sinhala Edition
              </p>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                The definitive guide to understanding Bitcoin, now available in
                Sinhala. This comprehensive translation brings Vijay Boyapati's
                acclaimed work to Sri Lankan readers, covering everything from
                Bitcoin's origins to its potential as the future of money.
              </p>
            </div>

            {/* Quote Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="relative"
            >
              {/* Frosted glass quote container */}
              <div className="relative p-4 md:p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/60 to-zinc-900/40 border border-zinc-700/50 shadow-2xl overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-bitcoin/5 via-transparent to-transparent opacity-50"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-bitcoin/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-bitcoin/5 rounded-full blur-2xl"></div>

                {/* Quote icon */}
                <div className="relative z-10 mb-3 md:mb-4">
                  <Quote className="h-6 w-6 md:h-8 md:w-8 text-bitcoin/60" />
                </div>

                {/* Quote text */}
                <div className="relative z-10">
                  <blockquote className="text-gray-200 text-sm md:text-lg leading-relaxed mb-4 md:mb-6 italic">
                    "An excellent and inspiring introduction to, and reminder
                    of, Bitcoin's value to the world, all through a
                    comprehensive and historical lens on money."
                  </blockquote>

                  {/* Attribution */}
                  <div className="text-right">
                    <div className="text-white font-bold text-sm md:text-lg">
                      —JACK DORSEY,
                    </div>
                    <div className="text-bitcoin text-xs md:text-sm font-medium">
                      Co-founder of Twitter, CEO of Square
                    </div>
                  </div>
                </div>

                {/* Decorative border */}
                <div className="absolute inset-0 rounded-2xl border border-bitcoin/20 pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Pricing & Order */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <div>
                  <div className="text-xs md:text-sm text-gray-400">Price</div>
                  <div className="flex items-center space-x-3">
                    <div className="text-xl md:text-2xl font-bold text-bitcoin">
                      රු. {salePrice.toLocaleString()}
                    </div>
                    <div className="text-sm md:text-base text-gray-500 line-through">
                      රු. {originalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-green-500 font-medium">
                    {discountPercentage}% Off
                  </div>
                </div>
                <div className="flex items-center bg-bitcoin/10 rounded-lg px-2 md:px-3 py-1 animate-pulse">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-bitcoin mr-1 md:mr-2" />
                  <span className="text-xs md:text-sm text-bitcoin font-medium">
                    Limited time offer
                  </span>
                </div>
              </div>

              {/* Order Button */}
              <motion.button
                onClick={handleOrderNow}
                className="w-full bg-bitcoin hover:bg-bitcoin-dark text-black font-bold py-3 md:py-4 px-4 md:px-6 rounded-lg transition-colors flex items-center justify-center group mb-3 md:mb-4 text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5 mr-2 group-hover:animate-pulse" />
                Order Now
                <ExternalLink className="h-3 w-3 md:h-4 md:w-4 ml-2" />
              </motion.button>

              <p className="text-xs text-gray-500 text-center">
                Secure payment processing • Expected delivery: 5-7 business days
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}