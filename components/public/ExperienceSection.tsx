import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

const CATEGORIES = [
  {
    emoji: "⛩️",
    title: "Culture & Heritage",
    description: "Ancient traditions & living history",
    count: 22,
    href: "/tours?category=CULTURAL",
    accent: "#185FA5",
    bgLight: "#E6F1FB",
  },
  {
    emoji: "🍜",
    title: "Food & Drink",
    description: "Savor authentic Japanese cuisine",
    count: 16,
    href: "/tours?category=FOOD_AND_DRINK",
    accent: "#EF9F27",
    bgLight: "#FDF3E2",
  },
  {
    emoji: "🗻",
    title: "Nature & Scenery",
    description: "Mountains, gardens & coastlines",
    count: 14,
    href: "/tours?category=NATURE",
    accent: "#15803D",
    bgLight: "#DCFCE7",
  },
  {
    emoji: "🎌",
    title: "Adventure",
    description: "Thrilling outdoor experiences",
    count: 9,
    href: "/tours?category=ADVENTURE",
    accent: "#DC2626",
    bgLight: "#FEE2E2",
  },
  {
    emoji: "🏙️",
    title: "City Tours",
    description: "Urban exploration & hidden gems",
    count: 11,
    href: "/tours?category=CITY_TOUR",
    accent: "#0C447C",
    bgLight: "#DBEAFE",
  },
  {
    emoji: "🚆",
    title: "Multi-Day",
    description: "Immersive multi-day journeys",
    count: 7,
    href: "/tours?category=MULTI_DAY",
    accent: "#B45309",
    bgLight: "#FEF3C7",
  },
];

export function ExperienceSection() {
  return (
    <section className="py-20 bg-white" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Compass className="size-4 text-[#EF9F27]" />
              <span className="text-[#185FA5] text-xs font-bold tracking-widest uppercase">
                Browse by Category
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
              What kind of experience?
            </h2>
          </div>
          <Link
            href="/tours"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-[#185FA5] hover:text-[#0C447C] transition-colors"
          >
            All categories
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group flex flex-col items-center text-center p-6 rounded-2xl bg-[#F8F9FF] hover:bg-white hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: cat.bgLight }}
              >
                {cat.emoji}
              </div>
              <h3
                className="font-semibold text-sm text-[#111] leading-tight mb-1.5 transition-colors duration-200"
                style={{ color: undefined }}
              >
                <span className="group-hover:text-[#185FA5] transition-colors">{cat.title}</span>
              </h3>
              <p className="text-[11px] text-[#7A746D] leading-snug mb-2 hidden sm:block">{cat.description}</p>
              <span
                className="text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
                style={{ backgroundColor: cat.bgLight, color: cat.accent }}
              >
                {cat.count} tours
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
