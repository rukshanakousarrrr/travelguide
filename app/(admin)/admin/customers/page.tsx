import { prisma } from "@/lib/prisma";
import { CustomersClient } from "./CustomersClient";

export default async function CustomersPage() {
  const customers = await prisma.user.findMany({
    where:   { role: "CUSTOMER" },
    orderBy: { createdAt: "desc" },
    select: {
      id:        true,
      name:      true,
      email:     true,
      createdAt: true,
      bookings: {
        select:  { id: true, totalAmount: true, paymentStatus: true, createdAt: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const rows = customers.map((c) => ({
    id:           c.id,
    name:         c.name,
    email:        c.email,
    createdAt:    c.createdAt,
    bookingCount: c.bookings.length,
    totalSpent:   c.bookings
      .filter((b) => b.paymentStatus === "PAID")
      .reduce((sum, b) => sum + Number(b.totalAmount), 0),
    lastBooking:  c.bookings[0]?.createdAt.toISOString() ?? null,
  }));

  return <CustomersClient customers={rows} />;
}
