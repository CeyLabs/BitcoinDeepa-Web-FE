"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

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

export default function Events() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://ceylabs.io/api/luma-events/?uuid=${
            process.env.NEXT_PUBLIC_UUID || ""
          }`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();

        const transformed = data.events
          .filter(
            (item: any) =>
              item.event.user_api_id === process.env.NEXT_PUBLIC_LUMA_USER_ID
          ) // Only your events
          .map((item: any) => {
            const e = item.event;
            return {
              id: e.api_id,
              title: e.name,
              start_time: e.start_at,
              end_time: e.end_at,
              location: item.calendar.geo_city || "N/A",
              location_type: e.location_type,
              url: `https://lu.ma/${e.url}`,
              image_url: e.cover_url,
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

  // Simple date formatter
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Simple time formatter
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="events-section">
      <h2>Upcoming Meetups</h2>

      {loading ? (
        <div className="loading">Loading events...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-content">
                <h3>{event.title}</h3>
                <div className="event-details">
                  <div className="event-date">
                    <FaCalendarAlt />
                    <span>
                      {formatDate(event.start_time)} •{" "}
                      {/* {formatTime(event.start_time)} */}
                      {event.start_time}
                    </span>
                  </div>
                  <div className="event-location">
                    <FaMapMarkerAlt />
                    <span>{event.location}</span>
                  </div>
                </div>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  Register
                </a>
              </div>
              {event.image_url && (
                <div className="event-image">
                  <img src={event.image_url} alt={event.title} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .events-section {
          padding: 2rem 0;
          color: white;
          max-width: 1000px;
          margin: 0 auto;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .loading,
        .error {
          text-align: center;
          padding: 2rem;
          color: #aaa;
        }

        .error {
          color: #ff6b6b;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-card {
          display: flex;
          background-color: #111;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #333;
        }

        .event-content {
          padding: 1.5rem;
          flex: 1;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.25rem;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .event-date,
        .event-location {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #aaa;
          font-size: 0.9rem;
        }

        .event-link {
          display: inline-block;
          background-color: #3b82f6;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .event-image {
          width: 120px;
          flex-shrink: 0;
        }

        .event-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (max-width: 600px) {
          .event-card {
            flex-direction: column;
          }

          .event-image {
            width: 100%;
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
}
