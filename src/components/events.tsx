"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Clock, Navigation } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "./ui/button";

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

type Tab = "future" | "past";

const LUMA_CALENDAR = "https://lu.ma/bitcoindeepa";
const TZ = "Asia/Colombo";

// The card row starts in line with the page content and bleeds off the right
// edge. Matches the heading container (max-w-7xl with lg:px-8).
const ROW_INSET = "max(1rem, calc((100vw - 80rem) / 2 + 2rem))";

/** Map the events API payload (Luma event + calendar) to the fields we render. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toEvents(data: any): EventData[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data || []).map((item: any) => {
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
}

/** Upcoming: soonest first. Past: most recent first. */
function sortEvents(events: EventData[], tab: Tab): EventData[] {
  const dir = tab === "future" ? 1 : -1;
  return [...events].sort(
    (a, b) => dir * (new Date(a.start_time).getTime() - new Date(b.start_time).getTime()),
  );
}

function shortLocation(event: EventData) {
  if (event.location_type === "ONLINE") return "Online";
  const city = event.geo_address_info?.city;
  if (city) return city;
  return event.location && event.location !== "N/A" ? event.location : "Location TBA";
}

const dateFmt = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: TZ });
const dateYearFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: TZ });
const yearFmt = new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: TZ });

/** "Fri, Nov 20" this year; "Aug 31, 2024" for other years. */
function formatEventDate(d: Date) {
  return yearFmt.format(d) === yearFmt.format(new Date()) ? dateFmt.format(d) : dateYearFmt.format(d);
}

const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: TZ });

function EventCard({ event }: { event: EventData }) {
  const start = new Date(event.start_time);
  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-[78vw] max-w-[400px] shrink-0 snap-start outline-none sm:w-[360px] lg:w-[400px]"
    >
      <div className="relative aspect-square overflow-hidden rounded-xl bg-zinc-900 ring-bitcoin transition-shadow group-focus-visible:ring-2">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 360px, 78vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Image src="/assets/brand/kit/04-Yaka-Symbol/Yaka.svg" alt="" width={120} height={148} />
          </div>
        )}
        <span className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-lg bg-bitcoin text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <h3 className="mt-4 line-clamp-2 text-xl leading-snug font-medium text-white transition-colors group-hover:text-bitcoin">
        {event.title}
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-2.5 text-sm text-zinc-300">
          <CalendarDays className="size-4 text-zinc-400" />
          <time dateTime={event.start_time}>{formatEventDate(start)}</time>
        </span>
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-2.5 text-sm text-zinc-300">
          <Clock className="size-4 text-zinc-400" />
          {timeFmt.format(start)}
        </span>
        <span className="flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 px-2.5 text-sm text-zinc-300">
          <Navigation className="size-4 text-zinc-400" />
          {shortLocation(event)}
        </span>
      </div>
    </a>
  );
}

function CardSkeleton() {
  return (
    <div className="w-[78vw] max-w-[400px] shrink-0 sm:w-[360px] lg:w-[400px]" aria-hidden>
      <div className="aspect-square animate-pulse rounded-xl bg-zinc-900" />
      <div className="mt-4 h-6 w-3/4 animate-pulse rounded-md bg-zinc-900" />
      <div className="mt-3 flex gap-2">
        <div className="h-8 w-28 animate-pulse rounded-md bg-zinc-900" />
        <div className="h-8 w-20 animate-pulse rounded-md bg-zinc-900" />
      </div>
    </div>
  );
}

export default function EventsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("future");
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const autoSwitched = useRef(false);
  const [noUpcoming, setNoUpcoming] = useState(false);

  useEffect(() => {
    // A newer tab's request supersedes this one: abort it so a slow response
    // can't overwrite the list for the tab that's now selected.
    const controller = new AbortController();
    let switching = false;
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
            signal: controller.signal,
          }
        );

        if (!response.ok) throw new Error("Failed to fetch events");

        const transformed = sortEvents(toEvents(await response.json()), activeTab);
        if (controller.signal.aborted) return;

        // Nothing scheduled yet: on the first load, show recent meetups
        // instead of an empty state (the visitor can still switch back).
        if (activeTab === "future" && transformed.length === 0 && !autoSwitched.current) {
          autoSwitched.current = true;
          switching = true; // keep the skeleton up while past events load
          setNoUpcoming(true);
          setActiveTab("past");
          return;
        }

        setEvents(transformed);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Error fetching events:", err);
        setError("Unable to load events at this time");
      } finally {
        if (!switching && !controller.signal.aborted) setLoading(false);
      }
    }

    fetchEvents();
    return () => controller.abort();
  }, [activeTab]);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateArrows();
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => ro.disconnect();
  }, [events, loading, updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    const card = el?.querySelector<HTMLElement>("a, [aria-hidden]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const iconBtn =
    "hidden size-11 items-center justify-center rounded-xl border-[1.5px] border-zinc-700 sm:flex text-white transition-colors hover:border-bitcoin hover:text-bitcoin disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="events" aria-labelledby="events-title" className="relative overflow-clip py-20 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <h2
          id="events-title"
          className="type-h2"
        >
          <span className="block text-white">Meet the community IRL.</span>
          <span className="block text-zinc-500">Learn Bitcoin together.</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <div role="tablist" aria-label="Events" className="flex rounded-xl bg-zinc-900 p-1">
            {(
              [
                ["future", "Upcoming"],
                ["past", "Past"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={activeTab === value}
                onClick={() => setActiveTab(value)}
                className={cn(
                  "h-9 rounded-lg px-4 text-sm font-medium transition-colors",
                  activeTab === value ? "bg-bitcoin text-black" : "text-zinc-400 hover:text-white",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <Button asChild variant="secondary">
            <a href={LUMA_CALENDAR} target="_blank" rel="noopener noreferrer">
              View all
            </a>
          </Button>
          <button type="button" aria-label="Previous events" onClick={() => scrollByCard(-1)} disabled={!canPrev} className={iconBtn}>
            <ArrowLeft className="size-5" />
          </button>
          <button type="button" aria-label="Next events" onClick={() => scrollByCard(1)} disabled={!canNext} className={iconBtn}>
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-12">
        {noUpcoming && activeTab === "past" && !error && (
          <p className="mx-auto mb-6 max-w-7xl px-4 text-zinc-400 sm:px-6 lg:px-8">
            No upcoming meetups right now, so here are our latest ones.{" "}
            <a
              href={LUMA_CALENDAR}
              target="_blank"
              rel="noopener noreferrer"
              className="text-bitcoin underline decoration-bitcoin/40 underline-offset-4 hover:decoration-bitcoin"
            >
              Follow the calendar
            </a>{" "}
            to hear about the next one.
          </p>
        )}
        {error || (!loading && events.length === 0) ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-start gap-4 rounded-xl bg-zinc-900 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xl font-medium text-white">
                  {error
                    ? "We couldn't load events right now."
                    : activeTab === "future"
                      ? "No upcoming events right now."
                      : "No past events yet."}
                </h3>
                <p className="mt-1 text-zinc-400">
                  {activeTab === "future"
                    ? "New meetups are announced on our Luma calendar first."
                    : "See every past meetup on our Luma calendar."}
                </p>
              </div>
              <Button asChild>
                <a href={LUMA_CALENDAR} target="_blank" rel="noopener noreferrer">
                  Open the calendar
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <div
            ref={trackRef}
            onScroll={updateArrows}
            aria-busy={loading}
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
            style={{ paddingInline: ROW_INSET, scrollPaddingInline: ROW_INSET }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
              : events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
        )}
      </div>
    </section>
  );
}
