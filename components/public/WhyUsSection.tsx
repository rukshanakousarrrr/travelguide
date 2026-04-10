import { ShieldCheck, RefreshCcw, Headphones, CreditCard, MapPin, Award } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Your payment is protected by Stripe — the world's leading payment platform.",
  },
  {
    icon: RefreshCcw,
    title: "Free Cancellation",
    description: "Cancel up to 24 hours before your tour starts for a full refund. No questions.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is on hand before, during, and after your trip via live chat or email.",
  },
  {
    icon: CreditCard,
    title: "No Hidden Fees",
    description: "The price you see is the price you pay. Taxes and guide fees included.",
  },
  {
    icon: MapPin,
    title: "Local Experts",
    description: "Every guide is born and raised in Japan — you get insider knowledge, not scripts.",
  },
  {
    icon: Award,
    title: "Vetted Quality",
    description: "All tours are personally reviewed. Only the best 5% of experiences make the cut.",
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
  },
  {
    name: "Tom K.",
    country: "🇬🇧 UK",
    tour: "Kyoto Temples & Tea",
    rating: 5,
    text: "The tea ceremony was the highlight of our Japan trip. The guide's passion for local history made every temple come alive. Worth every penny.",
    initial: "T",
  },
  {
    name: "Yuki R.",
    country: "🇦🇺 Australia",
    tour: "Mt. Fuji Sunrise",
    rating: 5,
    text: "Watching the sunrise over Fuji was a bucket-list moment. The small group size made it so personal. No rushing, no crowds — just pure Japan.",
    initial: "Y",
  },
];

export function WhyUsSection() {
  return (
    <>
      {/* ── Trust Badges ── */}
      <section className="py-14 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Why Book With Us</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Your journey, stress-free
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TRUST_ITEMS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 bg-white rounded-2xl border border-border hover:shadow-sm transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-3">
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-foreground mb-1.5 leading-tight">{title}</h3>
                <p className="text-xs text-muted leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">
                Traveler Reviews
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                Real stories from real travelers
              </h2>
            </div>
            {/* Aggregate score */}
            <div className="hidden sm:flex flex-col items-center bg-surface rounded-2xl px-6 py-4 border border-border">
              <span className="font-display font-bold text-4xl text-primary leading-none">4.9</span>
              <div className="flex gap-0.5 my-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-accent text-sm">★</span>
                ))}
              </div>
              <span className="text-xs text-muted">1,800+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-surface rounded-2xl border border-border p-6 hover:shadow-sm transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-accent">★</span>
                  ))}
                </div>

                <p className="text-foreground text-sm leading-relaxed mb-5 italic">
                  &ldquo;{r.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {r.initial}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{r.name}</div>
                    <div className="text-xs text-muted">{r.country} · {r.tour}</div>
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
