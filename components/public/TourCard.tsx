import Link from "next/link";
import { MapPin, Clock, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface TourCardProps {
  slug:           string;
  title:          string;
  location:       string;
  duration:       number;          // days
  price:          number;
  currency?:      string;
  rating?:        number;
  reviewCount?:   number;
  maxGroupSize?:  number;
  category:       string;
  gradient:       string;          // CSS gradient string for placeholder image
  featured?:      boolean;
}

export function TourCard({
  slug,
  title,
  location,
  duration,
  price,
  currency    = "USD",
  rating      = 5,
  reviewCount = 0,
  maxGroupSize,
  category,
  gradient,
  featured,
}: TourCardProps) {
  return (
    <Link
      href={`/tours/${slug}`}
      className="group block rounded-2xl overflow-hidden bg-background border border-border
                 shadow-(--shadow-card) hover:shadow-lg hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* Image area */}
      <div className="relative h-56 overflow-hidden">
        {/* Gradient placeholder (replace with next/image when real photos are added) */}
        <div
          className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
          style={{ background: gradient }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="accent" className="text-xs font-semibold tracking-wide">
            {category}
          </Badge>
        </div>

        {/* Featured ribbon */}
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="primary" className="text-xs">
              <Star className="size-3 fill-current" />
              Featured
            </Badge>
          </div>
        )}

        {/* Location on image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm font-medium">
          <MapPin className="size-3.5 shrink-0" />
          <span>{location}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-muted mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            <span>{duration} {duration === 1 ? "day" : "days"}</span>
          </div>
          {maxGroupSize && (
            <div className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              <span>Up to {maxGroupSize}</span>
            </div>
          )}
        </div>

        {/* Rating + Price row */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* Stars */}
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`size-3.5 ${
                    i < Math.floor(rating)
                      ? "text-accent fill-accent"
                      : "text-border fill-border"
                  }`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-muted">({reviewCount})</span>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-xs text-muted block">from</span>
            <span className="text-primary font-bold text-lg leading-tight">
              {formatPrice(price, currency)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
