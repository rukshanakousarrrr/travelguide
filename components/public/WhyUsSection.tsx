import { ShieldCheck, RefreshCcw, Headphones, CreditCard, MapPin, Award, Star, Quote } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Protected by Stripe — the world's leading payment platform.",
    accent: "#185FA5",
    bgLight: "#E6F1FB",
  },
  {
    icon: RefreshCcw,
    title: "Free Cancellation",
    description: "Cancel up to 24h before for a full refund. No questions asked.",
    accent: "#15803D",
    bgLight: "#DCFCE7",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Live chat or email — before, during, and after your trip.",
    accent: "#0C447C",
    bgLight: "#DBEAFE",
  },
  {
    icon: CreditCard,
    title: "No Hidden Fees",
    description: "The price you see is the price you pay. Everything included.",
    accent: "#EF9F27",
    bgLight: "#FDF3E2",
  },
  {
    icon: MapPin,
    title: "Local Experts",
    description: "Every guide is born and raised in Japan — real insider knowledge.",
    accent: "#DC2626",
    bgLight: "#FEE2E2",
  },
  {
    icon: Award,
    title: "Vetted Quality",
    description: "All tours are personally reviewed. Only the best 5% make the cut.",
    accent: "#7B1FA2",
    bgLight: "#F3E5F5",
  },
];

const REVIEWS = [
  {
    name: "Sarah M.",
    country: "🇺🇸 USA",
    tour: "Tokyo Hidden Gems",
    rating: 5,
    text: "Absolutely incredible. Our guide knew every hidden alley in Shinjuku — found spots I'd never have discovered alone. Already planning my next trip!",
    initial: "S",
    gradient: "linear-gradient(135deg, #185FA5 0%, #0C447C 100%)",
  },
  {
    name: "Tom K.",
    country: "🇬🇧 UK",
    tour: "Kyoto Temples & Tea",
    rating: 5,
    text: "The tea ceremony was the highlight of our Japan trip. The guide's passion for local history made every temple come alive. Worth every penny.",
    initial: "T",
    gradient: "linear-gradient(135deg, #EF9F27 0%, #B45309 100%)",
  },
  {
    name: "Yuki R.",
    country: "🇦🇺 Australia",
    tour: "Mt. Fuji Sunrise",
    rating: 5,
    text: "Watching the sunrise over Fuji was a bucket-list moment. The small group size made it so personal. No rushing, no crowds — just pure Japan.",
    initial: "Y",
    gradient: "linear-gradient(135deg, #15803D 0%, #166534 100%)",
  },
];

export function WhyUsSection() {
  return (
    <>
      {/* ── Trust Badges ── */}
      <section className="py-20 bg-[#F8F9FF]" id="trust-badges">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <ShieldCheck className="size-4 text-[#185FA5]" />
              <span className="text-[#185FA5] text-xs font-bold tracking-widest uppercase">
                Why Book With Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
              Your journey, stress-free
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, description, accent, bgLight }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-6 bg-white rounded-2xl hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: bgLight }}
                >
                  <Icon className="size-6" style={{ color: accent }} />
                </div>
                <h3 className="font-semibold text-sm text-[#111] mb-2 leading-tight">{title}</h3>
                <p className="text-xs text-[#7A746D] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 bg-white" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Quote className="size-4 text-[#EF9F27]" />
                <span className="text-[#185FA5] text-xs font-bold tracking-widest uppercase">
                  Traveler Reviews
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#111]">
                Real stories from real travelers
              </h2>
            </div>

            {/* Aggregate score */}
            <div className="hidden sm:flex flex-col items-center bg-[#F8F9FF] rounded-2xl px-8 py-5">
              <span className="font-display font-bold text-5xl text-[#185FA5] leading-none">4.9</span>
              <div className="flex gap-0.5 my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 text-[#EF9F27] fill-[#EF9F27]" />
                ))}
              </div>
              <span className="text-xs text-[#7A746D] font-medium">1,800+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="relative bg-[#F8F9FF] rounded-2xl p-7 hover:shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-all duration-300 group"
              >
                {/* Quote mark */}
                <div className="absolute top-5 right-6 text-[#185FA5]/8 text-6xl font-display leading-none select-none">
                  &ldquo;
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-4 text-[#EF9F27] fill-[#EF9F27]" />
                  ))}
                </div>

                <p className="text-[#111] text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-[#E4E0D9]/50">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm"
                    style={{ background: r.gradient }}
                  >
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#111]">{r.name}</div>
                    <div className="text-xs text-[#7A746D]">{r.country} · {r.tour}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
