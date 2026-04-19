import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { AuthModal } from "@/components/public/AuthModal";
import { HeroSection } from "@/components/public/HeroSection";
import { DestinationsSection } from "@/components/public/DestinationsSection";
import { FeaturedToursSection } from "@/components/public/FeaturedToursSection";
import { ExperienceSection } from "@/components/public/ExperienceSection";
import { WhyUsSection } from "@/components/public/WhyUsSection";
import { PlacesToSee } from "@/components/public/PlacesToSee";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function HomePage() {
  let session = null;
  try {
    session = await auth();
  } catch (e) {
    console.error("Auth error on HomePage:", e);
  }

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
  }).catch((e) => {
    console.error("Destinations query error on HomePage:", e);
    return [];
  });

  // Fetch featured tours for the hero carousel
  const featuredTours = await prisma.tour.findMany({
    where: { status: "PUBLISHED", featured: true },
    take: 6,
    orderBy: { updatedAt: "desc" },
    include: { images: { where: { isPrimary: true }, take: 1 } } as any,
  }).catch((e) => {
    console.error("Featured tours query error:", e);
    return [];
  });

  const heroTours = featuredTours.map((tour: any) => ({
    id: tour.id,
    slug: tour.slug,
    title: tour.title,
    location: tour.location,
    duration: tour.duration,
    durationType: tour.durationType ?? "days",
    basePrice: Number(tour.basePrice),
    rating: Number(tour.rating ?? 5),
    reviewCount: tour.reviewCount ?? 0,
    coverImage: tour.images?.[0]?.url,
  }));

  return (
    <>
      <Navbar isLoggedIn={!!session?.user} destinations={destinations} />
      <main>
        <HeroSection featuredTours={heroTours} />
        <FeaturedToursSection />
        <DestinationsSection />
        <PlacesToSee destinations={destinations} />
        <ExperienceSection />
        <WhyUsSection />
      </main>
      <Footer />
      <AuthModal />
    </>
  );
}
