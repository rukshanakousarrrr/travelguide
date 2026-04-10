import { prisma } from "@/lib/prisma";
import { ToursClient } from "./ToursClient";

async function getTours() {
  try {
    return await prisma.tour.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        images: {
          where: { isPrimary: true },
          take: 1,
        },
        _count: {
          select: { bookings: true, availability: true },
        },
      },
    });
  } catch {
    return [];
  }
}

export default async function ToursPage() {
  const tours = await getTours();
  return <ToursClient tours={tours} />;
}
