import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { HeroSection } from "@/components/public/HeroSection";
import { DestinationsSection } from "@/components/public/DestinationsSection";
import { FeaturedToursSection } from "@/components/public/FeaturedToursSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { WhyUsSection } from "@/components/public/WhyUsSection";
import { PlacesToSee } from "@/components/public/PlacesToSee";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const destinations = await prisma.destination.findMany({
    where:   { isActive: true },
    orderBy: { order: "asc" },
    include: {
      places: {
        where:   { isActive: true },
        orderBy: { order: "asc" },
        select:  { id: true, name: true, subtitle: true, imageUrl: true, linkQuery: true },
      },
    },
  });

  return (
    <>
      <Navbar transparent destinations={destinations} />
      <main>
        <HeroSection />
        <DestinationsSection />
        <FeaturedToursSection />
        <PlacesToSee destinations={destinations} />
        <ExperienceSection />
        <WhyUsSection />
      </main>
      <Footer />
    </>
  );
}
