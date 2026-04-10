import { NextRequest, NextResponse } from "next/server";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendEmail, bookingConfirmationHtml } from "@/lib/email";
import { formatPrice, formatDate } from "@/lib/utils";
import { COMPANY_CURRENCY } from "@/lib/constants";

export async function POST(req: NextRequest) {
  const body      = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const bookingRef = session.metadata?.bookingRef;
      if (!bookingRef) break;

      const booking = await prisma.booking.findUnique({
        where:   { bookingRef },
        include: { tour: true, customer: true },
      });
      if (!booking) break;

      await prisma.booking.update({
        where: { bookingRef },
        data: {
          paymentStatus:   "PAID",
          status:          "CONFIRMED",
          stripePaymentId: session.payment_intent as string,
          paidAt:          new Date(),
          confirmedAt:     new Date(),
        },
      });

      // Update availability count
      if (booking.availabilityId) {
        await prisma.tourAvailability.update({
          where: { id: booking.availabilityId },
          data:  { bookedCount: { increment: booking.numAdults + booking.numChildren } },
        });
      }

      // Send confirmation email
      const recipientName = booking.guestName ?? booking.customer?.name ?? "Traveller";
      await sendEmail({
        to:      booking.guestEmail,
        subject: `Booking Confirmed — ${booking.tour.title} · ${bookingRef}`,
        html:    bookingConfirmationHtml({
          customerName:  recipientName,
          bookingRef,
          tourTitle:     booking.tour.title,
          tourDate:      formatDate(booking.tourDate),
          numGuests:     booking.numAdults + booking.numChildren,
          totalAmount:   formatPrice(Number(booking.totalAmount), COMPANY_CURRENCY),
          paymentMethod: "Credit / Debit Card",
        }),
      });

      // Log email
      await prisma.emailLog.create({
        data: {
          to:        booking.guestEmail,
          subject:   `Booking Confirmed — ${bookingRef}`,
          type:      "BOOKING_CONFIRMATION",
          bookingId: booking.id,
          status:    "SENT",
          sentAt:    new Date(),
        },
      });
      break;
    }

    case "checkout.session.expired": {
      const session    = event.data.object;
      const bookingRef = session.metadata?.bookingRef;
      if (bookingRef) {
        await prisma.booking.updateMany({
          where: { bookingRef, paymentStatus: "PENDING" },
          data:  { paymentStatus: "FAILED" },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
