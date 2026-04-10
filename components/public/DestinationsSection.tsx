import Link from "next/link";
import { MapPin } from "lucide-react";

const DESTINATIONS = [
  {
    name: "Tokyo",
    tagline: "Neon cities & ramen alleys",
    tours: 18,
    gradient: "linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    name: "Kyoto",
    tagline: "Temples, geisha & tea",
    tours: 14,
    gradient: "linear-gradient(160deg, #2d1b69 0%, #7b2d8b 60%, #c2185b 100%)",
  },
  {
    name: "Osaka",
    tagline: "Street food capital of Japan",
    tours: 11,
    gradient: "linear-gradient(160deg, #7b1f1f 0%, #c62828 60%, #e64a19 100%)",
  },
  {
    name: "Mt. Fuji",
    tagline: "Sunrise hikes & alpine views",
    tours: 8,
    gradient: "linear-gradient(160deg, #0d3b6e 0%, #1565c0 55%, #42a5f5 100%)",
  },
  {
    name: "Hiroshima",
    tagline: "History, peace & Miyajima",
    tours: 6,
    gradient: "linear-gradient(160deg, #1b5e20 0%, #2e7d32 55%, #66bb6a 100%)",
  },
  {
    name: "Nara",
    tagline: "Sacred deer & ancient shrines",
    tours: 5,
    gradient: "linear-gradient(160deg, #4a148c 0%, #6a1b9a 55%, #ab47bc 100%)",
  },
];

export function DestinationsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
              Popular Destinations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Where do you want to go?
            </h2>
          </div>
          <Link
            href="/tours"
            className="hidden sm:block text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            View all →
          </Link>
        </div>

        {/* Grid: 3 big + 3 small */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.name}
              href={`/tours?q=${dest.name}`}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                i < 3 ? "col-span-1 lg:col-span-2 h-56" : "col-span-1 lg:col-span-2 h-40"
              }`}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ background: dest.gradient }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-4">
                <div className="flex items-center gap-1.5 text-white/70 text-xs mb-1">
                  <MapPin className="size-3" />
                  <span>{dest.tours} tours</span>
                </div>
                <h3 className="font-display font-bold text-white text-xl leading-tight">
                  {dest.name}
                </h3>
                <p className="text-white/70 text-xs mt-0.5">{dest.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
