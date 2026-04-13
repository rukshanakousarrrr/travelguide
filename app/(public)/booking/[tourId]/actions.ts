"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { parsePriceTiers, getPriceForGroupSize, generateBookingRef } from "@/lib/utils";

export async function submitBookingAction(formData: FormData) {
  const tourId      = formData.get("tourId")       as string;
  const date        = formData.get("date")          as string;
  const adultsRaw   = formData.get("adults")        as string;
  const childrenRaw = formData.get("children")      as string;
  const firstName   = (formData.get("firstName")   as string)?.trim();
  const lastName    = (formData.get("lastName")    as string)?.trim();
  const email       = (formData.get("email")       as string)?.trim().toLowerCase();
  const phone       = (formData.get("phone")       as string)?.trim();
  const pickupLocation  = formData.get("pickupLocation")  as string;
  const specialRequests = formData.get("specialRequests") as string;

  // ── Basic field validation ────────────────────────────────────────────────
  if (!firstName || !lastName || !email || !phone) {
    return { error: "Please fill in all required fields." };
  }
  if (!tourId || !date) {
    return { error: "Invalid booking request." };
  }

  const adultsNum   = parseInt(adultsRaw,   10);
  const childrenNum = parseInt(childrenRaw ?? "0", 10);
  if (isNaN(adultsNum) || adultsNum < 1) {
    return { error: "At least 1 adult is required." };
  }
  if (isNaN(childrenNum) || childrenNum < 0) {
    return { error: "Invalid number of children." };
  }

  // ── Past-date guard ───────────────────────────────────────────────────────
  const tourDateObj = new Date(date + "T00:00:00.000Z");
  const today       = new Date();
  today.setUTCHours(0, 0, 0, 0);
  if (tourDateObj < today) {
    return { error: "Tour date must be in the future." };
  }

  // ── Load & validate tour ──────────────────────────────────────────────────
  const tour = await prisma.tour.findUnique({ where: { id: tourId } });
  if (!tour)                          return { error: "Tour not found."        };
  if (tour.status !== "PUBLISHED")    return { error: "This tour is not currently available." };

  const totalGuests = adultsNum + childrenNum;
  if (totalGuests < tour.minGroupSize) {
    return { error: `Minimum group size for this tour is ${tour.minGroupSize}.` };
  }
  if (totalGuests > tour.maxGroupSize) {
    return { error: `Maximum group size for this tour is ${tour.maxGroupSize}.` };
  }

  // ── Recalculate price server-side ─────────────────────────────────────────
  const basePrice  = Number(tour.basePrice);
  const childPrice = tour.childPrice ? Number(tour.childPrice) : basePrice;
  const priceTiers = parsePriceTiers((tour as any).priceTiers);
  const hasTiers   = priceTiers.length > 0;
  const tierPrice  = getPriceForGroupSize(priceTiers, totalGuests, basePrice);
  const calculatedTotal = hasTiers
    ? totalGuests * tierPrice
    : adultsNum * basePrice + childrenNum * childPrice;

  const session    = await auth();
  const customerId = session?.user?.id ?? null;

  // ── Duplicate booking guard ───────────────────────────────────────────────
  const existing = await prisma.booking.findFirst({
    where: {
      tourId,
      tourDate: tourDateObj,
      guestEmail: email,
      status: { not: "CANCELLED" },
    },
  });
  if (existing) {
    return { error: "You already have a booking for this tour on this date." };
  }

  // ── Atomic capacity check + booking creation ─────────────────────────────
  // Wrapped in a transaction with a SELECT FOR UPDATE to prevent overselling.
  let bookingId: string;
  let bookingRef: string;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Lock the availability row so concurrent requests queue up here
      type AvailRow = {
        id: string;
        status: string;
        bookedCount: number;
        maxCapacity: number;
        priceOverride: string | null;
      };

      const rows = await tx.$queryRaw<AvailRow[]>`
        SELECT id, status, bookedCount, maxCapacity, priceOverride
        FROM TourAvailability
        WHERE tourId = ${tourId}
          AND date   = ${date}
        FOR UPDATE
      `;

      const avail = rows[0] ?? null;

      if (avail) {
        if (avail.status === "CLOSED" || avail.status === "CANCELLED") {
          throw new Error("UNAVAILABLE");
        }
        if (avail.status === "FULL" || avail.bookedCount + totalGuests > avail.maxCapacity) {
          throw new Error("FULL");
        }
      }

      const ref = generateBookingRef();

      const booking = await tx.booking.create({
        data: {
          bookingRef:     ref,
          tourId,
          availabilityId: avail?.id ?? null,
          customerId,
          guestName:      `${firstName} ${lastName}`,
          guestEmail:     email,
          guestPhone:     phone,
          tourDate:       tourDateObj,
          numAdults:      adultsNum,
          numChildren:    childrenNum,
          specialRequests: specialRequests + (pickupLocation ? `\nPickup: ${pickupLocation}` : ""),
          subtotal:       calculatedTotal,
          totalAmount:    calculatedTotal,
          discountAmount: 0,
          currency:       "USD",
          paymentMethod:  "STRIPE",
          paymentStatus:  "PENDING",
          status:         "CONFIRMED",
          passengers: {
            create: { firstName, lastName, isLead: true },
          },
        },
      });

      // Increment bookedCount + auto-mark FULL if at capacity
      if (avail) {
        const newCount = avail.bookedCount + totalGuests;
        await tx.tourAvailability.update({
          where: { id: avail.id },
          data: {
            bookedCount: newCount,
            ...(newCount >= avail.maxCapacity ? { status: "FULL" as const } : {}),
          },
        });
      }

      return booking;
    });

    bookingId  = result.id;
    bookingRef = result.bookingRef;
  } catch (err: any) {
    if (err.message === "FULL") {
      return { error: "Sorry, this date is now fully booked. Please choose another date." };
    }
    if (err.message === "UNAVAILABLE") {
      return { error: "This date is no longer available." };
    }
    console.error("Booking error:", err);
    return { error: "Failed to process reservation. Please try again." };
  }

  redirect(customerId ? "/bookings?success=true" : `/?success=true&ref=${bookingRef}`);
}
