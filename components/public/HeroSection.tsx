import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, MapPin, Award } from "lucide-react";
import { COMPANY_NAME } from "@/lib/constants";

const stats = [
  { icon: MapPin,  value: "20+",  label: "Destinations"    },
  { icon: Users,   value: "2k+",  label: "Happy Travelers" },
  { icon: Star,    value: "4.9",  label: "Average Rating"  },
  { icon: Award,   value: "8+",   label: "Years of Craft"  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col">
      {/* ── Background ── */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep Japan-landscape gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0b1d35 0%, #0e2440 25%, #162e4a 50%, #1a2e3d 75%, #0d1b2a 100%)",
          }}
        />
        {/* Mountain silhouette layer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(ellipse 120% 60% at 50% 110%, #C41230 0%, transparent 60%)`,
          }}
        />
        {/* Subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.4) 100%)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 pt-32 pb-20">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-accent text-xs font-semibold tracking-widest uppercase">
            Curated Japan Experiences
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white max-w-4xl leading-[1.05] tracking-tight mb-6">
          Curated Journeys for{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #C8A84B 30%, #e8c97a 60%, #C8A84B 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Modern Explorers
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-white/70 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Immerse yourself in Japan's hidden wonders — from ancient temples to
          neon-lit street food alleys, crafted by local experts who know every
          detail.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <Link href="/tours">
            <Button
              size="lg"
              className="min-w-44 bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 gap-2"
            >
              Explore Tours
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="min-w-44 border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            >
              Our Story
            </Button>
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shrink-0">
                <stat.icon className="size-4 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg leading-none">{stat.value}</div>
                <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="relative flex justify-center pb-8">
        <div className="flex flex-col items-center gap-1 text-white/40">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-14"
          style={{ fill: "#FFFFFF" }}
        >
          <path d="M0,60 C240,20 480,0 720,20 C960,40 1200,60 1440,40 L1440,60 Z" />
        </svg>
      </div>
    </section>
  );
}
