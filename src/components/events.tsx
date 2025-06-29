"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Clock,
  MapPin,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandName } from "./brand-provider";

interface EventData {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  location: string;
  location_type: string;
  url: string;
  image_url?: string;
  latitude?: string;
  longitude?: string;
  geo_address_info?: {
    city?: string;
    address?: string;
    country?: string;
    full_address?: string;
  };
}

function getDisplayLocation(
  event: EventData,
  type: "short" | "full" = "short"
) {
  if (event.location_type === "ONLINE") return "Online Event";
  if (event.geo_address_info) {
    const { address, city, country, full_address } = event.geo_address_info;
    if (type === "full" && full_address) return full_address;
    if (address && city) return `${address}, ${city}`;
    if (city) return city;
  }
  return event.location || "Location TBA";
}

export default function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredMapId, setHoveredMapId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://ceylabs.io/api/luma-events/v3/?calendar=cal-wMA8oEbnEEFAAH5",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_UUID}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();

        const transformed: EventData[] = (data || []).map((item: any) => {
          const event = item.event;
          return {
            id: event.api_id,
            title: event.name,
            start_time: event.start_at,
            end_time: event.end_at,
            location: item.calendar?.geo_city || "N/A",
            location_type: event.location_type,
            url: `https://lu.ma/${event.url}`,
            image_url: event.cover_url,
            latitude: event.geo_latitude,
            longitude: event.geo_longitude,
            geo_address_info: event.geo_address_info,
          };
        });

        setEvents(transformed);
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

  const formatTimeRange = (start: string, end: string) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return `${startTime.toLocaleTimeString(
      "en-US",
      options
    )} - ${endTime.toLocaleTimeString("en-US", options)}`;
  };

  const getGoogleMapsUrl = (lat?: string, lng?: string) => {
    if (!lat || !lng) return "#";
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const totalPages = Math.ceil(events.length / 3);

  const nextSlide = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const prevSlide = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
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
    if (distance > 50 && currentPage < totalPages - 1) nextSlide();
    if (distance < -50 && currentPage > 0) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="events" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-bitcoin/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Be part of the <BrandName /> community join our events, share
              ideas, and vibe with the community across Sri Lanka.
            </p>
          </div>

          {events.length > 3 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={prevSlide}
                disabled={currentPage === 0}
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin disabled:opacity-30 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
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
                className="border border-bitcoin/20 text-bitcoin hover:bg-bitcoin/10 hover:border-bitcoin disabled:opacity-30 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="sr-only">Next page</span>
              </button>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({
              length: events.length
                ? events.slice(currentPage * 3, currentPage * 3 + 3).length
                : 3,
            }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse flex flex-col h-full bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 rounded-xl overflow-hidden"
              >
                <div className="w-full aspect-[1/1] bg-zinc-800" />
                <div className="p-5 space-y-4">
                  <div className="h-4 bg-zinc-700 rounded w-3/4" />
                  <div className="h-3 bg-zinc-700 rounded w-1/2" />
                  <div className="h-3 bg-zinc-700 rounded w-1/3" />
                  <div className="h-8 bg-bitcoin/50 rounded mt-4" />
                </div>
              </div>
            ))}
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bitcoin/10 mb-4">
              <Calendar className="h-8 w-8 text-bitcoin" />
            </div>
            <h3 className="text-2xl font-medium text-white mb-3">
              No Upcoming Events happening at the moment.
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Check back later for new events.
            </p>
            {/* <a
              href="https://t.me/bitcoindeepa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-bitcoin hover:bg-bitcoin-dark text-black h-10 px-5 py-2 transition-colors"
            >
              Join Our Telegram
            </a> */}
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
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.start_time).getTime() -
                      new Date(b.start_time).getTime()
                  )
                  .slice(currentPage * 3, currentPage * 3 + 3)
                  .map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col h-full bg-zinc-900/50 backdrop-blur-sm border border-bitcoin/10 hover:border-bitcoin/30 transition-all duration-300 rounded-xl overflow-hidden"
                    >
                      <div className="relative w-full aspect-[1/1] overflow-hidden">
                        {event.image_url ? (
                          <img
                            src={event.image_url || "/placeholder.svg"}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gradient-to-br from-zinc-800 to-zinc-900">
                            <Calendar className="h-16 w-16 text-bitcoin/20" />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent"></div>

                        <div className="absolute top-3 left-3 bg-bitcoin text-black text-sm font-medium px-3 py-1 rounded-md shadow-[0_0_15px_rgba(255,153,0,0.5)] backdrop-blur-[1px]">
                          {formatDate(event.start_time)}
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-white text-xl font-bold mb-4 line-clamp-2 min-h-[3.5rem]">
                          {event.title}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-400 mb-4">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-bitcoin" />
                            <span>
                              {formatTimeRange(
                                event.start_time,
                                event.end_time
                              )}
                            </span>
                          </div>

                          <div
                            className="relative mb-4"
                            onMouseEnter={() => setHoveredMapId(event.id)}
                            onMouseLeave={() => setHoveredMapId(null)}
                          >
                            <a
                              href={getGoogleMapsUrl(
                                event.latitude,
                                event.longitude
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start gap-2 group"
                            >
                              <MapPin className="w-4 h-4 min-w-[1rem] text-bitcoin group-hover:text-bitcoin-light transition-colors mt-0.5" />
                              <span className="group-hover:text-bitcoin-light transition-colors break-words whitespace-pre-line relative z-20">
                                {getDisplayLocation(event, "short")}
                                <span className="absolute z-50 top-full left-0 mt-2 bg-zinc-900 text-white text-xs font-medium px-3 py-2 rounded shadow-lg opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity w-max max-w-[300px] hidden md:block pointer-events-none">
                                  {getDisplayLocation(event, "full")}
                                </span>
                              </span>
                            </a>
                            {hoveredMapId === event.id && (
                              <div className="absolute -top-8 right-0 bg-bitcoin text-black text-xs font-medium px-2 py-1 rounded whitespace-nowrap flex items-center z-50 pointer-events-none">
                                Take me there
                                <ExternalLink className="w-3 h-3 ml-1" />
                                <div className="absolute -bottom-1 left-3 w-2 h-2 bg-bitcoin rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </div>

                        <a
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center justify-center rounded-md text-sm font-medium bg-bitcoin hover:bg-bitcoin-dark text-black h-10 px-5 py-2 w-full transition-colors"
                        >
                          Register Now
                        </a>
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
