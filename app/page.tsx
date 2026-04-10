import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { HeroSection } from "@/components/public/HeroSection";
import { DestinationsSection } from "@/components/public/DestinationsSection";
import { FeaturedToursSection } from "@/components/public/FeaturedToursSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { WhyUsSection } from "@/components/public/WhyUsSection";

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <HeroSection />
        <DestinationsSection />
        <FeaturedToursSection />
        <ExperienceSection />
        <WhyUsSection />
      </main>
      <Footer />
    </>
  );
}
