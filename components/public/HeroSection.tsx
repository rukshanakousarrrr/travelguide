import { SearchBar } from "./SearchBar";
import { Star, Users, MapPin, Shield } from "lucide-react";

const STATS = [
  { icon: MapPin,  value: "20+",    label: "Destinations"    },
  { icon: Users,   value: "2,000+", label: "Happy Travelers" },
  { icon: Star,    value: "4.9",    label: "Average Rating"  },
  { icon: Shield,  value: "100%",   label: "Secure Booking"  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0b1d35 0%, #0e2440 25%, #162e4a 50%, #1a2e3d 75%, #0d1b2a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background: "radial-gradient(ellipse 100% 60% at 50% 100%, #C41230 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
        <div className="text-center mb-10">
          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs font-semibold tracking-widest uppercase">
              Trusted by 2,000+ Travelers
            </span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white max-w-3xl mx-auto leading-[1.05] tracking-tight mb-4">
            Discover Japan,{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #C8A84B 20%, #e8c97a 55%, #C8A84B 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Way
            </span>
          </h1>
          <p className="text-white/65 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse 50+ handcrafted tours — from Tokyo street food to Kyoto tea ceremonies.
            Book instantly, cancel freely.
          </p>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 mt-14">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                <Icon className="size-4 text-accent" />
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-base leading-none">{value}</div>
                <div className="text-white/45 text-xs mt-0.5">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute bottom-0 left-0 right-0 leading-0">
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-14"
          style={{ fill: "#FFFFFF" }}
        >
          <path d="M0,56 C360,10 720,40 1080,16 C1260,4 1380,30 1440,20 L1440,56 Z" />
        </svg>
      </div>
    </section>
  );
}
