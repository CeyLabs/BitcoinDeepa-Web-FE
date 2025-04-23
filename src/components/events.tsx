"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, ArrowLeft, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EventData {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  location_type: string;
  url: string;
  image_url?: string;
}

export default function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const response = await fetch("https://ceylabs.io/api/luma-events/v2/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_UUID}`,
          },
          body: JSON.stringify({
            uuid: "cal-ScJJJWHs8MPxBGt",
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Unable to load events at this time");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const totalPages = Math.ceil(events.length / 3);

  const nextSlide = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevSlide = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      nextSlide();
    }

    if (isRightSwipe && currentPage > 0) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="events" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between mb-12 md:flex-row"
        >
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-white">Upcoming</span>
              <span className="text-bitcoin ml-2">Meetups</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Join us at our upcoming events to connect with fellow Bitcoin
              enthusiasts in Sri Lanka
            </p>
          </div>

          {events.length > 3 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={prevSlide}
                disabled={currentPage === 0}
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin disabled:opacity-30 h-10 w-10 rounded-full flex items-center justify-center"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Previous page</span>
              </button>
              <div className="text-sm text-gray-400">
                {currentPage + 1} / {totalPages}
              </div>
              <button
                onClick={nextSlide}
                disabled={currentPage >= totalPages - 1}
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin disabled:opacity-30 h-10 w-10 rounded-full flex items-center justify-center"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next page</span>
              </button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-bitcoin/20 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-bitcoin rounded-full animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-400">Loading events...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-red-500/20 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-red-500"
              >
                <path
                  d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              Unable to Load Events
            </h3>
            <p className="text-gray-400">{error}</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-bitcoin/10 mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-bitcoin"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-400">
              Check back soon for new Bitcoin meetups and events
            </p>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {events
                  .slice(currentPage * 3, currentPage * 3 + 3)
                  .map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col h-full bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 hover:border-bitcoin/30 transition-all duration-300 overflow-hidden rounded-xl">
                        {event.image_url ? (
                          <div className="relative w-full pt-[56.25%] overflow-hidden">
                            <img
                              src={event.image_url || "/placeholder.svg"}
                              alt={event.title}
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-60"></div>
                            <div className="absolute bottom-3 left-3 bg-bitcoin text-black text-sm font-medium px-3 py-1 rounded-full">
                              {formatDate(event.start_time)}
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-zinc-800 to-zinc-900">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                width="64"
                                height="64"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-bitcoin/20"
                              >
                                <rect
                                  x="3"
                                  y="4"
                                  width="18"
                                  height="18"
                                  rx="2"
                                  ry="2"
                                ></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                              </svg>
                            </div>
                            <div className="absolute bottom-3 left-3 bg-bitcoin text-black text-sm font-medium px-3 py-1 rounded-full">
                              {formatDate(event.start_time)}
                            </div>
                          </div>
                        )}

                        <div className="p-5">
                          <h3 className="text-xl font-semibold text-white line-clamp-2 mb-4">
                            {event.title}
                          </h3>

                          <div className="space-y-3 text-sm text-gray-400">
                            <div className="flex items-start">
                              <Clock className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-bitcoin" />
                              <span>{formatTime(event.start_time)}</span>
                            </div>
                            <div className="flex items-start">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-bitcoin" />
                              <span className="line-clamp-2">
                                {event.location}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-auto p-5 pt-0">
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full text-sm font-medium bg-bitcoin hover:bg-bitcoin-dark text-black h-10 px-5 py-2 w-full transition-colors"
                          >
                            Register Now
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </AnimatePresence>

            {events.length > 3 && (
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "bg-bitcoin w-6"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
