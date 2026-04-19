import { FaqClient } from "./FaqClient";

export const metadata = {
  title: "FAQ: Frequently Asked Questions",
  description: "Everything you need to know about booking Japan tours with GoTripJapan: payments, cancellations, group sizes, and more.",
};

const FAQ_SECTIONS = [
  {
    category: "Booking & Payments",
    icon: "💳",
    items: [
      {
        q: "How do I book a tour?",
        a: "Find a tour you love, pick a date and number of travelers, then click Reserve Now. You pay a 30% deposit upfront to confirm your spot. The remaining balance is due 48 hours before your tour date.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) via Stripe. Bank transfer is also available for group bookings of 6 or more travelers. Contact us after booking to arrange.",
      },
      {
        q: "Is my payment secure?",
        a: "Yes. All payments are processed through Stripe, which is PCI-DSS Level 1 certified (the highest level of payment security). We never store your card details on our servers.",
      },
      {
        q: "Can I pay the full amount upfront?",
        a: "Absolutely. At checkout you can choose to pay in full or just the 30% deposit. There is no difference in price either way.",
      },
      {
        q: "Will I receive a booking confirmation?",
        a: "Yes. Immediately after booking you will receive a confirmation email with your booking details, meeting point, and what to bring. Your guide will also reach out at least 24 hours before the tour.",
      },
    ],
  },
  {
    category: "Cancellations & Refunds",
    icon: "🔄",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "You can cancel for free up to 24 hours before your tour start time for a full refund. Cancellations within 24 hours are non-refundable. Some specialty tours (multi-day, private charters) have a 72-hour cancellation window. This is always stated clearly on the tour page.",
      },
      {
        q: "How long does a refund take?",
        a: "Refunds are processed within 1 to 3 business days on our end. Depending on your bank, the funds may take 5 to 10 business days to appear in your account.",
      },
      {
        q: "What if GoTripJapan cancels my tour?",
        a: "In the rare event we need to cancel (due to weather, safety concerns, or insufficient bookings), you will receive a full refund within 24 hours. We can also offer a free reschedule to an equivalent tour.",
      },
      {
        q: "Can I reschedule instead of cancelling?",
        a: "Yes. You can reschedule your booking up to 48 hours before the tour at no charge, subject to availability. Just email us or use the Manage Booking link in your confirmation email.",
      },
    ],
  },
  {
    category: "Tours & Experiences",
    icon: "🗺️",
    items: [
      {
        q: "Are your tours suitable for solo travelers?",
        a: "Absolutely. Most of our tours are small-group experiences (typically 6 to 15 people), so solo travelers can join and meet like-minded explorers. We also offer fully private tours if you prefer a more personal experience.",
      },
      {
        q: "What languages are tours conducted in?",
        a: "All tours are conducted in English. Many of our guides also speak Japanese, Mandarin, or Spanish. Check the individual tour page for language details.",
      },
      {
        q: "Are tours suitable for children?",
        a: "Most tours welcome children aged 8 and above. Family-friendly tours are clearly labelled. Children under 12 typically receive a 20% discount. Contact us before booking to confirm pricing for your family.",
      },
      {
        q: "What is included in the tour price?",
        a: "Every tour listing clearly states what is included. This typically covers your licensed English-speaking guide, all entrance fees, and any mentioned tastings or activities. Transport to the starting point and personal expenses are not included unless specified.",
      },
      {
        q: "How physically demanding are the tours?",
        a: "Each tour has a difficulty rating (Easy, Moderate, or Challenging) shown on its listing page. Easy tours involve light walking on flat ground. Challenging tours, like the Mt. Fuji sunrise hike, require a good level of fitness. If you have any concerns, feel free to contact us before booking.",
      },
      {
        q: "Can I request a private tour?",
        a: "Yes. All our tours can be booked as private experiences for your group. Select Private Tour when booking, or contact us directly for a custom quote for large groups or bespoke itineraries.",
      },
    ],
  },
  {
    category: "Traveling in Japan",
    icon: "🇯🇵",
    items: [
      {
        q: "Do I need a visa to visit Japan?",
        a: "Visitors from over 60 countries (including the US, UK, EU, Australia, and Canada) can enter Japan visa-free for up to 90 days. Check your specific requirements on the Japanese Ministry of Foreign Affairs website.",
      },
      {
        q: "What is the best time to visit Japan?",
        a: "Spring (late March to early May) for cherry blossoms and autumn (mid-October to mid-November) for fall foliage are the most popular times. Summer is warm and vibrant with festivals. Winter offers snow and fewer crowds at most sites.",
      },
      {
        q: "What currency is used in Japan?",
        a: "Japan uses the Japanese Yen (JPY). While card acceptance is growing, Japan is still largely cash-based, especially at smaller restaurants and local shops. We recommend carrying some cash. ATMs at 7-Eleven and Japan Post accept international cards.",
      },
      {
        q: "How do I get around Japan?",
        a: "The Shinkansen (bullet train) is the fastest way between cities. For local travel, IC cards (Suica or Pasmo) work on almost all trains and buses. Many of our tours include transport from a central meeting point. Check your tour details for specifics.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="bg-white min-h-screen pt-14">

      {/* Page header */}
      <div className="border-b border-[#E4E0D9] bg-[#F8F7F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#185FA5] mb-3">
            Help Center
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111] mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[#7A746D] text-lg max-w-xl mx-auto">
            Can&apos;t find an answer? Email us at{" "}
            <a href="mailto:hello@gotripjapan.com" className="text-[#185FA5] font-semibold hover:underline">
              hello@gotripjapan.com
            </a>
          </p>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FaqClient sections={FAQ_SECTIONS} />
      </div>

    </div>
  );
}
