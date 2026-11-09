"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";
import { BrandName } from "./brand-provider";
import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
} from "@/src/components/ui/minimal-card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/motion-tabs";
import { Skeleton } from "@/src/components/ui/skeleton";

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

type Tab = "future" | "past";

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("future");
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
        setError(null);

        const response = await fetch(
          `https://ceylabs.io/api/luma-events/v3/?calendar=${process.env.NEXT_PUBLIC_LUMA_CALENDAR_ID}&type=${activeTab}`,
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
  }, [activeTab]);

  const handleTabChange = (tab: Tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentPage(0);
  };

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
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-white">
              {activeTab === "future" ? "Upcoming" : "Past"}
            </span>
            <span className="text-bitcoin ml-2">Meetups</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Be part of the <BrandName /> community join our events, share
            ideas, and vibe with the community across Sri Lanka.
          </p>
          <div className="flex justify-center mt-4">
            <Tabs
              value={activeTab}
              onValueChange={(v) => handleTabChange(v as Tab)}
            >
              <TabsList
                className="bg-zinc-900 border border-bitcoin/20 rounded-xl"
                activeClassName="bg-bitcoin rounded-lg"
              >
                <TabsTrigger
                  value="future"
                  className="data-[state=active]:text-black text-gray-400 px-5 rounded-lg"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="past"
                  className="data-[state=active]:text-black text-gray-400 px-5 rounded-lg"
                >
                  Past
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
{/* top pagination removed — unified below cards */}
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              /* mirrors MinimalCard: rounded-[24px] p-2 wrapper → image → title → description → button */
              <div
                key={i}
                className="rounded-[24px] bg-neutral-800 p-2 dark:shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]"
              >
                {/* image placeholder — matches MinimalCardImage rounded-[20px] mb-6 */}
                <Skeleton className="aspect-[4/3] w-full rounded-[20px] mb-6 bg-zinc-700" />

                {/* title — matches MinimalCardTitle mt-2 px-1 text-lg */}
                <Skeleton className="h-5 w-3/4 rounded-md mx-1 mb-2 bg-zinc-700" />
                <Skeleton className="h-5 w-1/2 rounded-md mx-1 mb-4 bg-zinc-700" />

                {/* description rows — matches MinimalCardDescription px-1 text-sm */}
                <Skeleton className="h-3.5 w-2/3 rounded-md mx-1 mb-2 bg-zinc-700/70" />
                <Skeleton className="h-3.5 w-1/2 rounded-md mx-1 mb-4 bg-zinc-700/70" />

                {/* button — matches px-1 pb-2 h-10 rounded-xl */}
                <Skeleton className="h-10 w-full rounded-xl mx-0 mb-1 bg-zinc-700/50" />
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
              {activeTab === "future"
                ? "No Upcoming Events happening at the moment."
                : "No past events found."}
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              {activeTab === "future"
                ? "Check back later for new events."
                : "Past meetups will appear here."}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(a.start_time).getTime() -
                      new Date(b.start_time).getTime()
                  )
                  .slice(currentPage * 3, currentPage * 3 + 3)
                  .map((event) => (
                    <div key={event.id}>
                      <MinimalCard className="w-full h-full flex flex-col">
                        <div className="relative">
                          <MinimalCardImage
                            src={event.image_url || "/placeholder.svg"}
                            alt={event.title}
                            className="!h-auto aspect-[4/3]"
                          />
                          <div className="absolute top-3 left-3 bg-bitcoin text-black text-xs font-semibold px-3 py-1 rounded-md shadow-[0_0_12px_rgba(255,153,0,0.5)]">
                            {formatDate(event.start_time)}
                          </div>
                        </div>

                        <MinimalCardTitle className="line-clamp-2 min-h-[3rem]">
                          {event.title}
                        </MinimalCardTitle>

                        <MinimalCardDescription>
                          <span className="flex items-center gap-1.5 mb-1">
                            <Clock className="w-3.5 h-3.5 text-bitcoin shrink-0" />
                            {formatTimeRange(event.start_time, event.end_time)}
                          </span>
                          <span className="flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-bitcoin shrink-0 mt-0.5" />
                            <a
                              href={getGoogleMapsUrl(event.latitude, event.longitude)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-bitcoin transition-colors"
                            >
                              {getDisplayLocation(event, "short")}
                            </a>
                          </span>
                        </MinimalCardDescription>

                        <div className="px-1 pb-2 mt-auto">
                          <a
                            href={event.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full text-sm font-semibold bg-bitcoin text-black hover:bg-bitcoin/85 h-10 px-5 w-full transition-all duration-200"
                          >
                            {activeTab === "future" ? "Register Now" : "View Event"}
                          </a>
                        </div>
                      </MinimalCard>
                    </div>
                  ))}
              </div>

            {events.length > 3 && (
              <div className="flex items-center justify-center mt-8">
                <motion.div layout className="flex items-center">
                  <motion.div
                    layout
                    className="relative flex items-center justify-between overflow-hidden rounded-full bg-zinc-900/80 border border-zinc-800"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.16, duration: 0.5 }}
                  >
                    {/* Prev button */}
                    <motion.button
                      layout
                      onClick={prevSlide}
                      disabled={currentPage === 0}
                      className="h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:text-bitcoin disabled:opacity-30 disabled:hover:text-gray-400 transition-colors shrink-0"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </motion.button>

                    {/* Dot indicators */}
                    <motion.div layout className="flex items-center gap-2 px-1">
                      {Array.from({ length: totalPages }).map((_, index) => (
                        <motion.button
                          key={index}
                          layout
                          onClick={() => setCurrentPage(index)}
                          className="rounded-full transition-colors"
                          animate={{
                            width: currentPage === index ? 24 : 8,
                            height: 8,
                            backgroundColor: currentPage === index ? "var(--color-bitcoin, #f7931a)" : "rgba(113,113,122,0.5)",
                          }}
                          whileHover={{ backgroundColor: currentPage === index ? "var(--color-bitcoin, #f7931a)" : "rgba(113,113,122,0.8)" }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          aria-label={`Go to page ${index + 1}`}
                        />
                      ))}
                    </motion.div>

                    {/* Next button */}
                    <motion.button
                      layout
                      onClick={nextSlide}
                      disabled={currentPage >= totalPages - 1}
                      className="h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:text-bitcoin disabled:opacity-30 disabled:hover:text-gray-400 transition-colors shrink-0"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
