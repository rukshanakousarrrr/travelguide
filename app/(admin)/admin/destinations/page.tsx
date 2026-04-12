import { prisma } from "@/lib/prisma";
import { DestinationsClient } from "./DestinationsClient";

export default async function DestinationsPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { order: "asc" },
    include: { places: { orderBy: { order: "asc" } } },
  });

  // Serialize dates
  const data = destinations.map((d) => ({
    id:       d.id,
    name:     d.name,
    slug:     d.slug,
    order:    d.order,
    isActive: d.isActive,
    places:   d.places.map((p) => ({
      id:            p.id,
      name:          p.name,
      subtitle:      p.subtitle,
      imageUrl:      p.imageUrl,
      linkQuery:     p.linkQuery,
      order:         p.order,
      isActive:      p.isActive,
    })),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111]">Destinations</h1>
        <p className="text-sm text-[#7A746D] mt-0.5">
          Manage the countries and places shown in the &ldquo;Places to See&rdquo; section on the homepage.
        </p>
      </div>
      <DestinationsClient destinations={data} />
    </div>
  );
}
