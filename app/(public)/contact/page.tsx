import { ContactForm } from "@/components/public/ContactForm";
import { COMPANY_EMAIL, COMPANY_PHONE, COMPANY_NAME } from "@/lib/constants";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: `Contact Us | ${COMPANY_NAME}`,
  description: "Get in touch with our team. We are here to help you plan your perfect Japan experience.",
};

const FAQS = [
  {
    q: "How far in advance should I book?",
    a: "We recommend booking at least 2 to 4 weeks ahead, especially during cherry blossom and autumn foliage seasons.",
  },
  {
    q: "Can I customise a tour for my group?",
    a: "Absolutely. We offer private and tailor-made experiences. Mention your requirements in the message and we will put together a bespoke itinerary.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Full refund for cancellations made 7 or more days before the tour. Within 7 days, a 50% fee applies. No-shows are non-refundable.",
  },
  {
    q: "Do your guides speak English?",
    a: "Yes, all our guides are fluent English speakers. Many also speak Mandarin, Spanish, or French.",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen pt-14">

      {/* Page header */}
      <div className="border-b border-[#E4E0D9] bg-[#F8F7F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#185FA5] mb-3">
            Get in Touch
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111] mb-4 leading-tight">
            We would love to hear from you
          </h1>
          <p className="text-[#7A746D] text-lg max-w-xl mx-auto">
            Whether you have a question about a tour, need help with a booking, or simply want to say hello, our team is here.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">

          {/* Left: contact info + quick FAQs */}
          <div className="lg:col-span-2 space-y-8">

            {/* Info cards */}
            <div className="space-y-3">
              {[
                {
                  icon: Mail,
                  label: "Email us",
                  value: COMPANY_EMAIL,
                  sub: "Best for detailed enquiries",
                  href: "mailto:" + COMPANY_EMAIL,
                },
                ...(COMPANY_PHONE
                  ? [
                      {
                        icon: Phone,
                        label: "Call us",
                        value: COMPANY_PHONE,
                        sub: "Mon to Sat, 9 am to 6 pm JST",
                        href: "tel:" + COMPANY_PHONE,
                      },
                    ]
                  : []),
                {
                  icon: MapPin,
                  label: "Based in",
                  value: "Tokyo, Japan",
                  sub: "Tours available nationwide",
                  href: null,
                },
                {
                  icon: Clock,
                  label: "Response time",
                  value: "Within 24 hours",
                  sub: "Usually much faster",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, sub, href }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-[#E4E0D9] p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4FB] flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-[#185FA5]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E] mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="font-semibold text-[#111] hover:text-[#185FA5] transition-colors text-sm">
                        {value}
                      </a>
                    ) : (
                      <p className="font-semibold text-[#111] text-sm">{value}</p>
                    )}
                    <p className="text-xs text-[#A8A29E] mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick FAQs */}
            <div>
              <h2 className="font-display text-lg font-bold text-[#111] mb-4">Common questions</h2>
              <div className="space-y-3">
                {FAQS.map((faq) => (
                  <div key={faq.q} className="bg-[#F8F7F5] rounded-xl border border-[#E4E0D9] p-5">
                    <p className="font-semibold text-[#111] text-sm mb-1.5">{faq.q}</p>
                    <p className="text-sm text-[#7A746D] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-[#A8A29E]">
                More questions?{" "}
                <a href="/faq" className="text-[#185FA5] font-semibold hover:underline">
                  Visit our full FAQ page
                </a>
              </p>
            </div>

          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-[#E4E0D9] p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold text-[#111] mb-1">Send us a message</h2>
              <p className="text-[#7A746D] text-sm mb-8">
                Fill in the form and a member of our team will get back to you shortly.
              </p>
              <ContactForm />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
