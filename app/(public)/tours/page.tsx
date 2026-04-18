import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { TourCard } from "@/components/public/TourCard";
import { ToursFilterBar } from "@/components/public/ToursFilterBar";
import { auth } from "@/lib/auth";

// Cache all published tours for 5 minutes — filtered by searchParams in-memory
const getCachedPublishedTours = unstable_cache(
  async () => prisma.tour.findMany({
    where:   { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    include: { images: { where: { isPrimary: true }, take: 1 } } as any,
  }),
  ["published-tours"],
  { revalidate: 300, tags: ["tours"] }
);

export const metadata = {
  title: "Tours & Experiences",
  description: "Browse GoTripJapan's curated selection of cultural, adventure, and guided tours across Japan.",
};

interface PageProps {
  searchParams: Promise<{
    q?:          string;
    category?:   string;
    difficulty?: string;
    minPrice?:   string;
    maxPrice?:   string;
    duration?:   string;
  }>;
}

export default async function PublicToursPage({ searchParams }: PageProps) {
  let session = null;
  try {
    session = await auth();
  } catch (e) {
    console.error("Auth error in PublicToursPage:", e);
  }
  const userId  = session?.user?.id;
  const sp      = await searchParams;

  const q          = sp.q?.trim()          ?? "";
  const category   = sp.category           ?? "";
  const difficulty = sp.difficulty         ?? "";
  const minPrice   = sp.minPrice ? parseFloat(sp.minPrice) : undefined;
  const maxPrice   = sp.maxPrice ? parseFloat(sp.maxPrice) : undefined;
  const duration   = sp.duration           ?? "";

  // Build where clause
  // Fetch from cache, then filter in-memory — avoids a DB hit per unique filter combination
  const allTours = await getCachedPublishedTours().catch(() => [] as any[]);
  const tours = allTours.filter((t: any) => {
    if (q) {
      const ql = q.toLowerCase();
      if (
        !t.title?.toLowerCase().includes(ql) &&
        !t.location?.toLowerCase().includes(ql) &&
        !t.shortDescription?.toLowerCase().includes(ql)
      ) return false;
    }
    if (category   && category   !== "ALL" && t.category   !== category)   return false;
    if (difficulty && difficulty !== "ALL" && t.difficulty !== difficulty) return false;
    if (minPrice   !== undefined && Number(t.basePrice) < minPrice)        return false;
    if (maxPrice   !== undefined && Number(t.basePrice) > maxPrice)        return false;
    if (duration   && duration   !== "ALL" && t.durationType !== duration) return false;
    return true;
  });

  let userWishlists: any[] = [];
  if (userId) {
    try {
      userWishlists = await prisma.$queryRaw`SELECT * FROM Wishlist WHERE userId = ${userId}`;
    } catch (e) {
      console.error("Wishlist query failed:", e);
    }
  }
  const wishlistedTourIds = new Set(userWishlists.map((w: any) => w.tourId));

  return (
    <div className="bg-[#F8F7F5] min-h-screen">
      {/* Header */}
      <div className="bg-[#1B2847] text-white pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4 leading-tight">Explore Our Tours</h1>
          <p className="text-[#A8A29E] max-w-2xl text-lg font-light">
            Find the perfect experience for your trip to Japan. From ancient temples to modern cityscapes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <ToursFilterBar count={tours.length} />

        {tours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E4E0D9]">
            <p className="text-[#A8A29E] text-lg">No tours match your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => {
              const t            = tour as any;
              const primaryImage = t.images?.[0]?.url;
              return (
                <TourCard
                  key={tour.id}
                  id={tour.id}
                  slug={tour.slug}
                  title={tour.title}
                  location={tour.location}
                  duration={tour.duration}
                  durationType={tour.durationType}
                  price={tour.basePrice ? Number(tour.basePrice) : 0}
                  rating={tour.rating ? Number(tour.rating) : 5}
                  reviewCount={tour.reviewCount}
                  maxGroupSize={tour.maxGroupSize}
                  category={tour.category}
                  featured={tour.featured}
                  likelyToSellOut={tour.likelyToSellOut}
                  coverImage={primaryImage}
                  isWishlisted={wishlistedTourIds.has(tour.id)}
                  gradient="linear-gradient(135deg, #1B2847 0%, #C41230 100%)"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
