import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";

const PERKS = [
  "Expert local guides born & raised in Japan",
  "Small groups — max 12 people for intimacy",
  "Free cancellation up to 24 hours before",
  "Offline maps & itinerary app included",
  "Instant booking confirmation",
  "24/7 support before & during your trip",
];

export function WhyUsSection() {
  return (
    <section className="py-24 bg-secondary overflow-hidden relative">
      {/* Decorative circle */}
      <div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C41230 0%, transparent 70%)" }}
      />
      <div
        className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #C8A84B 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-accent/50" />
              <span className="text-accent text-xs font-bold tracking-widest uppercase">
                Our Promise
              </span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Travel Japan with{" "}
              <span className="text-accent italic">Confidence</span>
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              We handle every detail — from airport logistics to dinner reservations.
              All you need to do is show up and be amazed.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <CheckCircle2 className="size-5 text-accent shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm leading-snug">{perk}</span>
                </li>
              ))}
            </ul>

            <Link href="/tours">
              <Button
                size="lg"
                className="bg-accent text-secondary hover:bg-accent/90 font-semibold gap-2 shadow-lg"
              >
                Start Planning
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>

          {/* Right: testimonial card */}
          <div className="relative">
            {/* Decorative card behind */}
            <div className="absolute inset-0 rounded-3xl bg-white/5 border border-white/10 translate-x-4 translate-y-4" />

            {/* Main card */}
            <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-accent text-xl">★</span>
                ))}
              </div>

              <blockquote className="text-white text-lg leading-relaxed italic mb-6">
                &ldquo;I&apos;ve traveled to Japan twice before but this tour opened my eyes
                to things I never would have found on my own. The guide&apos;s knowledge
                of local history was incredible. I&apos;ll be back next year.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-lg">
                  S
                </div>
                <div>
                  <div className="text-white font-semibold">Sarah Mitchell</div>
                  <div className="text-white/50 text-sm">Tokyo Hidden Gems Tour · March 2025</div>
                </div>
              </div>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/15">
                {[
                  { label: "Tours Completed", value: "200+" },
                  { label: "5★ Reviews",       value: "1,800+" },
                  { label: "Repeat Guests",    value: "60%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex-1 min-w-24 text-center px-4 py-3 rounded-xl bg-white/10 border border-white/10"
                  >
                    <div className="text-white font-bold text-xl">{stat.value}</div>
                    <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
