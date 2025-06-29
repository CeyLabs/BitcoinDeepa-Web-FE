"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, ChevronDown } from "lucide-react";
import PriceTicker from "./price-ticker";
import { motion, AnimatePresence } from "framer-motion";
import {
  TwitterIcon,
  TelegramIcon,
  InstagramIcon,
  EduIcon,
  CommunityIcon,
  DeveloperIcon,
  ResearchIcon,
} from "./icons";

const mobileMenuVariants = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
};

const dropdownVariants = {
  initial: { opacity: 0, y: -5, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -5, scale: 0.95 },
};

const dropdownTransition = { duration: 0.2, ease: "easeOut" };

const navItems = [
  { label: "Learn", dropdown: "learn" },
  { label: "Community", dropdown: "community" },
  { label: "FAQ", href: "#faq" },
  {
    label: "Resources",
    href: "https://blog.bitcoindeepa.com/resources/",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileSection, setActiveMobileSection] = useState<string | null>(
    null
  );
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({});
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number, dropdown?: string) => {
    setHoveredIndex(index);
    setActiveDropdown(dropdown || null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
    setActiveDropdown(null);
  }, []);

  const toggleMobileSection = useCallback((section: string) => {
    setActiveMobileSection((prev) => (prev === section ? null : section));
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = tabRefs.current[hoveredIndex];
      if (hoveredElement) {
        requestAnimationFrame(() => {
          const { offsetLeft, offsetWidth } = hoveredElement;
          setHoverStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          });
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    return () => {
      setIsMenuOpen(false);
      setActiveMobileSection(null);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-4 relative">
        <div
          className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-zinc-800/50 shadow-lg overflow-visible"
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Navigation Bar */}
          <div className="flex items-center justify-between h-16 px-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/bitcoindeepa-h-logo.svg"
                alt="BitcoinDeepa"
                width={160}
                height={32}
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center relative">
              {/* Hover Highlight */}
              <div
                className="absolute h-[30px] transition-all duration-300 ease-out bg-white/10 rounded-[6px] flex items-center"
                style={{
                  ...hoverStyle,
                  opacity: hoveredIndex !== null ? 1 : 0,
                }}
              />

              {/* Navigation Items */}
              <div className="relative flex space-x-1 items-center">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                      if (tabRefs.current) tabRefs.current[index] = el;
                    }}
                    className={`px-4 py-2 cursor-pointer transition-colors duration-300 h-[30px] ${
                      index === activeIndex ? "text-white" : "text-gray-300"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index, item.dropdown)}
                    onClick={() => item.href && setActiveIndex(index)}
                  >
                    <div className="text-sm font-medium leading-5 whitespace-nowrap flex items-center justify-center h-full">
                      {item.href ? (
                        <Link href={item.href}>{item.label}</Link>
                      ) : (
                        item.label
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-2">
              {/* <Link
                href="#login"
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-md font-medium"
              >
                Login
              </Link> */}
              <PriceTicker />
              <Link
                href="https://t.me/bitcoindeepa"
                className="px-5 py-2 text-sm font-medium text-white bg-bitcoin hover:bg-bitcoin-dark transition-colors rounded-full flex items-center"
              >
                Join the Community
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative w-6 h-6 flex justify-center items-center group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col justify-between w-6 h-5 transform transition-all duration-300 ease-in-out">
                <div
                  className={`bg-bitcoin h-[2px] w-6 transform transition-all duration-300 ease-in-out origin-center ${
                    isMenuOpen ? "translate-y-[9px] rotate-45" : ""
                  }`}
                />
                <div
                  className={`bg-bitcoin h-[2px] w-6 rounded transform transition-all duration-200 ease-in-out ${
                    isMenuOpen ? "opacity-0 -translate-x-2" : ""
                  }`}
                />
                <div
                  className={`bg-bitcoin h-[2px] w-6 transform transition-all duration-300 ease-in-out origin-center ${
                    isMenuOpen ? "translate-y-[-9px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Dropdown Menus - Card Style */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-1 z-50 px-4 sm:px-6 lg:px-8"
              >
                <div className="bg-zinc-900/70 backdrop-blur-lg rounded-xl border border-zinc-800/50 shadow-xl overflow-hidden">
                  {activeDropdown === "learn" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Bitcoindeepa Blog
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Start your journey into Bitcoin
                          </p>
                          <Link
                            href="https://blog.bitcoindeepa.com"
                            className="text-white text-sm font-medium inline-flex items-center"
                          >
                            Explore guides →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <EduIcon className="text-bitcoin" />
                            </div>
                            <h3 className="text-white font-semibold">
                              Ceylon Cash Blog
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Learn about Bitcoin stuffs in Sinhala
                          </p>
                          <Link
                            href="#https://blog.ceyloncash.com"
                            className="text-bitcoin text-sm font-medium mt-2 inline-flex items-center"
                          >
                            Learn more →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDropdown === "community" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Events & Meetups
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Connect with Bitcoiners in Sri Lanka
                          </p>
                          <Link
                            href="https://lu.ma/bitcoindeepa"
                            className="text-white text-sm font-medium inline-flex items-center"
                          >
                            View calendar →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <CommunityIcon className="text-bitcoin" />
                            </div>
                            <h3 className="text-white font-semibold">
                              Join Our Telegram
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Connect with our active community
                          </p>
                          <Link
                            href="https://t.me/bitcoindeepa"
                            className="text-bitcoin text-sm font-medium mt-2 inline-flex items-center"
                          >
                            Join now →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeDropdown === "resources" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                      <div className="bg-bitcoin rounded-xl overflow-hidden">
                        <div className="p-6">
                          <h3 className="text-white font-semibold mb-1">
                            Learning Hub
                          </h3>
                          <p className="text-white/80 text-sm mb-4 font-light">
                            Educational resources for all levels
                          </p>
                          <Link
                            href="#resources"
                            className="text-white text-sm font-medium inline-flex items-center"
                          >
                            Browse resources →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <DeveloperIcon className="text-bitcoin" />
                            </div>
                            <h3 className="text-white font-semibold">
                              Developer Resources
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Build on Bitcoin and Lightning
                          </p>
                          <Link
                            href="#dev"
                            className="text-bitcoin text-sm font-medium mt-2 inline-flex items-center"
                          >
                            Get started →
                          </Link>
                        </div>
                      </div>

                      <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center mr-3">
                              <ResearchIcon className="text-bitcoin" />
                            </div>
                            <h3 className="text-white font-semibold">
                              Whitepapers & Research
                            </h3>
                          </div>
                          <p className="text-gray-400 text-sm font-light">
                            Deep dive into Bitcoin technology
                          </p>
                          <Link
                            href="#research"
                            className="text-bitcoin text-sm font-medium mt-2 inline-flex items-center"
                          >
                            Read papers →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile Menu - Part of the same container */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden overflow-hidden rounded-b-3xl border-t border-zinc-800/50"
              >
                <div className="p-4 space-y-2">
                  {/* Community Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("community")}
                    >
                      <span className="text-white font-medium">COMMUNITY</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${
                          activeMobileSection === "community"
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeMobileSection === "community" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-zinc-800/50"
                        >
                          <div className="p-4 space-y-3">
                            <Link
                              href="https://lu.ma/bitcoindeepa"
                              className="block p-3 rounded-lg bg-zinc-700/50 text-white hover:bg-bitcoin hover:text-white transition-colors"
                            >
                              <div className="font-medium">
                                Events & Meetups
                              </div>
                              <div className="text-sm text-zinc-400">
                                Connect with Bitcoiners in Sri Lanka
                              </div>
                            </Link>
                            <Link
                              href="https://t.me/bitcoindeepa"
                              className="block p-3 rounded-lg bg-zinc-700/50 text-white hover:bg-bitcoin hover:text-white transition-colors"
                            >
                              <div className="font-medium">
                                Join Our Telegram
                              </div>
                              <div className="text-sm text-zinc-400">
                                Connect with our active community
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* FAQ Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <Link
                      href="#faq"
                      className="w-full px-4 py-3 flex items-center text-white font-medium hover:bg-zinc-700/50 transition-colors"
                    >
                      FAQ
                    </Link>
                  </div>

                  {/* Resources Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <Link
                      href="https://blog.bitcoindeepa.com/resources/"
                      className="w-full px-4 py-3 flex items-center text-white font-medium hover:bg-zinc-700/50 transition-colors"
                    >
                      RESOURCES
                    </Link>
                  </div>

                  {/* Socials Section */}
                  <div className="bg-zinc-800/50 rounded-lg overflow-hidden">
                    <button
                      className="w-full px-4 py-3 flex justify-between items-center"
                      onClick={() => toggleMobileSection("socials")}
                    >
                      <span className="text-white font-medium">SOCIALS</span>
                      <ChevronDown
                        className={`w-5 h-5 text-zinc-500 transition-transform duration-200 ${
                          activeMobileSection === "socials" ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeMobileSection === "socials" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-zinc-800/50"
                        >
                          <div className="p-4 flex justify-around">
                            <Link
                              href="https://x.com/pearlofsatoshi"
                              className="text-white hover:text-bitcoin transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TwitterIcon className="w-6 h-6" />
                            </Link>
                            <Link
                              href="https://t.me/bitcoindeepa"
                              className="text-white hover:text-bitcoin transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <TelegramIcon className="w-6 h-6" />
                            </Link>
                            <Link
                              href="https://instagram.com/bitcoindeepa"
                              className="text-white hover:text-bitcoin transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <InstagramIcon className="w-6 h-6" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <PriceTicker className="mt-4" />
                  {/* Join Button */}
                  <Link
                    href="https://t.me/bitcoindeepa"
                    className="mt-4 px-5 py-3 text-center font-medium text-white bg-bitcoin hover:bg-bitcoin-dark transition-colors rounded-lg flex items-center justify-center"
                  >
                    Join the community
                    <Rocket className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
