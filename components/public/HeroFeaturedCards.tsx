"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Star, ChevronRight } from "lucide-react";

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
  tours: MiniTour[];
}

export function HeroFeaturedCards({ tours }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  }

  if (tours.length === 0) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

  return (
    <div className="mt-10 relative" id="hero-featured">
      <p className="text-white/80 text-sm font-semibold text-center mb-4 tracking-wide">
        Continue planning your trip
      </p>

      <div className="relative group/cards">
        {/* Right scroll arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white shadow-lg flex items-center justify-center text-[#111] hover:bg-[#F8F7F5] transition-all opacity-0 group-hover/cards:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="size-4" />
          </button>
        )}

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="flex-shrink-0 w-[300px] sm:w-[320px] snap-start group"
            >
              <div className="flex bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] transition-shadow h-[100px]">
                {/* Thumbnail — fixed square with proper image handling */}
                <div className="w-[100px] h-[100px] shrink-0 overflow-hidden relative">
                  {tour.coverImage ? (
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl"
                      style={{ background: "linear-gradient(135deg, #0C447C 0%, #185FA5 60%, #2980D4 100%)" }}
                    >
                      <span className="opacity-40">🗻</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                  <div>
                    <p className="text-[13px] font-bold text-[#191C20] leading-snug line-clamp-2 group-hover:text-[#185FA5] transition-colors">
                      {tour.title}
                    </p>
                    <p className="text-[11px] text-[#7A746D] mt-1">
                      {tour.duration} {tour.durationType} · {tour.location}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 ${
                              i < Math.floor(tour.rating)
                                ? "text-[#EF9F27] fill-[#EF9F27]"
                                : "text-[#E4E0D9] fill-[#E4E0D9]"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-[#7A746D]">({tour.reviewCount})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#A8A29E]">from </span>
                      <span className="text-sm font-bold text-[#185FA5]">{formatPrice(tour.basePrice)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
