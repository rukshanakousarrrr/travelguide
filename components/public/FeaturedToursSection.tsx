import Link from "next/link";
import { ArrowRight, Clock, Users, Star, Zap, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const TOURS = [
  {
    slug:         "tokyo-hidden-gems",
    title:        "Tokyo Hidden Gems & Street Food Discovery",
    location:     "Tokyo",
    duration:     1,
    price:        89,
    rating:       4.9,
    reviewCount:  214,
    maxGroupSize: 10,
    category:     "City Tour",
    badge:        "Best Seller",
    badgeColor:   "bg-primary text-white",
    gradient:     "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)",
    freeCancellation: true,
    instantConfirmation: true,
  },
  {
    slug:         "kyoto-temples-geisha",
    title:        "Kyoto Temples, Geisha District & Tea Ceremony",
    location:     "Kyoto",
    duration:     2,
    price:        179,
    rating:       5.0,
    reviewCount:  189,
    maxGroupSize: 8,
    category:     "Cultural",
    badge:        "Top Rated",
    badgeColor:   "bg-accent text-secondary",
    gradient:     "linear-gradient(135deg, #2d1b69 0%, #7b2d8b 40%, #c2185b 70%, #ff5722 100%)",
    freeCancellation: true,
    instantConfirmation: true,
  },
  {
    slug:         "fuji-hakone-nature",
    title:        "Mount Fuji Sunrise & Hakone Valley Explorer",
    location:     "Hakone",
    duration:     2,
    price:        219,
    rating:       4.8,
    reviewCount:  156,
    maxGroupSize: 12,
    category:     "Nature",
    badge:        null,
    badgeColor:   "",
    gradient:     "linear-gradient(135deg, #0d3b6e 0%, #1565c0 40%, #42a5f5 70%, #80deea 100%)",
    freeCancellation: true,
    instantConfirmation: true,
  },
  {
    slug:         "osaka-food-tour",
    title:        "Osaka Dotonbori Night Food & Culture Walk",
    location:     "Osaka",
    duration:     1,
    price:        69,
    rating:       4.9,
    reviewCount:  308,
    maxGroupSize: 10,
    category:     "Food & Drink",
    badge:        "Best Seller",
    badgeColor:   "bg-primary text-white",
    gradient:     "linear-gradient(135deg, #7b1f1f 0%, #c62828 45%, #e64a19 100%)",
    freeCancellation: true,
    instantConfirmation: true,
  },
  {
    slug:         "hiroshima-peace-miyajima",
    title:        "Hiroshima Peace Memorial & Miyajima Island",
    location:     "Hiroshima",
    duration:     1,
    price:        129,
    rating:       4.9,
    reviewCount:  142,
    maxGroupSize: 14,
    category:     "Cultural",
    badge:        null,
    badgeColor:   "",
    gradient:     "linear-gradient(135deg, #1b5e20 0%, #2e7d32 45%, #66bb6a 100%)",
    freeCancellation: false,
    instantConfirmation: true,
  },
  {
    slug:         "nara-deer-temples",
    title:        "Nara Sacred Deer Park, Tōdai-ji & Local Lunch",
    location:     "Nara",
    duration:     1,
    price:        99,
    rating:       4.7,
    reviewCount:  97,
    maxGroupSize: 12,
    category:     "Nature",
    badge:        "New",
    badgeColor:   "bg-success text-white",
    gradient:     "linear-gradient(135deg, #4a148c 0%, #6a1b9a 45%, #ab47bc 100%)",
    freeCancellation: true,
    instantConfirmation: false,
  },
];

export function FeaturedToursSection() {
  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
              Handpicked Experiences
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Tours travelers love
            </h2>
          </div>
          <Link
            href="/tours"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4"
          >
            See all tours
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {["All", "City Tour", "Cultural", "Nature", "Food & Drink", "Adventure", "Private"].map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/tours" : `/tours?category=${cat.toUpperCase().replace(/ & /g, "_AND_").replace(/ /g, "_")}`}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                cat === "All"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TOURS.map((tour) => (
            <Link
              key={tour.slug}
              href={`/tours/${tour.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                  style={{ background: tour.gradient }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                {tour.badge && (
                  <div className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${tour.badgeColor}`}>
                    {tour.badge}
                  </div>
                )}

                {/* Category */}
                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
                  {tour.category}
                </div>

                {/* Location + duration row */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-white text-xs font-medium">
                    <Clock className="size-3" />
                    {tour.duration} {tour.duration === 1 ? "day" : "days"}
                  </span>
                  <span className="flex items-center gap-1 text-white text-xs font-medium">
                    <Users className="size-3" />
                    Up to {tour.maxGroupSize}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {tour.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {tour.freeCancellation && (
                    <span className="flex items-center gap-1 text-xs text-success font-medium">
                      <CheckCircle2 className="size-3" />
                      Free cancellation
                    </span>
                  )}
                  {tour.instantConfirmation && (
                    <span className="flex items-center gap-1 text-xs text-info font-medium">
                      <Zap className="size-3" />
                      Instant confirmation
                    </span>
                  )}
                </div>

                {/* Rating + Price */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${i < Math.floor(tour.rating) ? "text-accent fill-accent" : "text-border fill-border"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{tour.rating}</span>
                    <span className="text-xs text-muted">({tour.reviewCount})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted">from </span>
                    <span className="text-primary font-bold text-base">
                      {formatPrice(tour.price, "USD")}
                    </span>
                    <span className="text-xs text-muted"> / person</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            href="/tours"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-primary text-primary font-medium text-sm hover:bg-primary hover:text-white transition-colors"
          >
            See all tours
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
