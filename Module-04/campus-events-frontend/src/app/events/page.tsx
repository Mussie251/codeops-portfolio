"use client";

import { useState } from "react";
import { featuredEvents } from "@/data/events";

export default function EventsPage() { 
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEvents = featuredEvents.filter((event) =>
  `${event.title} ${event.category} ${event.location}`
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
);
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-16">
      {/* Page heading */}
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Explore
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          All Campus Events
        </h1>

        <p className="mt-4 text-muted">
          Discover workshops, conferences, and activities happening on campus.
        </p>
      </div>
      {/* Search Events */}
      <div className="mb-8">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search by event, category, or location..."
          className="w-full rounded-xl border border-border bg-white px-5 py-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Event count */}
      <p className="mb-6 text-sm text-muted">
        Showing {filteredEvents.length} events
      </p>

      {/* Event grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => ( 
          <article
            key={event.id}
            className="overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-44 items-center justify-center bg-indigo-50">
              <span className="text-lg font-semibold text-primary">
                {event.category}
              </span>
            </div>

            <div className="p-6">
              <p className="text-sm font-medium text-primary">
                {event.date}
              </p>

              <h2 className="mt-3 text-xl font-bold">
                {event.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted">
                {event.description}
              </p>

              <p className="mt-5 text-sm font-medium">
                📍 {event.location}
              </p>

              <a
                href={`/events/${event.id}`}
                className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
              >
                View details →
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}