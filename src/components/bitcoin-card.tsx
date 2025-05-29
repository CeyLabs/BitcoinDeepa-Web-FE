"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useInView,
} from "framer-motion";
import { GradientButton } from "./gradient-button";
import { CardModal } from "@/src/components/ui/card-modal";
import { LightningPattern } from "./icons";

export default function BitcoinCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-300, 300], [15, -15]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-15, 15]), {
    stiffness: 150,
    damping: 20,
  });

  const glareX = useTransform(x, [-300, 300], ["-20%", "120%"]);
  const glareY = useTransform(y, [-300, 300], ["-20%", "120%"]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardScale = useTransform(scrollYProgress, [0.1, 0.4], [0.6, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.4], [-100, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0.1, 0.4], [45, 0]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  function openModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setIsFlipped(false); // Always reset card to front when opening modal
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    return () => {
      x.set(0);
      y.set(0);
    };
  }, [x, y]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden min-h-[80vh] flex items-center"
    >
      {/* Background */}
      <div className="absolute  pointer-events-none" />

      {/* Lightning bolt patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <LightningPattern />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">Get Your</span>
                <span className="block text-bitcoin mt-2">
                  BitcoinDeepa Card Today
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Experience the future of payments with our contactless Lightning
                Network Bolt Card.
              </p>

              <ul className="space-y-4 mb-8 text-left max-w-lg mx-auto lg:mx-0">
                {[
                  "LNURLW withdrawal embedded into a Secure NFC card",
                  "Tapping your card authorizes a one-time withdrawal payment",
                  "Works with any merchant's Lightning point of sale device",
                  "Contactless Lightning Network Bolt Card technology",
                  "Join with us for a revolutionized future",
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isInView ? 1 : 0,
                      x: isInView ? 0 : -20,
                    }}
                    transition={{ duration: 0.3, delay: 0.3 + 0.1 * index }}
                    className="flex items-start"
                  >
                    <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-bitcoin" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <GradientButton className="px-8 py-3 text-lg" onClick={openModal}>
                View More
              </GradientButton>
            </motion.div>
          </div>

          <div className="flex-1 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              style={{
                scale: cardScale,
                opacity: cardOpacity,
                y: cardY,
                rotateX: cardRotateX,
              }}
              className="relative perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              ref={cardRef}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <motion.div
                className="relative preserve-3d w-[320px] h-[200px] cursor-pointer"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {/* Front */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/images/card-front.png"
                    alt="BitcoinDeepa Card Front"
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-50 pointer-events-none"
                    style={{
                      backgroundPosition: `${glareX}% ${glareY}%`,
                      backgroundSize: "150% 150%",
                    }}
                  />
                </motion.div>

                {/* Back */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src="/images/card-back.png"
                    alt="BitcoinDeepa Card Back"
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-radial from-white/20 to-transparent opacity-50 pointer-events-none"
                    style={{
                      backgroundPosition: `${glareX}% ${glareY}%`,
                      backgroundSize: "150% 150%",
                    }}
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-6 text-center text-gray-500 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p>*Hover to tilt or Click to flip</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Card Modal */}
      <CardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        layoutId="card-detail"
      >
        <div className="text-white">
          <p className="text-bitcoin text-lg font-medium">Lightning Network</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            BitcoinDeepa Bolt Card
          </h2>

          <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
            <h3 className="text-bitcoin text-xl font-medium mb-4">
              Lightning Network Bolt Card
            </h3>
            <p className="text-gray-300 mb-6">
              The BitcoinDeepa Card is more than just a card - it's your gateway
              to the future of payments. With embedded LNURLW technology, you
              can make instant Bitcoin payments with just a tap.
            </p>

            <div className="flex justify-center mb-4">
              <div className="relative w-[280px] h-[175px] md:w-[400px] md:h-[250px] rounded-xl overflow-hidden">
                <Image
                  src="/images/card-front.png"
                  alt="BitcoinDeepa Card Front"
                  width={400}
                  height={250}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="bg-zinc-800 rounded-2xl p-6">
            <h3 className="text-bitcoin text-xl font-medium mb-4">
              How It Works
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-bitcoin"></div>
                </div>
                <span className="text-gray-300">
                  Tap your card on any Lightning-enabled point of sale device
                </span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-bitcoin"></div>
                </div>
                <span className="text-gray-300">
                  The card authorizes a one-time withdrawal payment
                </span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-bitcoin"></div>
                </div>
                <span className="text-gray-300">
                  Transaction is processed instantly on the Lightning Network
                </span>
              </li>
              <li className="flex items-start">
                <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <div className="h-2 w-2 rounded-full bg-bitcoin"></div>
                </div>
                <span className="text-gray-300">
                  Secure, fast, and with minimal fees
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <GradientButton className="px-8 py-3 text-lg">
              Request Your Card
            </GradientButton>
          </div>
        </div>
      </CardModal>
    </section>
  );
}
