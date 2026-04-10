import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    emoji: "⛩️",
    title: "Culture & Heritage",
    count: 22,
    href: "/tours?category=CULTURAL",
    color: "bg-primary-light",
    hoverBorder: "hover:border-primary/30",
  },
  {
    emoji: "🍜",
    title: "Food & Drink",
    count: 16,
    href: "/tours?category=FOOD_AND_DRINK",
    color: "bg-accent-light",
    hoverBorder: "hover:border-accent/30",
  },
  {
    emoji: "🏯",
    title: "Nature & Scenery",
    count: 14,
    href: "/tours?category=NATURE",
    color: "bg-success-light",
    hoverBorder: "hover:border-success/30",
  },
  {
    emoji: "🎌",
    title: "Adventure",
    count: 9,
    href: "/tours?category=ADVENTURE",
    color: "bg-info-light",
    hoverBorder: "hover:border-info/30",
  },
  {
    emoji: "🏙️",
    title: "City Tours",
    count: 11,
    href: "/tours?category=CITY_TOUR",
    color: "bg-surface-2",
    hoverBorder: "hover:border-border-dark",
  },
  {
    emoji: "🧘",
    title: "Multi-Day",
    count: 7,
    href: "/tours?category=MULTI_DAY",
    color: "bg-warning-light",
    hoverBorder: "hover:border-warning/30",
  },
];

export function ExperienceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
              Browse by Category
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              What kind of trip?
            </h2>
          </div>
          <Link
            href="/tours"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            All categories
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group flex flex-col items-center text-center p-5 rounded-2xl border border-border ${cat.hoverBorder} hover:shadow-sm transition-all duration-200`}
            >
              <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                {cat.emoji}
              </div>
              <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight mb-1">
                {cat.title}
              </h3>
              <span className="text-xs text-muted">{cat.count} tours</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
