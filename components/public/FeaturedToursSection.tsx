import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TourCard } from "./TourCard";
import { Button } from "@/components/ui/button";

// Placeholder tours — replace with real DB data once set up
const FEATURED_TOURS = [
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
    featured:     true,
    gradient:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 70%, #533483 100%)",
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
    featured:     false,
    gradient:
      "linear-gradient(135deg, #2d1b69 0%, #7b2d8b 40%, #c2185b 70%, #ff5722 100%)",
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
    featured:     false,
    gradient:
      "linear-gradient(135deg, #0d3b6e 0%, #1565c0 40%, #42a5f5 70%, #80deea 100%)",
  },
];

export function FeaturedToursSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary/40" />
            <span className="text-primary text-xs font-bold tracking-widest uppercase">
              Featured Tours
            </span>
            <div className="h-px w-8 bg-primary/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Journeys Our Travelers Love
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Each itinerary is handcrafted by our local experts — no generic
            routes, just unforgettable experiences.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURED_TOURS.map((tour) => (
            <TourCard key={tour.slug} {...tour} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/tours">
            <Button variant="outline" size="lg" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
              View All Tours
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
