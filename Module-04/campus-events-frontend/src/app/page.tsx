import { featuredEvents } from "@/data/events";



export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        {/* Intro content */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <span className="mb-6 inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-primary">
            Your campus, your community
          </span>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Discover events.
            <span className="block text-primary">
              Connect with your campus.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
            Find workshops, conferences, student activities, and experiences
            happening around your campus. Never miss something worth attending.
          </p>

          {/* Search area - UI only for now */}
          <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Search campus events..."
              className="min-w-0 flex-1 rounded-xl border border-border bg-white px-5 py-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-indigo-100"
            />

            <button className="rounded-xl bg-primary px-7 py-4 font-semibold text-primary-foreground transition hover:bg-indigo-700">
              Search Events
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
<section className="mx-auto max-w-7xl px-6 py-16">
  {/* Section heading */}
  <div className="mb-10 flex items-end justify-between">
    <div>
      <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
        Don't miss out
      </p>

      <h2 className="text-3xl font-bold tracking-tight">
        Featured Events
      </h2>

      <p className="mt-3 text-muted">
        Discover what's happening in your campus community.
      </p>
    </div>

    <a
      href="/events"
      className="hidden text-sm font-semibold text-primary hover:underline sm:block"
    >
      View all events →
    </a>
  </div>

  {/* Event cards */}
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {featuredEvents.map((event) => (
      <article
        key={event.id}
        className="overflow-hidden rounded-2xl border border-border bg-white transition hover:-translate-y-1 hover:shadow-lg"
      >
        {/* Event visual placeholder */}
        <div className="flex h-44 items-center justify-center bg-indigo-50">
          <span className="text-lg font-semibold text-primary">
            {event.category}
          </span>
        </div>

        {/* Event information */}
        <div className="p-6">
          <p className="text-sm font-medium text-primary">
            {event.date}
          </p>

          <h3 className="mt-3 text-xl font-bold">
            {event.title}
          </h3>

          <p className="mt-3 text-sm leading-6 text-muted">
            {event.description}
          </p>

          <p className="mt-5 text-sm font-medium text-foreground">
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
</section>
    </main>
  );
}