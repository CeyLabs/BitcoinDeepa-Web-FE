"use client";

import type React from "react";
import { useState, useRef } from "react";
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
import { LightningPattern } from "./icons";
import { BrandName } from "./brand-provider";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "./ui/dialog";

const CARD_FEATURES = [
  "LNURLW withdrawal embedded into a Secure NFC card",
  "Tapping your card authorizes a one-time withdrawal payment",
  "Works with any merchant's Lightning point of sale device",
  "Contactless Lightning Network Bolt Card technology",
  "Join with us for a revolutionized future",
];

const HOW_IT_WORKS_STEPS = [
  "Tap your card on any Lightning-enabled point of sale device",
  "The card authorizes a one-time withdrawal payment",
  "Transaction is processed instantly on the Lightning Network",
  "Secure, fast, and with minimal fees",
];

interface FeatureItemProps {
  feature: string;
  index: number;
  isInView: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  feature,
  index,
  isInView,
}) => (
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
);

const ViewMoreDialog: React.FC = () => {
  const handleScrollCapture = (e: React.UIEvent) => {
    e.stopPropagation();
  };

  const handleWheel = (e: React.WheelEvent) => {
    const target = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = target;

    if (scrollTop === 0 && e.deltaY < 0) {
      e.preventDefault();
      return;
    }

    if (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0) {
      e.preventDefault();
      return;
    }

    e.stopPropagation();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <GradientButton className="px-8 py-3 text-lg">View More</GradientButton>
      </DialogTrigger>

      <DialogContent
        className="bg-zinc-900 border-none max-h-[80vh] overflow-hidden p-0"
        onWheel={handleWheel}
        onScroll={handleScrollCapture}
      >
        <div
          className="overflow-y-auto max-h-[80vh] p-6 hide-scrollbar"
          onWheel={handleWheel}
          onScroll={handleScrollCapture}
        >
          <p className="text-bitcoin text-lg font-medium">Lightning Network</p>
          <DialogTitle className="text-3xl md:text-4xl font-bold mt-2 mb-6">
            <BrandName /> Bolt Card
          </DialogTitle>

          <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
            <h3 className="text-bitcoin text-xl font-medium mb-4">
              Lightning Network Bolt Card
            </h3>
            <p className="text-gray-300 mb-6">
              The <BrandName /> Card is more than just a card - it's your
              gateway to the future of payments. With embedded LNURLW
              technology, you can make instant Bitcoin payments with just a tap.
            </p>
            <div className="flex justify-center mb-4">
              <div className="relative w-[280px] h-[175px] md:w-[400px] md:h-[250px] rounded-xl overflow-hidden">
                <Image
                  src="/images/bdfcard.png"
                  alt="Bitcoin Deepa Card Front"
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
              {HOW_IT_WORKS_STEPS.map((step, idx) => (
                <li className="flex items-start" key={idx}>
                  <div className="h-6 w-6 rounded-full bg-bitcoin/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-bitcoin" />
                  </div>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <GradientButton className="px-8 py-3 text-lg" disabled>
              Coming Soon
            </GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function BitcoinCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

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

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 relative overflow-hidden min-h-[80vh] flex items-center"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <LightningPattern />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content Section */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-white">Get Your</span>
                <span className="block text-bitcoin mt-2">
                  <BrandName /> Card Today
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Experience the future of payments with our contactless Lightning
                Network Bolt Card.
              </p>

              <ul className="space-y-4 mb-8 text-left max-w-lg mx-auto lg:mx-0">
                {CARD_FEATURES.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    feature={feature}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </ul>
              <ViewMoreDialog />
            </motion.div>
          </div>

          {/* Card Section */}
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
              onClick={handleCardClick}
            >
              {/* Card Flip Container */}
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
                {/* Card Front */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src="/images/bdfcard.png"
                    alt="Bitcoin Deepa Card Front"
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

                {/* Card Back */}
                <motion.div
                  className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src="/images/bdbcard.png"
                    alt="Bitcoin Deepa Card Back"
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

              {/* Card Instructions */}
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
    </section>
  );
}
