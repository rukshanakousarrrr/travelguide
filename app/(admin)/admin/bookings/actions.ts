"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateBookingStatus(bookingId: string, status: string) {
  const data: Record<string, unknown> = { status };
  if (status === "CONFIRMED") data.confirmedAt = new Date();
  if (status === "CANCELLED") data.cancelledAt = new Date();
  await prisma.booking.update({ where: { id: bookingId }, data });
  revalidatePath("/admin/bookings");
}

export async function updatePaymentStatus(bookingId: string, paymentStatus: string) {
  const data: Record<string, unknown> = { paymentStatus };
  if (paymentStatus === "PAID") data.paidAt = new Date();
  await prisma.booking.update({ where: { id: bookingId }, data });
  revalidatePath("/admin/bookings");
}

export async function updateAdminNotes(bookingId: string, adminNotes: string) {
  await prisma.booking.update({ where: { id: bookingId }, data: { adminNotes } });
  revalidatePath("/admin/bookings");
}
