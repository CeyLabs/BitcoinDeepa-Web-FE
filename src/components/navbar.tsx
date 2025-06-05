"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Rocket, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const navItems = useRef([
    { label: "Learn", dropdown: "learn" },
    { label: "Community", dropdown: "community" },
    { label: "FAQ", href: "#faq" },
    {
      label: "Resources",
      href: "https://blog.bitcoindeepa.com/resources/",
    },
  ]).current;

  const handleMouseEnter = useCallback((index: number, dropdown?: string) => {
    setHoveredIndex(index);
    if (dropdown) {
      setActiveDropdown(dropdown);
    }
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
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-bitcoin"
                              >
                                <path d="M2 12C2 6.5 6.5 2 12 2a10 10 0 0 1 8 4" />
                                <path d="M5 19.5C5.5 18 6 15 6 12c0-.7.12-1.37.34-2" />
                                <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                                <path d="M12 10v12" />
                                <path d="M12 22c4.2 0 7-1.67 7-5" />
                                <path d="M10 10.5V14" />
                                <path d="M14 10.5V14" />
                                <path d="M10 14a2 2 0 1 0 4 0" />
                                <path d="M6 10.5V14" />
                                <path d="M18 10.5V14" />
                                <path d="M6 14a2 2 0 1 0 4 0" />
                                <path d="M18 14a2 2 0 0 1-4 0" />
                              </svg>
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
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                                <path
                                  d="M3 21C3 17.134 7.02944 14 12 14C16.9706 14 21 17.134 21 21"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
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
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M12 6.25278V19.2528M12 6.25278L6.5 10.0028M12 6.25278L17.5 10.0028M3 17.2528V8.75278C3 8.34038 3.18273 7.95278 3.48986 7.75278L11.4899 3.25278C11.8094 3.03054 12.1906 3.03054 12.5101 3.25278L20.5101 7.75278C20.8173 7.95278 21 8.34038 21 8.75278V17.2528C21 17.6652 20.8173 18.0528 20.5101 18.2528L12.5101 22.7528C12.1906 22.975 11.8094 22.975 11.4899 22.7528L3.48986 18.2528C3.18273 18.0528 3 17.6652 3 17.2528Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                className="text-bitcoin"
                              >
                                <path
                                  d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
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
                              <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="currentColor"
                              >
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </Link>
                            <Link
                              href="https://t.me/bitcoindeepa"
                              className="text-white hover:text-bitcoin transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="currentColor"
                              >
                                <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.18 1.896-.96 6.504-1.356 8.628-.168.9-.504 1.2-.816 1.236-.696.06-1.224-.456-1.896-.9-1.056-.696-1.656-1.128-2.676-1.8-1.188-.78-.42-1.212.264-1.908.18-.18 3.252-2.976 3.312-3.228a.24.24 0 00-.06-.216c-.072-.06-.168-.036-.252-.024-.108.024-1.788 1.14-5.064 3.348-.48.324-.912.492-1.296.48-.432-.012-1.248-.24-1.86-.444-.756-.24-1.344-.372-1.296-.792.024-.216.324-.432.888-.66 3.504-1.524 5.832-2.532 6.996-3.012 3.336-1.392 4.02-1.632 4.476-1.632.096 0 .324.024 .468.144.12.096.156.228.168.324-.012.072.012.288 0 .336z" />
                              </svg>
                            </Link>
                            <Link
                              href="https://instagram.com/bitcoindeepa"
                              className="text-white hover:text-bitcoin transition-colors"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                                fill="currentColor"
                              >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                              </svg>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

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