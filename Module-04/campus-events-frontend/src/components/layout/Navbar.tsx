
import Link from "next/link";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            C
          </div>

          <span className="text-xl font-bold tracking-tight">
            Campus Events
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Call to action */}
        <Link
          href="/events"
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Explore Events
        </Link>

      </nav>
    </header>
  );
}
