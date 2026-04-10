import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    icon: "🏯",
    title: "Nature & Scenery",
    description:
      "Cherry blossoms, alpine lakes, bamboo forests and coastal vistas that will leave you breathless.",
    href: "/tours?category=NATURE",
  },
  {
    icon: "⛩️",
    title: "Culture & Heritage",
    description:
      "Ancient temples, tea ceremonies, samurai history and geisha performances — Japan's soul revealed.",
    href: "/tours?category=CULTURAL",
  },
  {
    icon: "🍜",
    title: "Food & Drink",
    description:
      "From hidden ramen shops to Michelin-starred sushi counters, eat Japan like a local.",
    href: "/tours?category=FOOD_AND_DRINK",
  },
  {
    icon: "🧘",
    title: "Wellness & Slow Travel",
    description:
      "Ryokan stays, onsen soaks, forest bathing and mindful journeys through Japan's countryside.",
    href: "/tours?category=NATURE",
  },
  {
    icon: "🎌",
    title: "Adventure & Exploration",
    description:
      "Night hikes up Fuji, cycling between shrines, or surfing the wild Shikoku coast.",
    href: "/tours?category=ADVENTURE",
  },
  {
    icon: "🏙️",
    title: "City & Nightlife",
    description:
      "Tokyo's neon jungle, Osaka's vibrant dotonbori and Kyoto's lantern-lit evenings.",
    href: "/tours?category=CITY_TOUR",
  },
];

export function ExperienceSection() {
  return (
    <section className="py-24" style={{ background: "var(--color-surface)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-accent/60" />
            <span className="text-accent text-xs font-bold tracking-widest uppercase">
              Why Choose Us
            </span>
            <div className="h-px w-8 bg-accent/60" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            More Than a Trip —{" "}
            <span className="italic text-primary">It&apos;s the Experience</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            We believe travel should transform you. Every detail is curated so
            you can focus on being present.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.title}
              href={cat.href}
              className="group p-6 bg-white rounded-2xl border border-border
                         hover:border-primary/30 hover:shadow-md
                         transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl mb-4
                              group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:grayscale-0 transition-all">{cat.icon}</span>
              </div>

              {/* Text */}
              <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-4">
                {cat.description}
              </p>

              {/* Read more */}
              <div className="flex items-center gap-1.5 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200">
                Explore
                <ArrowRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
