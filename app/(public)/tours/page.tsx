import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import { TourCard } from "@/components/public/TourCard";
import { ToursFilterBar } from "@/components/public/ToursFilterBar";
import { auth } from "@/lib/auth";

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
  try { session = await auth(); } catch {}
  const userId = session?.user?.id;
  const sp     = await searchParams;

  const q          = sp.q?.trim()          ?? "";
  const category   = sp.category           ?? "";
  const difficulty = sp.difficulty         ?? "";
  const minPrice   = sp.minPrice ? parseFloat(sp.minPrice) : undefined;
  const maxPrice   = sp.maxPrice ? parseFloat(sp.maxPrice) : undefined;
  const duration   = sp.duration           ?? "";

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
    if (difficulty && difficulty !== "ALL" && t.difficulty !== difficulty)  return false;
    if (minPrice   !== undefined && Number(t.basePrice) < minPrice)         return false;
    if (maxPrice   !== undefined && Number(t.basePrice) > maxPrice)         return false;
    if (duration   && duration   !== "ALL" && t.durationType !== duration)  return false;
    return true;
  });

  let userWishlists: any[] = [];
  if (userId) {
    try {
      userWishlists = await prisma.$queryRaw`SELECT * FROM Wishlist WHERE userId = ${userId}`;
    } catch {}
  }
  const wishlistedTourIds = new Set(userWishlists.map((w: any) => w.tourId));

  const activeCategory = category && category !== "ALL" ? category : null;

  return (
    <div className="bg-white min-h-screen pt-14">
      {/* Sticky category pills + filter bar */}
      <ToursFilterBar count={tours.length} />

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">

        {/* Title + count */}
        <div className="mb-6">
          <h1 className="text-[22px] font-bold text-[#111]">
            {activeCategory
              ? `${activeCategory.replace(/_/g, " ")} tours in Japan`
              : q
              ? `Results for "${q}"`
              : "All Japan tours"}
          </h1>
          <p className="text-[13px] text-[#7A746D] mt-1">
            {tours.length} {tours.length === 1 ? "experience" : "experiences"} available
          </p>
        </div>

        {/* Grid */}
        {tours.length === 0 ? (
          <div className="text-center py-24 border border-[#E4E0D9] rounded-2xl bg-[#F8F7F5]">
            <p className="text-[#7A746D] text-lg font-medium mb-2">No tours match your filters</p>
            <p className="text-[#A8A29E] text-sm">Try adjusting or clearing your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {tours.map((tour) => {
              const t = tour as any;
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
                  coverImage={t.images?.[0]?.url}
                  isWishlisted={wishlistedTourIds.has(tour.id)}
                  gradient="linear-gradient(135deg, #0C447C 0%, #185FA5 100%)"
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
