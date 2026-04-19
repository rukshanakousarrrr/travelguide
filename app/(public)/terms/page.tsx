import { COMPANY_NAME, COMPANY_EMAIL } from "@/lib/constants";

export const metadata = {
  title: `Terms of Service | ${COMPANY_NAME}`,
  description: "The terms and conditions that govern your use of the GoTripJapan website and booking services.",
};

const EFFECTIVE_DATE = "April 19, 2026";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-14">

      {/* Page header */}
      <div className="border-b border-[#E4E0D9] bg-[#F8F7F5]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#185FA5] mb-3">
            Legal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-[#111] mb-3 leading-tight">
            Terms of Service
          </h1>
          <p className="text-[#A8A29E] text-sm">Effective date: {EFFECTIVE_DATE}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Intro */}
        <div className="bg-[#F8F9FF] rounded-2xl border border-[#E4E0D9] p-6 text-[#545454] text-sm leading-relaxed">
          <p>
            These Terms of Service govern your use of the website and booking services operated by{" "}
            <strong className="text-[#111]">{COMPANY_NAME}</strong>. By accessing our website or completing a booking,
            you agree to be bound by these terms. Please read them carefully.
          </p>
          <p className="mt-3">
            Questions? Email us at{" "}
            <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#185FA5] font-semibold hover:underline">
              {COMPANY_EMAIL}
            </a>.
          </p>
        </div>

        <Section title="1. About Us">
          <p>
            {COMPANY_NAME} is a tour booking platform that connects travellers with guided experiences across Japan.
            We act as the organiser and operator of the tours listed on our website. All tours are subject to
            availability and our Booking Policy, which forms part of these Terms.
          </p>
        </Section>

        <Section title="2. Eligibility">
          <ul>
            <li>You must be at least 18 years old to create an account or make a booking.</li>
            <li>By using our services you confirm that all information you provide is accurate and complete.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You may not use our services on behalf of another person without their explicit consent.</li>
          </ul>
        </Section>

        <Section title="3. Bookings &amp; Contracts">
          <ul>
            <li>A binding contract between you and {COMPANY_NAME} is formed only when we send you a written Booking Confirmation by email.</li>
            <li>We reserve the right to refuse or cancel any booking at our discretion, including where a pricing error has occurred.</li>
            <li>Each traveller listed on a booking must comply with any age, fitness, or other requirements stated on the tour page.</li>
            <li>It is your responsibility to ensure that all information provided at the time of booking is accurate. Errors may result in additional charges or cancellation.</li>
          </ul>
        </Section>

        <Section title="4. Payments">
          <ul>
            <li>All payments are processed securely by Stripe. By making a payment you agree to Stripe&apos;s terms of service.</li>
            <li>Prices are shown in the currency displayed on the tour page and include applicable taxes unless stated otherwise.</li>
            <li>We reserve the right to correct pricing errors at any time before a booking is confirmed. If the correct price is higher than the price you paid, we will contact you and offer the option to proceed or cancel for a full refund.</li>
            <li>Promotional codes and discounts cannot be applied after a booking is confirmed and have no cash value.</li>
          </ul>
        </Section>

        <Section title="5. Cancellations &amp; Refunds">
          <p>
            Cancellations and refunds are governed by our{" "}
            <a href="/policy">Booking Policy</a>. In summary:
          </p>
          <ul>
            <li>Free cancellation is available up to 24 hours before most standard tours.</li>
            <li>Specialty tours (multi-day, private charters) may have a longer cancellation window stated on the tour page.</li>
            <li>Cancellations must be submitted via email or your account dashboard. Verbal or phone requests are not accepted.</li>
            <li>Refunds are returned to the original payment method within 5 to 10 business days.</li>
          </ul>
        </Section>

        <Section title="6. Your Responsibilities">
          <ul>
            <li>You are responsible for arriving at the meeting point on time. Late arrivals may not be accommodated and no refund will be given.</li>
            <li>You must follow all instructions given by your guide at all times.</li>
            <li>You must disclose any medical conditions, mobility limitations, or dietary requirements at the time of booking that may affect your participation.</li>
            <li>You agree not to behave in a way that endangers yourself, other participants, or our guides. We reserve the right to remove anyone who does so, without a refund.</li>
            <li>You are responsible for ensuring you hold a valid passport or visa and meet all entry requirements for Japan.</li>
            <li>We strongly recommend you obtain comprehensive travel insurance before your trip.</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <ul>
            <li>All content on this website, including text, images, logos, and tour descriptions, is owned by or licensed to {COMPANY_NAME} and is protected by copyright law.</li>
            <li>You may not reproduce, distribute, or commercially exploit any content from our website without our prior written consent.</li>
            <li>You grant us a non-exclusive, royalty-free licence to display any reviews or feedback you submit through our platform.</li>
          </ul>
        </Section>

        <Section title="8. User Accounts">
          <ul>
            <li>You are responsible for all activity that occurs under your account.</li>
            <li>You must notify us immediately at <a href={`mailto:${COMPANY_EMAIL}`}>{COMPANY_EMAIL}</a> if you suspect unauthorised access to your account.</li>
            <li>We reserve the right to suspend or terminate accounts that violate these Terms, are used fraudulently, or remain inactive for an extended period.</li>
          </ul>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the fullest extent permitted by law:</p>
          <ul>
            <li>{COMPANY_NAME} is not liable for any indirect, incidental, or consequential losses arising from your use of our services.</li>
            <li>We are not responsible for losses caused by events outside our reasonable control, including natural disasters, government actions, or third-party service failures.</li>
            <li>Our total liability to you for any claim arising from these Terms shall not exceed the amount you paid for the booking giving rise to the claim.</li>
            <li>Nothing in these Terms limits our liability for death, personal injury caused by our negligence, or fraud.</li>
          </ul>
        </Section>

        <Section title="10. Third-Party Services">
          <p>
            Our website may contain links to third-party websites or services (e.g., Google Maps, Stripe). These are provided for convenience only. We do not endorse and are not responsible for the content, privacy practices, or reliability of any third-party service.
          </p>
        </Section>

        <Section title="11. Governing Law">
          <p>
            These Terms are governed by the laws of Japan. Any disputes arising from or relating to these Terms
            or your use of our services shall be subject to the exclusive jurisdiction of the courts of Tokyo, Japan,
            unless otherwise required by applicable consumer protection law in your country of residence.
          </p>
        </Section>

        <Section title="12. Changes to These Terms">
          <p>
            We may update these Terms from time to time. When we do, we will update the effective date at the top of
            this page. For material changes, we will notify you by email or a prominent notice on our site.
            Continued use of our services after any change constitutes your acceptance of the updated Terms.
          </p>
        </Section>

        <Section title="13. Contact Us">
          <p>If you have questions about these Terms, please contact us:</p>
          <address className="not-italic mt-3 space-y-1 text-[#545454]">
            <p className="font-semibold text-[#111]">{COMPANY_NAME}</p>
            <p>
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-[#185FA5] font-semibold hover:underline">
                {COMPANY_EMAIL}
              </a>
            </p>
          </address>
        </Section>

      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-[#111] mb-4 pb-3 border-b border-[#E4E0D9]">{title}</h2>
      <div className="text-[#545454] text-sm leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-[#111] [&_strong]:font-semibold [&_a]:text-[#185FA5] [&_a]:hover:underline">
        {children}
      </div>
    </div>
  );
}
