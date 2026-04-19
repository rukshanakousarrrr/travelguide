import { SearchBar } from "./SearchBar";
import { HeroFeaturedCards } from "./HeroFeaturedCards";

interface MiniTour {
  id: string;
  slug: string;
  title: string;
  location: string;
  duration: number;
  durationType: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  coverImage?: string;
}

interface Props {
  featuredTours?: MiniTour[];
}

export function HeroSection({ featuredTours = [] }: Props) {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden" id="hero-section">
      {/* Single background image — Mt. Fuji */}
      <div className="absolute inset-0">
        <img
          src="/asstes/hero-fuji.png"
          alt="Mount Fuji at dawn"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.3) 70%, rgba(12,68,124,0.75) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-36 pb-20">
        <div className="text-center mb-8">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-white max-w-4xl mx-auto leading-[1.05] tracking-tight mb-3">
            Discover Japan,{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #EF9F27 20%, #FFD580 55%, #EF9F27 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Way
            </span>
          </h1>

          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse 50+ handcrafted tours — from Tokyo street food to Kyoto tea ceremonies.
            Book instantly, cancel freely.
          </p>
        </div>

        {/* Search bar */}
        <SearchBar />

        {/* Featured tours carousel — like GetYourGuide */}
        {featuredTours.length > 0 && (
          <HeroFeaturedCards tours={featuredTours} />
        )}
      </div>

      {/* Elegant wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-10 leading-0">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-16 sm:h-20"
          style={{ fill: "#FFFFFF" }}
        >
          <path d="M0,80 C240,25 480,55 720,35 C960,15 1200,50 1440,30 L1440,80 Z" />
        </svg>
      </div>
    </section>
  );
}
