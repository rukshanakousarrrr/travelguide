import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const DESTINATIONS = [
  {
    name: "Tokyo",
    tagline: "Neon-lit streets & vibrant culture",
    tours: 18,
    gradient: "linear-gradient(160deg, #0e1c36 0%, #142d52 50%, #1a3a6a 100%)",
    emoji: "🗼",
  },
  {
    name: "Kyoto",
    tagline: "Temples, geisha & tea ceremonies",
    tours: 14,
    gradient: "linear-gradient(160deg, #3d1a6d 0%, #7b2d8b 55%, #b82da0 100%)",
    emoji: "⛩️",
  },
  {
    name: "Osaka",
    tagline: "Street food capital of Japan",
    tours: 11,
    gradient: "linear-gradient(160deg, #8b2c1f 0%, #c62828 55%, #e65100 100%)",
    emoji: "🍜",
  },
  {
    name: "Mt. Fuji",
    tagline: "Sunrise hikes & alpine serenity",
    tours: 8,
    gradient: "linear-gradient(160deg, #0d3b6e 0%, #1565c0 55%, #42a5f5 100%)",
    emoji: "🗻",
  },
  {
    name: "Hiroshima",
    tagline: "History, peace & Miyajima island",
    tours: 6,
    gradient: "linear-gradient(160deg, #1b5e20 0%, #2e7d32 55%, #4caf50 100%)",
    emoji: "🕊️",
  },
  {
    name: "Nara",
    tagline: "Sacred deer & ancient shrines",
    tours: 5,
    gradient: "linear-gradient(160deg, #4a148c 0%, #7b1fa2 55%, #ab47bc 100%)",
    emoji: "🦌",
  },
];

export function DestinationsSection() {
  return (
    <section className="py-20 bg-[#F8F9FF]" id="destinations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="size-4 text-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-bold tracking-widest uppercase">
                Popular Destinations
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
              Where do you want to go?
            </h2>
          </div>
          <Link
            href="/tours"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#185FA5] hover:text-[#0C447C] transition-colors"
          >
            View all destinations
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-5">
          {DESTINATIONS.map((dest, i) => (
            <Link
              key={dest.name}
              href={`/tours?q=${dest.name}`}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                i < 3 ? "h-64 sm:h-72" : "h-48 sm:h-56"
              }`}
            >
              {/* Gradient background */}
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                style={{ background: dest.gradient }}
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Emoji accent */}
              <div className="absolute top-4 right-4 text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300">
                {dest.emoji}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium mb-2">
                  <MapPin className="size-3" />
                  <span>{dest.tours} tours available</span>
                </div>
                <h3 className="font-display font-bold text-white text-2xl sm:text-3xl leading-tight mb-1">
                  {dest.name}
                </h3>
                <p className="text-white/60 text-sm max-w-[200px]">{dest.tagline}</p>
                
                {/* Hover arrow */}
                <div className="flex items-center gap-1.5 mt-3 text-white/0 group-hover:text-white/80 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-semibold">Explore</span>
                  <ArrowRight className="size-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
