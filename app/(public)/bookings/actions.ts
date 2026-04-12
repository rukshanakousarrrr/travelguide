"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function cancelBooking(bookingId: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated." };

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: { id: true, customerId: true, status: true, tourDate: true },
  });

  if (!booking || booking.customerId !== session.user.id)
    return { error: "Booking not found." };

  if (booking.status === "CANCELLED")
    return { error: "Booking is already cancelled." };

  if (booking.status === "COMPLETED")
    return { error: "Cannot cancel a completed booking." };

  const tourDate = new Date(booking.tourDate);
  const now      = new Date();
  const diffDays = (tourDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (diffDays < 0)
    return { error: "Cannot cancel a past booking." };

  await prisma.booking.update({
    where: { id: bookingId },
    data:  { status: "CANCELLED", cancelledAt: new Date() },
  });

  revalidatePath("/bookings");
  return {};
}
