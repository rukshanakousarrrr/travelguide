import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TourForm } from "../new/TourForm";

async function getTour(id: string) {
  const tour = await prisma.tour.findUnique({
    where: { id },
    include: {
      images: { orderBy: { order: "asc" } },
    },
  });
  if (!tour) notFound();
  return tour;
}

export default async function EditTourPage(
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const tour = await getTour(id);

  const initialData = {
    tourId:           tour.id,
    title:            tour.title,
    slug:             tour.slug,
    category:         tour.category,
    difficulty:       tour.difficulty,
    location:         tour.location,
    prefecture:       tour.prefecture ?? "",
    country:          tour.country,
    countryCode:      tour.countryCode ?? "",
    stateCode:        tour.stateCode ?? "",
    shortDescription: tour.shortDescription,
    description:      tour.description,
    highlights:       (tour.highlights as string[]).length > 0 ? tour.highlights as string[] : [""],
    itinerary:        (tour.itinerary as any[]).length > 0
                        ? (tour.itinerary as any[]).map((stop: any, idx: number) => ({
                            order:       stop.order ?? stop.day ?? idx + 1,
                            title:       stop.title ?? "",
                            description: stop.description ?? "",
                            stayMinutes: stop.stayMinutes ?? "30",
                            isOptional:  stop.isOptional ?? false,
                          }))
                        : [{ order: 1, title: "", description: "", stayMinutes: "30", isOptional: false }],
    meetingPoint:     tour.meetingPoint,
    endPoint:         tour.endPoint ?? "",
    duration:         tour.duration.toString(),
    durationType:     tour.durationType,
    maxGroupSize:     tour.maxGroupSize.toString(),
    minGroupSize:     tour.minGroupSize.toString(),
    dailyCapacity:    tour.dailyCapacity?.toString() ?? "10",
    languages:        (tour.languages as string[]).length > 0 ? tour.languages as string[] : ["English"],
    serviceProvider:  tour.serviceProvider ?? "",
    basePrice:        Number(tour.basePrice).toString(),
    childPrice:       tour.childPrice ? Number(tour.childPrice).toString() : "",
    priceTiers:       (tour.priceTiers as any[])?.length > 0 ? (tour.priceTiers as any[]) : [],
    includes:         (tour.includes as string[]).length > 0 ? tour.includes as string[] : [""],
    excludes:         (tour.excludes as string[]).length > 0 ? tour.excludes as string[] : [""],
    metaTitle:        tour.metaTitle ?? "",
    metaDescription:  tour.metaDescription ?? "",
    featured:         tour.featured,
    likelyToSellOut:  tour.likelyToSellOut,
    status:           tour.status,
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[#111]">Edit Tour</h1>
        <p className="text-sm text-[#7A746D] mt-0.5">{tour.title}</p>
      </div>
      <TourForm initialData={initialData} />
    </div>
  );
}
